/**
 * dopyo.js object.
 * @constructor
 * @param {String} id - DOM id for chart object
 * @param {String} type - chart type = "Bar"|"Column"|"Line"|"Stacked-Bar"|"Pie"
 */
function Dopyo(id, type) {

	// Check id is duplicated
	let element = document.getElementById(id);

	if(undefined != element) {
		throw new Error("DOM id " + id + " is already exist.");
	}

	// Attributes: Common
	this.id = id;
	this.setType(type);

	let agent = navigator.userAgent.toLowerCase();
	let isIE = false;
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		isIE = true;
	}
	this.isIE = isIE;
	
	this.panel = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	this.panel.setAttribute("id", id);
	
	this.animate = new Object();
	this.animate.show = true;
	this.animate.duration = 0.5;
	if(isIE) {
		this.animate.show = false;
	}

	this.padding = new Object();
	this.padding.top = 50;
	this.padding.right = 0;
	this.padding.bottom = 10;
	this.padding.left = 0;

	this.eventCoord = new Object();
	this.eventCoord.x = 0;
	this.eventCoord.y = 0;

	// Attributes: Title
	this.title = new Object();
	this.title.show = true;
	this.title.text = id;
	this.title.position = new Object();
	this.title.position.x = "center";
	this.title.position.y = 10;
	this.title.backgroundColor = "rgba(255, 255, 255, 0.8)";
	this.title.borderColor = "rgba(100, 100, 100, 1)";
	this.title.fontSize = 20;
	this.title.fontFamily = "serif";
	this.title.fontWeight = "normal";
	this.title.fontColor = "rgba(100, 100, 100, 1)";

	// Attributes: Tooltip
	this.tooltip = new Object();
	this.tooltip.show = true;
	this.tooltip.backgroundColor = "rgba(100, 100, 100, 0.8)";
	this.tooltip.fontColor = "white";
	this.tooltip.object = null;

	// Attributes: Value on chart
	this.valueOnChart = new Object();
	this.valueOnChart.show = false;

	// Attributes: Labels
	this.labels = new Object();
	this.labels.show = true;
	this.labels.fontColor = "rgba(100, 100, 100, 1)";
	this.labels.fontSize = 12;
	this.labels.fontFamily = "sans-serif";
	this.labels.fontWeight = "normal";
	this.labels.list = null;

	// Attributes: Legends
	this.legends = new Object();
	this.legends.list = null;
	this.legends.map = null;
	this.legends.table = new Object();
	this.legends.table.show = true;
	this.legends.table.position = new Object();
	this.legends.table.position.x = "right";
	this.legends.table.position.y = 10;
	this.legends.table.direction = "vertical";
	this.legends.table.backgroundColor = "rgba(255, 255, 255, 0.8)";
	this.legends.table.borderColor = "rgba(100, 100, 100, 1)";
	this.legends.table.fontColor = "rgba(100, 100, 100, 1)";

	// Attributes: Axis X
	this.axisX = new Object();
	this.axisX.show = true;
	this.axisX.color = "rgba(200, 200, 200, 0.5)"
	this.axisX.width = 1;
	this.axisX.minValue = 0;
	this.axisX.maxValue = 0;

	// Attributes: Axis Y
	this.axisY = new Object();
	this.axisY.show = true;
	this.axisY.color = "rgba(200, 200, 200, 0.5)"
	this.axisY.width = 1;
	this.axisY.minValue = 0;
	this.axisY.maxValue = 0;
	this.axisY.stackedBarMinValue = 0;
	this.axisY.stackedBarMaxValue = 0;

	// Attributes: Grid X
	this.gridX = new Object();
	this.gridX.show = true;
	this.gridX.interval = 0;
	this.gridX.fill = "rgba(200, 200, 200, 0.5)"
	this.gridX.label = new Object();
	this.gridX.label.show = true;

	// Attributes: Grid Y
	this.gridY = new Object();
	this.gridY.show = false;
	this.gridY.interval = 0;
	this.gridY.fill = "rgba(200, 200, 200, 0.5)";
	this.gridY.label = new Object();
	this.gridY.label.show = true;

	// Attributes: for line chart
	this.line = new Object();
	this.line.width = 2;
	this.line.style = "curve" // curve | straight

	this.point = new Object();
	this.point.show = true;
	this.point.radius = 5;
	this.point.strokeWidth = 2;
}

/**
 * Set chart type.
 * @param {String} type - chart type = "Bar"|"Column"|"Line"|"Stacked-Bar"|"Pie"
 */
Dopyo.prototype.setType = function(type) {

	// Check chart type
	if("Bar" != type
		&& "Column" != type
		&& "Line" != type
		&& "Stacked-Bar" != type
		&& "Pie" != type
		) {

		throw new Error("Chart type " + type + " is not allowed.");
	}

	this.type = type;
}

/**
 * Show animation.
 * @param {Boolean} show - enable animation
 */
Dopyo.prototype.setAnimateShow = function(show) {
	
	this.animate.show = show;

	if(this.isIE) {
		this.animate.show = false;
	}
}

/**
 * Set aniamtion duration.
 * @param {Number} second - animation duration(second)
 */
Dopyo.prototype.setAnimateDuration = function(second) {
	this.animate.duration = second;
}

/**
 * Set chart padding in injected DOM object.
 * @param {Number} top - top padding
 * @param {Number} right - right padding
 * @param {Number} bottom - bottom padding
 * @param {Number} left - left padding
 */
Dopyo.prototype.setPadding = function(top, right, bottom, left) {
	this.padding.top = top;
	this.padding.right = right;
	this.padding.bottom = bottom;
	this.padding.left = left;
}

/**
 * Show chart title.
 * @param {Boolean} show - show chart title box
 */
Dopyo.prototype.setTitleShow = function(show) {
	this.title.show = show;
}

/**
 * Set chart title text.
 * @param {String} text - chart title text
 */
Dopyo.prototype.setTitleText = function(text) {
	this.title.text = text;
}

/**
 * Set chart title coordination.
 * @param {Number} x - coordination x
 * @param {Number} y - coordination y
 */
Dopyo.prototype.setTitlePosition = function(x, y) {
	this.title.position.x = x;
	this.title.position.y = y;
}

/**
 * Set chart title background color.
 * @param {String} color - chart title background color, CSS color property style
 */
Dopyo.prototype.setTitleBackgroundColor = function(color) {
	this.title.backgroundColor = color;
}

/**
 * Set chart title box border color.
 * @param {String} color - chart title box border color, CSS color property style
 */
Dopyo.prototype.setTitleBorderColor = function(color) {
	this.title.borderColor = color;
}

/**
 * Set chart title font size.
 * @param {Number} fontSize - chart title text font size
 */
Dopyo.prototype.setTitleFontSize = function(fontSize) {
	this.title.fontSize = fontSize;
}

/**
 * Set chart title font family.
 * @param {String} fontFamily - chart title text font family
 */
Dopyo.prototype.setTitleFontFamily = function(fontFamily) {
	this.title.fontFamily = fontFamily;
}

/**
 * Set chart title font weight.
 * @param {String} fontWeight - chart title text font weight
 */
Dopyo.prototype.setTitleFontWeight = function(fontWeight) {
	this.title.fontWeight = fontWeight;
}

/**
 * Set chart title font color.
 * @param {String} color - chart title text font color, CSS color property style
 */
Dopyo.prototype.setTitleFontColor = function(color) {
	this.title.fontColor = color;
}

/**
 * Set chart background color.
 * @param {String} color - chart background color, CSS color property style
 */
Dopyo.prototype.setBackgroundColor = function(color) {
	this.panel.style.backgroundColor = color;
}

/**
 * Show value on chart.
 * @param {Boolean} show - show value on chart area
 */
Dopyo.prototype.setValueOnChartShow = function(show) {
	this.valueOnChart.show = show;
}

/**
 * Get width of chart object.
 * @returns {Number} width of chart object
 */
Dopyo.prototype.getWidth = function() {
	return this.panel.getBoundingClientRect().width;
}

/**
 * Get height of chart object.
 * @returns {Number} height of chart object
 */
Dopyo.prototype.getHeight = function() {
	return this.panel.getBoundingClientRect().height;
}

/**
 * Set labels.
 * @param {(String|Array)} labels - array of label string.
 */
Dopyo.prototype.setLabels = function(labels) {
	this.labels.list = labels;
}

/**
 * Show labels.
 * @param {Boolean} show - show labels
 */
Dopyo.prototype.setLabelShow = function(show) {
	this.labels.show = show;
}

/**
 * Set label font color.
 * @param {String} color - label text font color, CSS color property style
 */
Dopyo.prototype.setLabelFontColor = function(color) {
	this.labels.fontColor = color;
}

/**
 * Set label font family.
 * @param {String} fontFamily - label text font family
 */
Dopyo.prototype.setLabelFontFamily = function(fontFamily) {
	this.labels.fontFamily = fontFamily;
}

/**
 * Set label font size.
 * @param {Number} fontSize - label text font size
 */
Dopyo.prototype.setLabelFontSize = function(fontSize) {
	this.labels.fontSize = fontSize;
}

/**
 * Set label font weight.
 * @param {String} fontWeight - label text font weight
 */
Dopyo.prototype.setLabelFontWeight = function(fontWeight) {
	this.labels.fontWeight = fontWeight;
}

/**
 * Add legend and values.
 * name, values attributes are required.
 * @param {Object} legend - (String) name, (String) fill, (String) stroke, (Number|Array) values
 */
Dopyo.prototype.addLegend = function(legend) {

	let r = null;
	let g = null;
	let b = null;

	if(null == this.legends.list) {
		this.legends.list = new Array();
	}

	if(undefined == legend.fill) {

		r = Math.floor(Math.random() * 255);
		g = Math.floor(Math.random() * 255);
		b = Math.floor(Math.random() * 255);

		legend.fill = "rgba("
			+ r + ", "
			+ g + ", "
			+ b + ", 0.9)";
	}

	if(undefined == legend.stroke) {

		if(null != r) {

			r -= 10;
			r = r < 0 ? 0 : r;

			g -= 10;
			g = g < 0 ? 0 : g;

			b -= 10;
			b = b < 0 ? 0 : b;
		}

		legend.stroke = "rgba("
			+ r + ", "
			+ g + ", "
			+ b + ", 1)";
	}

	this.legends.list.push(legend);

	if(null == this.legends.map) {
		this.legends.map = new Map();
	}

	this.legends.map.set(legend.name, legend);
}

/**
 * Remove legend.
 * @param {string} name - legend name
 */
Dopyo.prototype.removeLegend = function(name) {

	let index = -1;

	if(null == this.legends.list) {
		return;
	}

	for(let i = 0; i < this.legends.list.length; i++) {

		if(this.legends.list[i].name == name) {
			index = i;
			break;
		}
	}

	if(index > -1) {

		this.legends.list.splice(index, 1);
		this.legends.map.delete(name);
	}
}

/**
 * Get legend by name.
 * @param {string} name - legend name
 * @returns {Object} legend
 */
Dopyo.prototype.getLegend = function(name) {
	return this.legends.map.get(name);
}

/**
 * Show legend table.
 * @param {Boolean} show - show legend table
 */
Dopyo.prototype.setLegendTableShow = function(show) {
	this.legends.table.show = show;
}

/**
 * Set legend table position.
 * @param {Number} x - coordinate x
 * @param {Number} y - coordinate y
 */
Dopyo.prototype.setLegendTablePosition = function(x, y) {
	this.legends.table.position.x = x;
	this.legends.table.position.y = y;
}

/**
 * Set legend table direction.
 * @param {String} direction - legend item display direction = "vertical"|"horizontal"
 */
Dopyo.prototype.setLegendTableDirection = function(direction) {
	this.legends.table.direction = direction;
}

/**
 * Set legend table background color.
 * @param {String} color - legend table background color, CSS color property style
 */
Dopyo.prototype.setLegendTableBackgroundColor = function(color) {
	this.legends.table.backgroundColor = color;
}

/**
 * Set legend table border color.
 * @param {String} color - legend table border color, CSS color property style
 */
Dopyo.prototype.setLegendTableBorderColor = function(color) {
	this.legends.table.borderColor = color;
}

/**
 * Set legend table font color.
 * @param {String} color - legend table text font color, CSS color property style
 */
Dopyo.prototype.setLegendTableFontColor = function(color) {
	this.legends.table.fontColor = color;
}

/**
 * Get minimum value.
 * If chart type is Stacked-Bar, returns summary value.
 * @returns {Number} value
 */
Dopyo.prototype.getMinValue = function() {

	let minValue = 0;
	let value = 0;
	let legendList = this.legends.list;
	let values = this.values;

	if("Stacked-Bar" == this.type) {

		let summary = new Array();
		let valuesIndex = 0;

		legendList.forEach(function(legend) {

			legend.values.forEach(function(value) {

				// Negative value not allowed
				if(value > 0) {

					if(undefined === summary[valuesIndex]) {
						summary[valuesIndex] = value;
					}
					else {
						summary[valuesIndex] += value;	
					}
				}

				++valuesIndex;
			});
		});

	}

	else {

		legendList.forEach(function(legend) {

			legend.values.forEach(function(value) {

				if(minValue > value) {
					minValue = value;
				}
			});
		});

	}

	return minValue;
}

/**
 * Get maximum value.
 * If chart type is Stacked-Bar, returns summary value.
 * @returns {Number} value
 */
Dopyo.prototype.getMaxValue = function() {

	let maxValue = 0;
	let value = 0;
	let legendList = this.legends.list;
	let values = this.values;

	if("Stacked-Bar" == this.type) {

		let summary = new Array();

		legendList.forEach(function(legend) {

			let valuesIndex = 0;

			legend.values.forEach(function(value) {

				// Negative value not allowed
				if(value > 0) {

					if(undefined === summary[valuesIndex]) {
						summary[valuesIndex] = value;
					}
					else {
						summary[valuesIndex] += value;	
					}
				}

				++valuesIndex;
			});
		});

		summary.forEach(function(value) {
			if(maxValue < value) {
				maxValue = value;
			}
		});
	}

	else {

		legendList.forEach(function(legend) {

			legend.values.forEach(function(value) {

				if(maxValue < value) {
					maxValue = value;
				}
			});
		});

	}

	return maxValue;
}

/**
 * Show axis X.
 * @param {Boolean} show - show axis X
 */
Dopyo.prototype.setAxisXShow = function(show) {
	this.axisX.show = show;
}

/**
 * Set axis X color.
 * @param {String} color - axis X color, CSS color property style
 */
Dopyo.prototype.setAxisXColor = function(color) {
	this.axisX.color = color;
}

/**
 * Set axis X line width.
 * @param {Number} width - axis X line width
 */
Dopyo.prototype.setAxisXWidth = function(width) {
	this.axisX.width = width;
}

/**
 * Set axis X minimum value.
 * It effect to Bar chart.
 * @param {Number} minValue - axis X minimum value
 */
Dopyo.prototype.setAxisXMinValue = function(minValue) {
	this.axisX.minValue = minValue;
}

/**
 * Set axis X maximum value.
 * It effect to Bar chart.
 * @param {Number} maxValue - axis X maximum value
 */
Dopyo.prototype.setAxisXMaxValue = function(maxValue) {
	this.axisX.maxValue = maxValue;
}

/**
 * Show axis Y.
 * @param {Boolean} show - show axis Y
 */
Dopyo.prototype.setAxisYShow = function(show) {
	this.axisY.show = show;
}

/**
 * Set axis Y color.
 * @param {String} color - axis Y color, CSS color property style
 */
Dopyo.prototype.setAxisYColor = function(color) {
	this.axisY.color = color;
}

/**
 * Set axis Y line width.
 * @param {Number} width - axis Y line width
 */
Dopyo.prototype.setAxisYWidth = function(width) {
	this.axisY.width = width;
}

/**
 * Set axis Y minimum value.
 * It effect to Column, Line chart.
 * @param {Number} minValue - axis Y minimum value
 */
Dopyo.prototype.setAxisYMinValue = function(minValue) {
	this.axisY.minValue = minValue;
}

/**
 * Set axis Y maximum value.
 * It effect to Column, Line chart.
 * @param {Number} maxValue - axis Y maximum value
 */
Dopyo.prototype.setAxisYMaxValue = function(maxValue) {
	this.axisY.maxValue = maxValue;
}

/**
 * Set axis Y minimum value.
 * It effect to Stacked-Bar chart only.
 * @param {Number} minValue - axis Y minimum value
 */
Dopyo.prototype.setAxisYStackedBarMinValue = function(minValue) {
	this.axisY.stackedBarMinValue = minValue;
}

/**
 * Set axis Y maximum value.
 * It effect to Stacked-Bar chart only.
 * @param {Number} maxValue - axis Y maximum value
 */
Dopyo.prototype.setAxisYStackedBarMaxValue = function(maxValue) {
	this.axisY.stackedBarMaxValue = maxValue;
}

/**
 * Show horizontal grid.
 * @param {Boolean} show - show horizontal grid
 */
Dopyo.prototype.setGridXShow = function(show) {
	this.gridX.show = show;
}

/**
 * Show horizontal grid label.
 * @param {Boolean} show - show horizontal grid label
 */
Dopyo.prototype.setGridXLabelShow = function(show) {
	this.gridX.label.show = show;
}

/**
 * Set horizontal grid interval value manually.
 * It effect to Bar chart.
 * @param {Number} interval - horizontal grid interval value
 */
Dopyo.prototype.setGridXInterval = function(interval) {
	this.gridX.interval = interval;
}

/**
 * Show vertical grid.
 * @param {Boolean} show - show vertical grid
 */
Dopyo.prototype.setGridYShow = function(show) {
	this.gridY.show = show;
}

/**
 * Show vertical grid label.
 * @param {Boolean} show - show vertical grid label
 */
Dopyo.prototype.setGridYLabelShow = function(show) {
	this.gridY.label.show = show;
}

/**
 * Set vertical grid interval value manually.
 * It effect to Column, Line, Stacked-Bar chart.
 * @param {Number} interval - vertical grid interval value
 */
Dopyo.prototype.setGridYInterval = function(interval) {
	this.gridY.interval = interval;
}

/**
 * Show tooltip.
 * @param {Boolean} show - show tooltip
 */
Dopyo.prototype.setTooltipShow = function(show) {
	this.tooltip.show = show;
}

/**
 * Set tooltip box background color.
 * @param {String} color - tooltip box background color, CSS color property style
 */
Dopyo.prototype.setTooltipBoxColor = function(color) {

	this.tooltip.backgroundColor = color;

	let tooltipGroup = this.tooltip.object;

	if(null != tooltipGroup) {
		let box = tooltipGroup.childNodes[0];
		box.style.backgroundColor = color;
	}
}

/**
 * Set tooltip text font color.
 * @param {String} color - tooltip text font color, CSS color property style
 */
Dopyo.prototype.setTooltipFontColor = function(color) {

	this.tooltip.fontColor = color;

	let tooltipGroup = this.tooltip.object;

	if(null != tooltipGroup) {
		let labelText = tooltipGroup.childNodes[1];
		let legendText = tooltipGroup.childNodes[3];
		let valueText = tooltipGroup.childNodes[4];

		labelText.style.fontColor = color;
		legendText.style.fontColor = color;
		valueText.style.fontColor = color;
	}
}

/**
 * Show tooltip event handler
 * @param {Object} event - event object
 * @param {Object} element - DOM object invoked event
 * @param {Object} chart - dopyo.js object
 */
Dopyo.prototype.showTooltip = function(event, element, chart) {

	let x = event.clientX;
	let y = event.clientY;

	// If event invoked at same coordinate, end this function.
	if(x == chart.eventCoord.x && y == chart.eventCoord.y) {
		return;
	}
	else {
		chart.eventCoord.x = x;
		chart.eventCoord.y = y;
	}

	// Create SVG element: rect
	let rect = function(id, x, y, width, height, fill, stroke) {

		let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

		rect.setAttribute("id", id);
		rect.setAttribute("x", x);
		rect.setAttribute("y", y);
		rect.setAttribute("width", width);
		rect.setAttribute("height", height);
		rect.setAttribute("fill", fill);
		rect.setAttribute("stroke", stroke);

		return rect;
	};

	// Create SVG element: text
	let text = function(id, x, y, fontSize, textAnchor, alignmentBaseline, fill, contents) {

		// Modify y coordinate beacuse IE not supported alignment-baseline attribute
		let agent = navigator.userAgent.toLowerCase();
		let isIE = false;
		if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
			isIE = true;
		}

		if(isIE) {
			if("hanging" == alignmentBaseline) {
				y += fontSize;
			}
			else if("middle" == alignmentBaseline) {
				y += fontSize/2;	
			}
			else if("baseline" == alignmentBaseline) {
				// No modify
			}
		}

		let text = document.createElementNS("http://www.w3.org/2000/svg", "text");

		text.setAttribute("id", id);
		text.setAttribute("x", x);
		text.setAttribute("y", y);
		text.setAttribute("font-size", fontSize);
		text.setAttribute("text-anchor", textAnchor);
		
		// IE not supported alignment-baseline attribute
		if(!isIE) {
			text.setAttribute("alignment-baseline", alignmentBaseline);	
		}

		text.setAttribute("fill", fill);

		text.innerHTML = contents;
		text.textContent = contents;

		return text;
	};

	// Create SVG element: g
	function group(transform) {

		let g = document.createElementNS("http://www.w3.org/2000/svg", "g");

		if("" != transform) {
			g.setAttribute("transform", transform);
		}

		return g;
	};

	let legendName = element.getAttribute("legend");
	let legend = chart.getLegend(legendName);
	let value = element.getAttribute("value");
	let label = element.getAttribute("label");
	let fontSize = chart.labels.fontSize;

	let margin = (fontSize * 0.5);

	let line1 = margin;
	let line2 = fontSize + (2 * margin);
	let line3 = (2 * fontSize) + (3 * margin);
	let line4 = (3 * fontSize) + (4 * margin);

	let width = 0;
	let widthLegend = 0;
	let widthValue = 0;
	let height = line4;

	let tooltipGroup = chart.tooltip.object;
	let ani = null;

	x += 10;
	y += 10;

	if(null == tooltipGroup || undefined == tooltipGroup) {

		tooltipGroup = group("");

		let box = rect(chart.id + "-tooltip", x, y, 0, height, chart.tooltip.backgroundColor, "transparent");
		box.setAttribute("rx", 5);
		box.setAttribute("ry", 5);
		tooltipGroup.appendChild(box);

		let labelText = text(chart.id + "-tooltip-label-text", x + margin, y + line1, fontSize, "start", "hanging", chart.tooltip.fontColor, label);
		tooltipGroup.appendChild(labelText);

		let legendMark = rect(chart.id + "-tooltip-legend-mark", x + margin, y + line2, fontSize, fontSize, legend.fill, legend.stroke);
		tooltipGroup.appendChild(legendMark);

		let legendText = text(chart.id + "-tooltip-legend-name", x + ((2 * margin) + fontSize), y + line2, fontSize, "start", "hanging", chart.tooltip.fontColor, legendName);
		tooltipGroup.appendChild(legendText);

		let valueText = text(chart.id + "-tooltip-value", x + margin, y + line3, fontSize, "start", "hanging", chart.tooltip.fontColor, value);
		tooltipGroup.appendChild(valueText);

		chart.tooltip.object = tooltipGroup; // Set for manage as singleton
		chart.panel.appendChild(chart.tooltip.object);

		// Resize box by text width
		widthLegend = (legendMark.getAttribute("width") * 1) + margin + legendText.getBoundingClientRect().width;
		widthValue = valueText.getBoundingClientRect().width;
		width = (widthLegend > widthValue ? widthLegend : widthValue) + (2 * margin);

		box.setAttribute("width", width);
	}
	else {

		tooltipGroup = chart.tooltip.object;

		let box = tooltipGroup.childNodes[0];
		let labelText = tooltipGroup.childNodes[1];
		let legendMark = tooltipGroup.childNodes[2];
		let legendText = tooltipGroup.childNodes[3];
		let valueText = tooltipGroup.childNodes[4];

		box.setAttribute("x", x);
		box.setAttribute("y", y);

		labelText.setAttribute("x", x + margin);
		labelText.setAttribute("y", y + line1);
		labelText.innerHTML = label;

		legendMark.setAttribute("x", x + margin);
		legendMark.setAttribute("y", y + line2);
		legendMark.setAttribute("fill", legend.fill);
		legendMark.setAttribute("stroke", legend.stroke);

		legendText.setAttribute("x", x + ((2 * margin) + fontSize));
		legendText.setAttribute("y", y + line2);
		legendText.innerHTML = legendName;

		valueText.setAttribute("x", x + margin);
		valueText.setAttribute("y", y + line3);
		valueText.innerHTML = value;

		// Resize box by text width
		widthLegend = (legendMark.getAttribute("width") * 1) + margin + legendText.getBoundingClientRect().width;
		widthValue = valueText.getBoundingClientRect().width;
		width = (widthLegend > widthValue ? widthLegend : widthValue) + (2 * margin);

		box.setAttribute("width", width);

		// If tooltip box position is out of chart area, reset coordinates
		if(x < 0 || (x + width) > chart.getWidth()) {

			x = chart.getWidth() - width;

			box.setAttribute("x", x);
			labelText.setAttribute("x", x + margin);
			legendMark.setAttribute("x", x + margin);
			legendText.setAttribute("x", x + ((2 * margin) + fontSize));
			valueText.setAttribute("x", x + margin);
		}

		if(y < 0 || (y + height) > chart.getHeight()) {

			y = chart.getHeight() - height;

			box.setAttribute("y", y);
			labelText.setAttribute("y", y + line1);
			legendMark.setAttribute("y", y + line2);
			legendText.setAttribute("y", y + line2);
			valueText.setAttribute("y", y + line3);
		}
	}
}

/**
 * Hide tooltip event handler
 * @param {Object} event - event object
 * @param {Object} chart - dopyo.js object
 */
Dopyo.prototype.hideTooltip = function(event, chart) {

	let x = event.clientX;
	let y = event.clientY;

	// If event invoked at same coordinate, end this function.
	if(x == chart.eventCoord.x && y == chart.eventCoord.y) {
		return;
	}
	else {
		chart.eventCoord.x = x;
		chart.eventCoord.y = y;
	}

	let tooltipGroup = chart.tooltip.object;

	// Move tooptip components to outside of chart area
	if(null != tooltipGroup) {

		let outsideX = chart.getWidth() + 10;
		let outsideY = chart.getHeight() + 10;
		let child = null;

		for(let i = 0; i < tooltipGroup.childNodes.length; i++) {
			child = tooltipGroup.childNodes[i];
			child.setAttribute("x", outsideX);
			child.setAttribute("y", outsideY);
		}
	}
}

/**
 * Set line graph width of line chart.
 * @param {Number} width - line graph width of line chart
 */
Dopyo.prototype.setLineWidth = function(width) {
	this.line.width = width;
}

/**
 * Set line style of line chart
 * @param {String} style - line style = "curve"|"straight"
 */
Dopyo.prototype.setLineStyle = function(style) {
	this.line.style = style;
}

/**
 * Show value point on line chart.
 * @param {Boolean} show - show value point on line chart
 */
Dopyo.prototype.setPointShow = function(show) {
	this.point.show = show;
}

/**
 * Set value point radius.
 * @param {Number} radius - value point radius
 */
Dopyo.prototype.setPointRadius = function(radius) {
	this.point.radius = radius;
}

/**
 * Set value point stroke width.
 * @param {Number} width - value point stroke width
 */
Dopyo.prototype.setPointStrokeWidth = function(width) {
	this.point.strokeWidth = width;
}

/**
 * Inject dopyo.js object to DOM object.
 * @param {Object} obj - DOM object to inject dopyo.js object
 */
Dopyo.prototype.inject = function(obj) {

	obj.appendChild(this.panel);

	let chart = this;
	let panel = this.panel;
	panel.style.width = obj.clientWidth;
	panel.style.height = obj.clientHeight;

	window.addEventListener("resize", function() {
		panel.style.width = obj.clientWidth;
		panel.style.height = obj.clientHeight;
		chart.tooltip.object = null;
		chart.draw(false);
	});
}

/**
 * Restart animation of all animated objects.
 */
Dopyo.prototype.restartAnimation = function() {

	let animateList = this.panel.getElementsByTagName("animate");

	for(let i = 0; i < animateList.length; i++) {
		animateList[i].beginElement();
	}
}

/**
 * Draw chart by chart type
 * @param {Boolean} restartAnimation - If it's true, restart animation when draw chart
 */
Dopyo.prototype.draw = function(restartAnimation) {

	if(undefined == restartAnimation) {
		restartAnimation = true;
	}

	// Remove all element
	while(this.panel.firstChild) {
		this.panel.removeChild(this.panel.firstChild);
		this.tooltip.object = null;
	}

	// Create SVG element: line
	let line = function(id, x1, y1, x2, y2, fill, stroke, width) {

		let moveTo = "M " + x1 + " " + y1;
		let lineTo = "L " + x2 + " " + y2;
		let strokeWidth = undefined == width ? 1 : width;

		let line = document.createElementNS("http://www.w3.org/2000/svg", "path");

		line.setAttribute("id", id);
		line.setAttribute("d", moveTo + " " + lineTo + " Z");
		line.setAttribute("fill", fill);
		line.setAttribute("stroke", stroke);
		line.setAttribute("stroke-width", strokeWidth);

		return line;
	};

	// Create SVG element: curve
	let curve = function(id, x1, y1, cx1, cy1, x2, y2, cx2, cy2, stroke, width) {

		let moveTo = "M " + x1 + " " + y1;
		let curveTo = "C " + cx1 + " " + cy1 + " " + cx2 + " " + cy2 + " " + x2 + " " + y2;
		let strokeWidth = undefined == width ? 1 : width;

		let curve = document.createElementNS("http://www.w3.org/2000/svg", "path");

		curve.setAttribute("id", id);
		curve.setAttribute("d", moveTo + " " + curveTo);
		curve.setAttribute("fill", "transparent");
		curve.setAttribute("stroke", stroke);
		curve.setAttribute("stroke-width", strokeWidth);

		return curve;
	};

	// Create SVG element: rect
	let rect = function(id, x, y, width, height, fill, stroke) {

		let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

		rect.setAttribute("id", id);
		rect.setAttribute("x", x);
		rect.setAttribute("y", y);
		rect.setAttribute("width", width);
		rect.setAttribute("height", height);
		rect.setAttribute("fill", fill);
		rect.setAttribute("stroke", stroke);

		return rect;
	};

	// Create SVG element: circle
	let circle = function(id, cx, cy, r, fill, stroke, strokeWidth) {

		let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

		circle.setAttribute("id", id);
		circle.setAttribute("cx", cx);
		circle.setAttribute("cy", cy);
		circle.setAttribute("r", r);
		circle.setAttribute("fill", fill);
		circle.setAttribute("stroke", stroke);
		circle.setAttribute("stroke-width", strokeWidth);

		return circle;
	};

	// Create SVG element: pie
	function pie(id, cx, cy, r, from, to, fill, stroke, strokeWidth) {

		let fromDegree = from * 360 - 90;
		let toDegree = to * 360 - 90;
		let over180 = to - from > 0.5 ? "1" : "0";

		let fromRadian = fromDegree * Math.PI / 180.0;
		let toRadian = toDegree * Math.PI / 180.0;
		
		let fromX = cx + r * Math.cos(fromRadian);
		let fromY = cy + r * Math.sin(fromRadian);
		let toX = cx + r * Math.cos(toRadian);
		let toY = cy + r * Math.sin(toRadian);

		let moveTo = "M " + cx + " " + cy;
		let lineTo1 = "L " + fromX + " " + fromY;

		let arc = "A " + r + " " + r + " 0 " + over180 + " 1 " + toX + " " + toY
		let lineTo2 = "L " + cx + " " + cy;

		strokeWidth = undefined == strokeWidth ? 1 : strokeWidth;

		let pie = document.createElementNS("http://www.w3.org/2000/svg", "path");

		pie.setAttribute("id", id);
		pie.setAttribute("d", moveTo + " " + lineTo1 + " " + arc + " " + lineTo2 + " Z");
		pie.setAttribute("fill", fill);
		pie.setAttribute("stroke", stroke);
		pie.setAttribute("stroke-width", strokeWidth);

		return pie;
	};

	// Create SVG element: text
	let text = function(id, x, y, fontSize, textAnchor, alignmentBaseline, fill, contents) {

		// Modify y coordinate beacuse IE not supported alignment-baseline attribute
		let agent = navigator.userAgent.toLowerCase();
		let isIE = false;
		if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
			isIE = true;
		}

		if(isIE) {
			if("hanging" == alignmentBaseline) {
				y += fontSize;
			}
			else if("middle" == alignmentBaseline) {
				y += fontSize/2;	
			}
			else if("baseline" == alignmentBaseline) {
				// No modify
			}
		}

		let text = document.createElementNS("http://www.w3.org/2000/svg", "text");

		text.setAttribute("id", id);
		text.setAttribute("x", x);
		text.setAttribute("y", y);
		text.setAttribute("font-size", fontSize);
		text.setAttribute("text-anchor", textAnchor);
		
		// IE not supported alignment-baseline attribute
		if(!isIE) {
			text.setAttribute("alignment-baseline", alignmentBaseline);	
		}

		text.setAttribute("fill", fill);

		text.innerHTML = contents;
		text.textContent = contents;

		return text;
	};

	// Create SVG element: aniamte
	let animate = function(attributeName, from, to, dur, fill) {

		let animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");

		animate.setAttribute("attributeName", attributeName);
		animate.setAttribute("from", from);
		animate.setAttribute("to", to);
		animate.setAttribute("dur", dur);
		animate.setAttribute("fill", fill);

		return animate;
	};

	// Common function: add comma
	let addComma = function(num) {
		var regexp = /\B(?=(\d{3})+(?!\d))/g;
		return num.toString().replace(regexp, ',');
	};

	// Calculate label width left of grid y
	let getGridXLabelWidth = function(chart) {

		let width = 0;

		if(!chart.gridX.label.show) {
			return;
		}
				
		let textMargin = chart.labels.fontSize/3;
		let tempText1 = null;
		let tempText2 = null;
		let maxWidth = 0;
		let currentWidth = 0;

		if("Column" == chart.type || "Line" == chart.type || "Stacked-Bar" == chart.type) {

			tempText1 = text("tempTextForCalculateWidth"
				, 0, 0
				, chart.labels.fontSize
				, "end", "middle"
				, chart.labels.fontColor
				, addComma(chart.getMaxValue()));

			chart.panel.appendChild(tempText1);
			maxWidth = tempText1.getBoundingClientRect().width;

			tempText2 = text("tempTextForCalculateWidth"
				, 0, 0
				, chart.labels.fontSize
				, "end", "middle"
				, chart.labels.fontColor
				, addComma(chart.getMinValue()));

			chart.panel.appendChild(tempText2);
			currentWidth = tempText2.getBoundingClientRect().width;

			maxWidth = maxWidth > currentWidth ? maxWidth : currentWidth;

			chart.panel.removeChild(tempText1);
			chart.panel.removeChild(tempText2);
		}

		else if("Bar" == chart.type) {

			chart.labels.list.forEach(function(label) {

				let tempText1 = text("tempTextForCalculateWidth"
					, 0, 0
					, chart.labels.fontSize
					, "end", "middle"
					, chart.labels.fontColor
					, label);

				chart.panel.appendChild(tempText1);

				currentWidth = tempText1.getBoundingClientRect().width;
				maxWidth = maxWidth > currentWidth ? maxWidth : currentWidth;

				chart.panel.removeChild(tempText1);
			});
		}

		width = textMargin
			+ maxWidth
			+ 10
			+ textMargin;

		return width;
	}

	// Calculate label height below axis x
	let getLabelHeight = function(chart) {

		let height = 0;

		if(chart.labels.show && "Pie" != chart.type) {

			let textMargin = chart.labels.fontSize/2;

			height = textMargin + chart.labels.fontSize + textMargin;
		}

		return height;
	}

	// Calculate axis Y min value
	let getAxisYMinValue = function(chart) {

		let axisYMinValue = chart.axisY.minValue;
		if("Stacked-Bar" == chart.type) {
			axisYMinValue = chart.axisY.stackedBarMinValue;
		}
		let minValue = chart.getMinValue();

		if(0 == axisYMinValue && 0 > minValue) {
			axisYMinValue = minValue;
		}

		return axisYMinValue;
	}

	// Calculate axis Y max value
	let getAxisYMaxValue = function(chart) {

		let axisYMaxValue = chart.axisY.maxValue;
		if("Stacked-Bar" == chart.type) {
			axisYMaxValue = chart.axisY.stackedBarMaxValue;
		}
		let maxValue = chart.getMaxValue();

		if(0 == axisYMaxValue && 0 < maxValue) {
			axisYMaxValue = maxValue;
		}

		return axisYMaxValue;
	}

	// Calculate axis X min value
	let getAxisXMinValue = function(chart) {

		let axisXMinValue = chart.axisX.minValue;
		let minValue = chart.getMinValue();

		if(0 == axisXMinValue && 0 > minValue) {
			axisXMinValue = minValue;
		}

		return axisXMinValue;
	}

	// Calculate axis X max value
	let getAxisXMaxValue = function(chart) {

		let axisXMaxValue = chart.axisX.maxValue;
		let maxValue = chart.getMaxValue();

		if(0 == axisXMaxValue && 0 < maxValue) {
			axisXMaxValue = maxValue;
		}

		return axisXMaxValue;
	}

	// Calculate ratio
	let getRatio = function(chart) {

		let valueRange = getAxisYMaxValue(chart) - getAxisYMinValue(chart);
		let graphHeight = chart.getHeight() - chart.padding.top - chart.padding.bottom - getLabelHeight(chart);

		return graphHeight / valueRange;
	}

	let getRatioForX = function(chart) {

		let valueRange = getAxisXMaxValue(chart) - getAxisXMinValue(chart);
		let graphWidth = chart.getWidth() - chart.padding.left - chart.padding.right - getGridXLabelWidth(chart);

		return graphWidth / valueRange;
	}

	// Calculate axis X position
	let getAxisXPosition = function(chart) {

		// Default value is most below position on graph area
		let y = chart.getHeight() - chart.padding.bottom - getLabelHeight(chart);
		let maxValue = getAxisYMaxValue(chart);
		let minValue = getAxisYMinValue(chart);

		// If chart draws only negative values, axis X located highest position 
		if(maxValue < 0) {
			y = chart.padding.top;
		}

		// If chart extends plus and minus values, get zero position
		else if(minValue < 0) {
			y = chart.padding.top + (maxValue * getRatio(chart));
		}

		return y;
	}

	// Calculate axis Y position
	let getAxisYPosition = function(chart) {

		// Default value is most below position on graph area
		let x = chart.padding.left + getGridXLabelWidth(chart);
		let maxValue = getAxisXMaxValue(chart);
		let minValue = getAxisXMinValue(chart);

		// If chart draws only negative values, axis Y located highest position 
		if(maxValue < 0) {
			x = chart.getWidth() - chart.padding.right;
		}

		// If chart extends plus and minus values, get zero position
		else if(minValue < 0) {
			x = x - (minValue * getRatioForX(chart));
		}

		return x;
	}
		
	// Get panel size
	let width = this.getWidth();
	let height = this.getHeight();

	// Get graph area size
	let graphMarginTop = this.padding.top;
	let graphMarginBottom = this.padding.bottom + getLabelHeight(this);
	let graphMarginLeft = this.padding.left + getGridXLabelWidth(this);
	let graphMarginRight = this.padding.right;

	let graphWidth = width - graphMarginLeft - graphMarginRight;
	let graphHeight = height - graphMarginTop - graphMarginBottom;

	// Draw chart title
	let drawChartTitle = function(chart) {

		if(!chart.title.show) {
			return;
		}

		// Draw title box
		let isCenter = false;
		let x = chart.title.position.x;

		if("center" == x) {
			isCenter = true;
			x = 0;
		}

		let titleMargin = chart.title.fontSize * 0.5;

		let titleBox = rect(chart.id + "-title-box"
			, x
			, chart.title.position.y
			, 0
			, chart.title.fontSize + (2 * titleMargin)
			, chart.title.backgroundColor
			, chart.title.borderColor);

		chart.panel.appendChild(titleBox);

		// Draw title text
		let titleText = text(chart.id + "-title-text"
			, x + titleMargin
			, chart.title.position.y + titleMargin
			, chart.title.fontSize
			, "start"
			, "hanging"
			, chart.title.fontColor
			, chart.title.text);

		titleText.setAttribute("font-family", chart.title.fontFamily);
		titleText.setAttribute("font-weight", chart.title.fontWeight);

		chart.panel.appendChild(titleText);

		// Expand title box by text width
		let boxWidth = titleText.getBoundingClientRect().width + (2 * titleMargin);
		titleBox.style.width = boxWidth;

		// Reset object position to center
		if(isCenter) {

			let toCenter = (chart.getWidth() - boxWidth) / 2;

			titleBox.setAttribute("x", toCenter);
			titleText.setAttribute("x", titleText.getAttribute("x") * 1 + toCenter);
		}
	}

	// Draw legend table
	let drawLegendTable = function(chart) {

		if(!chart.legends.table.show) {
			return;
		}

		let id = chart.id + "-legend-table";

		let x = chart.legends.table.position.x;
		let isCenter = false;
		let isRight = false;

		if("center" == x) {
			isCenter = true;
			x = 0;
		}
		else if("right" == x) {
			isRight = true;
			x = 0;
		}

		let y = chart.legends.table.position.y;

		let legendTable = rect(id, x, y, 0, 0, chart.legends.table.backgroundColor, chart.legends.table.borderColor);
		chart.panel.appendChild(legendTable);

		let legendMark = null;
		let legendText = null;
		let legendIndex = 0;
		let linePosition = 0;
		let wordWrap = 0;
		let margin = chart.labels.fontSize * 0.5;
		let totalWidth = 0;
		let maxWidth = 0;
		let totalHeight = 0;

		let objectArray = new Array();

		x += margin;

		let panel = chart.panel;
		let labelOptions = chart.labels;
		let tableOptions = chart.legends.table;

		chart.legends.list.forEach(function(legend) {

			if("vertical" == tableOptions.direction) {

				linePosition = y + margin + (3 * margin * legendIndex);

				legendMark = rect(id + "-mark-" + legendIndex, x, linePosition, labelOptions.fontSize, labelOptions.fontSize, legend.fill, legend.stroke);
				panel.appendChild(legendMark);
				objectArray.push(legendMark);

				legendText = text(id + "-text-" + legendIndex
					, x + margin + labelOptions.fontSize
					, linePosition
					, labelOptions.fontSize
					, "start"
					, "hanging"
					, tableOptions.fontColor
					, legend.name);
				panel.appendChild(legendText);
				objectArray.push(legendText);

				totalWidth = margin + labelOptions.fontSize + margin + legendText.getBoundingClientRect().width;
				maxWidth = maxWidth > totalWidth ? maxWidth : totalWidth;

				totalHeight += margin + labelOptions.fontSize;
			}
			else if("horizontal" == tableOptions.direction) {

				linePosition = y + margin + (3 * margin * wordWrap);

				legendMark = rect(id + "-mark-" + legendIndex, x, linePosition, labelOptions.fontSize, labelOptions.fontSize, legend.fill, legend.stroke);
				panel.appendChild(legendMark);
				objectArray.push(legendMark);

				x += labelOptions.fontSize + margin;

				legendText = text(id + "-text-" + legendIndex
					, x
					, linePosition
					, labelOptions.fontSize
					, "start"
					, "hanging"
					, tableOptions.fontColor
					, legend.name);
				panel.appendChild(legendText);
				objectArray.push(legendText);

				x += legendText.getBoundingClientRect().width + margin;

				totalWidth += margin + labelOptions.fontSize + margin + legendText.getBoundingClientRect().width;
				maxWidth = maxWidth > totalWidth ? maxWidth : totalWidth;

				totalHeight = (margin + labelOptions.fontSize) * (1 + wordWrap);
			}

			++legendIndex;
		});

		legendTable.style.height = totalHeight + margin;
		legendTable.style.width = maxWidth + margin;

		// Reset object position by align
		if(isCenter) {

			let toCenter = (chart.getWidth() - maxWidth - margin) / 2;

			legendTable.setAttribute("x", toCenter);

			objectArray.forEach(function(obj){
				let x = obj.getAttribute("x") * 1;
				obj.setAttribute("x", x + toCenter);
			});
		}
		else if(isRight) {

			let toRight = (chart.getWidth() - maxWidth - margin * 2);

			legendTable.setAttribute("x", toRight);

			objectArray.forEach(function(obj){
				let x = obj.getAttribute("x") * 1;
				obj.setAttribute("x", x + toRight);
			});
		}
	};

	// Draw grid X
	let drawGridX = function(chart) {

		// Draw horizontal grid
		if(!chart.gridX.show) {
			return;
		}

		if("Bar" == chart.type) {

			// Calculate variables
			let labelCount = chart.labels.list.length;
			let legendCount = chart.legends.list.length;
			let groupUnit = 2 * legendCount + 1;
			let unitCount = groupUnit * labelCount + 1;

			let unitSize = graphHeight / unitCount;

			let id = "";

			let y = 0;
			let from = graphMarginLeft - 5;
			let to = graphMarginLeft + graphWidth;

			let gridLine = null;

			for(let i = 1; i < chart.labels.list.length; i++) {

				y = chart.padding.top + (groupUnit * i + 0.5 ) * unitSize;

				gridLine = line(
					chart.id + "-grid-x-" + i
					, from
					, y
					, to
					, y
					, chart.gridX.fill
					, chart.gridX.fill);

				if(!chart.isIE) {
					gridLine.classList.add(chart.id + "-grid");
					gridLine.classList.add(chart.id + "-grid-x");
				}

				chart.panel.appendChild(gridLine);
			}

		}
		else {
			let axisYMinValue = getAxisYMinValue(chart);
			let axisYMaxValue = getAxisYMaxValue(chart);

			let unit = chart.gridX.interval;

			// Calculate interval if not set it
			if(0 == unit) {

				let range = (axisYMaxValue - axisYMinValue);
				let tempInterval = Math.round(range / 5);
				let intervalLength = ("" + tempInterval).length;
				let digits = Math.pow(10, intervalLength - 1);

				unit = Math.floor(tempInterval / digits) * digits;
			}

			let baseLineValue = Math.ceil(axisYMinValue / unit) * unit;

			let currentLineValue = baseLineValue;
			let currentLineHeight = 0;

			let gridIndex = 0;
			let gridLine = null;
			let gridLineValueLabel = null;

			let fontSize = chart.labels.fontSize;
			let fontFamily = chart.labels.fontFamily;
			let fontWeight = chart.labels.fontWeight;

			while(currentLineValue <= axisYMaxValue) {

				if(currentLineValue < axisYMinValue) {
					currentLineValue += unit;
					continue;
				}

				// Draw grid line
				currentLineHeight = chart.getHeight() - chart.padding.bottom - getLabelHeight(chart) - (currentLineValue - axisYMinValue) * getRatio(chart);

				gridLine = line(
					chart.id + "-grid-x-" + gridIndex
					, graphMarginLeft - 5
					, currentLineHeight
					, width - graphMarginRight
					, currentLineHeight
					, chart.gridX.fill
					, chart.gridX.fill);

				if(!chart.isIE) {
					gridLine.classList.add(chart.id + "-grid");
					gridLine.classList.add(chart.id + "-grid-x");
				}

				chart.panel.appendChild(gridLine);

				// Draw grid line value beside axis Y
				if(chart.gridX.label.show) {
					if(currentLineHeight >= fontSize / 2) {
						id = chart.id + "-grid-x-" + gridIndex + "-label"
						gridLineValueLabel = text(id
							, graphMarginLeft - 10
							, currentLineHeight
							, fontSize
							, "end"
							, "middle"
							, chart.labels.fontColor
							, addComma(currentLineValue));

						gridLineValueLabel.setAttribute("font-family", fontFamily);
						gridLineValueLabel.setAttribute("font-weight", fontWeight);
						if(!chart.isIE) {
							gridLineValueLabel.classList.add(chart.id + "-grid-x-label");
						}

						chart.panel.appendChild(gridLineValueLabel);
					}
				}

				currentLineValue += unit;
				++gridIndex;
			}
		}
	};

	// Draw grid Y
	let drawGridY = function(chart) {

		// Draw vertical grid
		if(!chart.gridY.show) {
			return;
		}

		if("Bar" == chart.type) {

			let axisXMinValue = getAxisXMinValue(chart);
			let axisXMaxValue = getAxisXMaxValue(chart);

			let unit = chart.gridY.interval;

			// Calculate interval if not set it
			if(0 == unit) {

				let range = (axisXMaxValue - axisXMinValue);
				let tempInterval = Math.round(range / 5);
				let intervalLength = ("" + tempInterval).length;
				let digits = Math.pow(10, intervalLength - 1);

				unit = Math.floor(tempInterval / digits) * digits;
			}

			let baseLineValue = Math.ceil(axisXMinValue / unit) * unit;

			let currentLineValue = baseLineValue;

			let gridIndex = 0;
			let gridLine = null;
			let x = 0;
			let from = chart.padding.top;
			let to = chart.padding.top + graphHeight + 5;

			let gridLineValueLabel = null;

			while(currentLineValue <= axisXMaxValue) {

				if(currentLineValue < axisXMinValue) {
					currentLineValue += unit;
					continue;
				}

				// Draw grid line
				x = graphMarginLeft + (currentLineValue - getAxisXMinValue(chart)) * getRatioForX(chart);

				gridLine = line(
					chart.id + "-grid-y-" + gridIndex
					, x
					, from
					, x
					, to
					, chart.gridY.fill
					, chart.gridY.fill);

				if(!chart.isIE) {
					gridLine.classList.add(chart.id + "-grid");
					gridLine.classList.add(chart.id + "-grid-x");
				}

				chart.panel.appendChild(gridLine);

				// Draw grid line value below axis X
				if(chart.gridY.label.show) {

					gridLineValueLabel = text(
						chart.id + "-grid-y-" + gridIndex + "-label"
						, x
						, chart.padding.top + graphHeight + chart.labels.fontSize/3
						, chart.labels.fontSize
						, "middle"
						, "hanging"
						, chart.labels.fontColor
						, addComma(currentLineValue));

					gridLineValueLabel.setAttribute("font-family", chart.labels.fontFamily);
					gridLineValueLabel.setAttribute("font-weight", chart.labels.fontWeight);

					if(!chart.isIE) {
						gridLineValueLabel.classList.add(chart.id + "-grid-y-label");
					}

					chart.panel.appendChild(gridLineValueLabel);
				}

				currentLineValue += unit;
				++gridIndex;
			}
		}

		else {

			let labelCount = chart.labels.list.length;
			let legendCount = 1;

			if("Column" == chart.type) {
				legendCount = chart.legends.list.length;
			}

			let groupUnit = 2 * legendCount + 1;
			let unitCount = groupUnit * labelCount + 1;

			let unitWidth = graphWidth / unitCount;

			let gridLine = null;
			let x = 0;
			let from = chart.padding.top;
			let to = chart.padding.top + graphHeight + 5;

			for(let i = 0; i < labelCount; i++) {

				if("Column" == chart.type || "Stacked-Bar" == chart.type) {
					if(i == labelCount - 1) {
						continue;
					}
					x = graphMarginLeft + (groupUnit * (i + 1)) * unitWidth + unitWidth/2;
				}
				else if("Line" == chart.type) {
					x = graphMarginLeft + ((groupUnit * unitWidth) / 2) + (groupUnit * unitWidth * i) + unitWidth/2;
				}

				gridLine = line(chart.id + "-grid-y-" + i
					, x
					, from
					, x
					, to
					, chart.gridY.fill
					, chart.gridY.fill);

				if(!chart.isIE) {
					gridLine.classList.add(chart.id + "-grid");
					gridLine.classList.add(chart.id + "-grid-y");
				}

				chart.panel.appendChild(gridLine);
			}
		}
	};

	// Draw labels
	let drawLabels = function(chart) {

		// Draw labels
		if(!chart.labels.show) {
			return;
		}

		let labelCount = chart.labels.list.length;
		let legendCount = 1;
		if("Column" == chart.type || "Bar" == chart.type) {
			legendCount = chart.legends.list.length;
		}
		let groupUnit = 2 * legendCount + 1;
		let unitCount = groupUnit * labelCount + 1;

		let unitSize = 0;

		if("Bar" == chart.type) {
			unitSize = graphHeight / unitCount;
		}
		else {
			unitSize = graphWidth / unitCount;
		}

		let index = 0;
		let label = null;
		let labels = chart.labels.list;
		let textAnchor = "";
		let alignmentBaseline = "";

		let x = 0, y = 0;

		if("Bar" == chart.type) {
			x = chart.padding.left + getGridXLabelWidth(chart) - 10;
			y = 0;
			textAnchor = "end";
			alignmentBaseline = "middle";
		}
		else {
			x = 0;
			y = chart.padding.top + graphHeight + (chart.labels.fontSize/2);
			textAnchor = "middle";
			alignmentBaseline = "hanging";
		}

		labels.forEach(function(label) {

			if("Bar" == chart.type) {
				y = graphMarginTop + (groupUnit * index + legendCount + 1) * unitSize;
			}
			else {
				x = graphMarginLeft + (groupUnit * index + legendCount + 1) * unitSize;
			}

			label = text(chart.id + "-label-" + index
				, x
				, y
				, chart.labels.fontSize
				, textAnchor
				, alignmentBaseline
				, chart.labels.fontColor
				, label);

			label.setAttribute("font-family", chart.labels.fontFamily);
			label.setAttribute("font-weight", chart.labels.fontWeight);

			if(!chart.isIE) {
				label.classList.add(chart.id + "-label");
			}

			chart.panel.appendChild(label);

			++index;
		});
	};

	// Draw axis X
	let drawAxisX = function(chart) {

		if(!chart.axisX.show) {
			return;
		}

		let y = getAxisXPosition(chart);

		if("Bar" == chart.type) {
			y = chart.padding.top + graphHeight;
		}

		let from = chart.padding.left + getGridXLabelWidth(chart) - 5;
		let to = chart.getWidth() - chart.padding.right;

		let axisX = line(
			chart.id + "-axis-x"
			, from
			, y
			, to
			, y
			, chart.axisX.color
			, chart.axisX.color
			, chart.axisX.width);

		if(!chart.isIE) {
			axisX.classList.add(chart.id + "-axis");
			axisX.classList.add(chart.id + "-axis-x");
		}

		chart.panel.appendChild(axisX);
	};

	// Draw axis Y
	let drawAxisY = function(chart) {

		if(!chart.axisY.show) {
			return;
		}

		let x = graphMarginLeft;

		if("Bar" == chart.type) {
			x = getAxisYPosition(chart);
		}

		let from = chart.padding.top;
		let to = chart.getHeight() - chart.padding.bottom - getLabelHeight(chart) + 5;

		let axisY = line(
			chart.id + "-axis-y"
			, x
			, from
			, x
			, to
			, chart.axisY.color
			, chart.axisY.color
			, chart.axisY.width);

		if(!chart.isIE) {
			axisY.classList.add(chart.id + "-axis");
			axisY.classList.add(chart.id + "-axis-y");
		}

		chart.panel.appendChild(axisY);
	};

	// Draw columns
	let drawColumns = function(chart) {

		if(undefined == chart.labels.list) {
			return;
		}

		// Calculate variables
		let labelCount = chart.labels.list.length;
		let legendCount = chart.legends.list.length;
		let groupUnit = 2 * legendCount + 1;
		let unitCount = groupUnit * labelCount + 1;

		let unitWidth = graphWidth / unitCount;

		let id = "";

		// Draw bars
		let legendsIndex = 0;

		let bar = null;
		let barWidth = unitWidth * 2;
		let valueHeight = 0;
		let x = 0;
		let y = 0;

		let animation = null;

		let barValue = null;

		chart.legends.list.forEach(function(legend) {

			let valuesIndex = 0;

			legend.values.forEach(function(value) {

				if(labelCount > valuesIndex) {

					if((value > 0 && value <= getAxisYMinValue(chart))
						|| (value < 0 && getAxisYMinValue(chart) >= 0)) {

						valueHeight = 0;
						y = getAxisXPosition(chart);
					}
					else {

						valueHeight = Math.abs(value) * getRatio(chart);

						if(value > 0) {

							y = chart.padding.top + graphHeight - ((value - getAxisYMinValue(chart)) * getRatio(chart));

							if(getAxisYMinValue(chart) > 0) {
								valueHeight -= getAxisYMinValue(chart) * getRatio(chart);
							}
						}
						else {

							y = getAxisXPosition(chart);

							if(y + valueHeight > chart.padding.top + graphHeight) {
								valueHeight = Math.abs(getAxisYMinValue(chart)) * getRatio(chart);
							}
						}
					}

					// Draw bars
					x = graphMarginLeft + (groupUnit * valuesIndex + 1 + 2 * legendsIndex) * unitWidth;

					id = chart.id + "-bar-" + legendsIndex + "-" + valuesIndex;

					bar = rect(id, x + 1, y, barWidth - 2, valueHeight, legend.fill, legend.stroke);
					if(!chart.isIE) {
						bar.classList.add(chart.id + "-bar"); // Add class Bar
						bar.classList.add(chart.id + "-bar-" + legendsIndex); // Add class Bar-Legend
					}
					bar.style.cursor = "pointer";

					if(chart.animate.show) {

						bar.setAttribute("height", 0);
						animation = animate("height", 0, valueHeight, chart.animate.duration, "freeze");
						bar.appendChild(animation);

						if(value > 0) {

							bar.setAttribute("y", getAxisXPosition(chart));
							animation = animate("y", getAxisXPosition(chart), y, chart.animate.duration, "freeze");
							bar.appendChild(animation);
						}
					}
					
					chart.panel.appendChild(bar);

					// Draw tooltip
					if(chart.tooltip.show) {

						bar.setAttribute("legend", legend.name);
						bar.setAttribute("value", addComma(value));
						bar.setAttribute("label", chart.labels.list[valuesIndex]);

						bar.addEventListener("mouseover", function(event) {
							chart.showTooltip(event, this, chart);
						});
						bar.addEventListener("mousemove", function(event) {
							chart.showTooltip(event, this, chart);
						});
						bar.addEventListener("mouseout", function(event) {
							chart.hideTooltip(event, chart);
						});
					}

					// Draw value on bar
					if(value > 0) {
						y = getAxisXPosition(chart) - valueHeight - (chart.labels.fontSize/3) - chart.labels.fontSize;
					}
					else {
						y = getAxisXPosition(chart) + valueHeight + (chart.labels.fontSize/3);
					}

					if(chart.valueOnChart.show && (value > 0 && y > 0 || value < 0 && (y + chart.labels.fontSize) < (graphHeight + chart.padding.top))) {

						id = chart.id + "-bar-" + legendsIndex + "-" + valuesIndex + "-value";

						barValue = text(id, x + barWidth/2, y, chart.labels.fontSize, "middle", "hanging", chart.labels.fontColor, addComma(value));
						if(!chart.isIE) {
							barValue.classList.add(chart.id + "-bar-value");
							barValue.classList.add(chart.id + "-bar-value-" + legendsIndex);
						}

						if(chart.animate.show) {

							barValue.setAttribute("font-size", 0);
							animation = animate("font-size", 0, chart.labels.fontSize, chart.animate.duration, "freeze");
							barValue.appendChild(animation);

							barValue.setAttribute("y", getAxisXPosition(chart));
							animation = animate("y", getAxisXPosition(chart), y, chart.animate.duration, "freeze");
							barValue.appendChild(animation);
						}

						chart.panel.appendChild(barValue);
					}

					++valuesIndex;
				}
			});

			++legendsIndex;
		});
	};

	// Draw bars
	let drawBars = function(chart) {

		if(undefined == chart.labels.list) {
			return;
		}

		// Calculate variables
		let labelCount = chart.labels.list.length;
		let legendCount = chart.legends.list.length;
		let groupUnit = 2 * legendCount + 1;
		let unitCount = groupUnit * labelCount + 1;

		let unitSize = graphHeight / unitCount;

		let id = "";

		// Draw bars
		let legendsIndex = 0;

		let bar = null;
		let barHeight = unitSize * 2;
		let valueWidth = 0;
		let x = 0;
		let y = 0;

		let animation = null;

		let barValue = null;
		let textAnchor = ""
		let alignmentBaseline = "";
		let textWidth = 0;

		chart.legends.list.forEach(function(legend) {

			let valuesIndex = 0;

			legend.values.forEach(function(value) {

				x = getAxisYPosition(chart);

				if(labelCount > valuesIndex) {

					if(value > 0 && value <= getAxisXMinValue(chart)
						|| value < 0 && getAxisXMinValue(chart) > 0) {

						valueWidth = 0;
					}
					else {

						valueWidth = Math.abs(value) * getRatioForX(chart);

						if(value < 0) {
							x -= valueWidth;
						}
						if(value > 0 && getAxisXMinValue(chart) > 0) {
							valueWidth -= getAxisXMinValue(chart) * getRatioForX(chart);
						}
					}

					// Draw bars
					y = chart.padding.top + (groupUnit * valuesIndex + 1 + 2 * legendsIndex) * unitSize;

					id = chart.id + "-bar-" + legendsIndex + "-" + valuesIndex;

					bar = rect(id, x, y + 1, valueWidth, barHeight - 2, legend.fill, legend.stroke);
					if(!chart.isIE) {
						bar.classList.add(chart.id + "-bar"); // Add class Bar
						bar.classList.add(chart.id + "-bar-" + legendsIndex); // Add class Bar-Legend
					}
					bar.style.cursor = "pointer";

					if(chart.animate.show) {

						bar.setAttribute("width", 0);
						animation = animate("width", 0, valueWidth, chart.animate.duration, "freeze");
						bar.appendChild(animation);

						if(value < 0) {

							bar.setAttribute("x", getAxisYPosition(chart));
							animation = animate("x", getAxisYPosition(chart), x, chart.animate.duration, "freeze");
							bar.appendChild(animation);
						}
					}
					
					chart.panel.appendChild(bar);

					// Draw tooltip
					if(chart.tooltip.show) {

						bar.setAttribute("legend", legend.name);
						bar.setAttribute("value", addComma(value));
						bar.setAttribute("label", chart.labels.list[valuesIndex]);

						bar.addEventListener("mouseover", function(event) {
							chart.showTooltip(event, this, chart);
						});
						bar.addEventListener("mousemove", function(event) {
							chart.showTooltip(event, this, chart);
						});
						bar.addEventListener("mouseout", function(event) {
							chart.hideTooltip(event, chart);
						});
					}

					// Draw value on bar
					if(chart.valueOnChart.show) {

						if(value > 0) {
							x = getAxisYPosition(chart) + valueWidth + chart.labels.fontSize/3;
							textAnchor = "start"
							alignmentBaseline = "central";
						}
						else {
							x = getAxisYPosition(chart) - valueWidth - chart.labels.fontSize/3;
							textAnchor = "end"
							alignmentBaseline = "middle";
						}

						id = chart.id + "-bar-" + legendsIndex + "-" + valuesIndex + "-value";

						barValue = text(id
							, x, y + unitSize + 1
							, chart.labels.fontSize
							, textAnchor
							, alignmentBaseline
							, chart.labels.fontColor
							, addComma(value));

						if(!chart.isIE) {
							barValue.classList.add(chart.id + "-bar-value");
							barValue.classList.add(chart.id + "-bar-value-" + legendsIndex);
						}

						chart.panel.appendChild(barValue);

						textWidth = barValue.getBoundingClientRect().width;

						if(value > 0 && x + textWidth > graphMarginLeft + graphWidth) {

							x = getAxisYPosition(chart) + valueWidth - chart.labels.fontSize/3;
							barValue.setAttribute("text-anchor", "end");
							barValue.setAttribute("x", x);
						}
						else if(value < 0 && x - textWidth < graphMarginLeft) {

							x = getAxisYPosition(chart) - valueWidth + chart.labels.fontSize/3;
							barValue.setAttribute("text-anchor", "start");
							barValue.setAttribute("x", x);
						}

						if(chart.animate.show) {

							barValue.setAttribute("font-size", 0);
							animation = animate("font-size", 0, chart.labels.fontSize, chart.animate.duration, "freeze");
							barValue.appendChild(animation);

							barValue.setAttribute("x", getAxisYPosition(chart));
							animation = animate("x", getAxisYPosition(chart), x, chart.animate.duration, "freeze");
							barValue.appendChild(animation);
						}
					}

					++valuesIndex;
				}
			});

			++legendsIndex;
		});
	};

	// Draw lines
	let drawLines = function(chart) {

		if(undefined == chart.labels.list) {
			return;
		}

		// Calculate variables
		let labelCount = chart.labels.list.length;
		let groupUnit = 3;
		let unitCount = groupUnit * labelCount + 1;

		let unitWidth = graphWidth / unitCount;

		let id = "";

		let legendsIndex = 0;

		// Draw lines
		chart.legends.list.forEach(function(legend) {

			let valuesIndex = 0;

			let x1 = 0;
			let x2 = 0;
			let y0 = 0;
			let y1 = null;
			let y2 = 0;

			let line1 = null;
			let lineD0 = "";
			let lineD1 = "";

			let animation = null;

			legend.values.forEach(function(value) {

				if(labelCount > valuesIndex) {
					
					// Calculate current coordinates
					x2 = graphMarginLeft + unitWidth/2 + ((groupUnit * unitWidth) / 2) + (groupUnit * unitWidth * valuesIndex);
					y2 = chart.padding.top + graphHeight - ((value - getAxisYMinValue(chart)) * getRatio(chart));

					if(null != y1
						&& y2 >= chart.padding.top - 0.1
						&& y2 <= chart.padding.top + graphHeight + 0.1) {

						id = chart.id + "-line-" + legendsIndex + "-" + valuesIndex;

						if("straight" == chart.line.style) {

							line1 = line(id
								, x1, y1
								, x2, y2
								, legend.stroke
								, legend.stroke
								, chart.line.width);

							if(!chart.isIE) {
								line1.classList.add(chart.id + "-line");
								line1.classList.add(chart.id + "-line-" + legendsIndex);
							}

							if(chart.animate.show) {

								// Flat line on axis X
								lineD0 = "M" + x1 + " " + getAxisXPosition(chart) + " L" + x2 + " " + getAxisXPosition(chart) + " Z";

								// Current line
								lineD1 = line1.getAttribute("d");

								line1.setAttribute("d", lineD0);
								animation = animate("d", lineD0, lineD1, chart.animate.duration, "freeze");
								line1.appendChild(animation);
							}
						}
						else if("curve" == chart.line.style) {

							line1 = curve(id
								, x1, y1
								, (x1 + x2) / 2, y1
								, x2, y2
								, (x1 + x2) / 2, y2
								, legend.stroke
								, chart.line.width);
							
							if(!chart.isIE) {
								line1.classList.add(chart.id + "-line");
								line1.classList.add(chart.id + "-line-" + legendsIndex);
							}

							if(chart.animate.show) {

								// Flat line on axis X
								lineD0 = "M" + x1 + " " + getAxisXPosition(chart)
									+ " C" + ((x1 + x2)/2) + " " + getAxisXPosition(chart)
									+ " " + ((x1 + x2)/2) + " " + getAxisXPosition(chart)
									+ " " + x2 + " " + getAxisXPosition(chart);

								// Current line
								lineD1 = line1.getAttribute("d");

								line1.setAttribute("d", lineD0);
								animation = animate("d", lineD0, lineD1, chart.animate.duration, "freeze");
								line1.appendChild(animation);
							}
						}

						chart.panel.appendChild(line1);
					}

					x1 = x2;

					y0 = y1;
					y1 = y2;

					++valuesIndex;
				}
			});

			++legendsIndex;
		});
	};

	// Draw points
	let drawPoints = function(chart) {

		if(undefined == chart.labels.list) {
			return;
		}

		// Calculate variables
		let labelCount = chart.labels.list.length;
		let groupUnit = 3;
		let unitCount = groupUnit * labelCount + 1;

		let unitWidth = graphWidth / unitCount;

		let id = "";

		let legendsIndex = 0;

		// Draw points
		chart.legends.list.forEach(function(legend) {

			let valuesIndex = 0;

			let x = 0;
			let y = 0;

			let point = null;
			let pointValue = null;
			let pointValueY = 0;
			let minY = chart.padding.top + graphHeight - (chart.labels.fontSize/3);

			legend.values.forEach(function(value) {

				if(labelCount > valuesIndex) {
					
					// Calculate current coordinates
					x = graphMarginLeft + unitWidth/2 + ((groupUnit * unitWidth) / 2) + (groupUnit * unitWidth * valuesIndex);
					y = chart.padding.top + graphHeight - ((value - getAxisYMinValue(chart)) * getRatio(chart));

					// Draw point
					if(chart.point.show
						&& y >= chart.padding.top - 0.1
						&& y <= chart.padding.top + graphHeight + 0.1) {

						id = chart.id + "-line-point-" + legendsIndex + "-" + valuesIndex;
						point = circle(id, x, y, chart.point.radius, legend.fill, legend.stroke, chart.point.strokeWidth);
						point.style.cursor = "pointer";

						if(chart.animate.show) {

							point.setAttribute("cy", getAxisXPosition(chart));
							pointMove = animate("cy", getAxisXPosition(chart), y, chart.animate.duration, "freeze");
							point.appendChild(pointMove);

							point.setAttribute("r", 0);
							pointMove = animate("r", 0, chart.point.radius, chart.animate.duration, "freeze");
							point.appendChild(pointMove);
						}

						chart.panel.appendChild(point);

						// Draw tooltip
						if(chart.tooltip.show) {

							point.setAttribute("legend", legend.name);
							point.setAttribute("value", addComma(value));
							point.setAttribute("label", chart.labels.list[valuesIndex]);

							point.addEventListener("mouseover", function(event) {
								chart.showTooltip(event, this, chart);
							});
							point.addEventListener("mousemove", function(event) {
								chart.showTooltip(event, this, chart);
							});
							point.addEventListener("mouseout", function(event) {
								chart.hideTooltip(event, chart);
							});
						}
					}

					// Draw value on point
					if(chart.valueOnChart.show) {

						id = chart.id + "-line-" + legendsIndex + "-" + valuesIndex + "-value";
						pointValueY = y - chart.point.radius - (chart.labels.fontSize/3);

						pointValueY = minY < pointValueY ? minY : pointValueY;

						if(pointValueY > chart.labels.fontSize) {

							pointValue = text(id
								, x, pointValueY
								, chart.labels.fontSize
								, "middle", "baseline"
								, chart.labels.fontColor
								, addComma(value));

							if(!chart.isIE) {
								pointValue.classList.add(chart.id + "-line-value");
								pointValue.classList.add(chart.id + "-line-value-" + legendsIndex);
							}

							if(chart.animate.show) {
								
								pointValue.setAttribute("y", getAxisXPosition(chart));
								pointMove = animate("y", getAxisXPosition(chart), pointValueY, chart.animate.duration, "freeze");
								pointValue.appendChild(pointMove);

								pointValue.setAttribute("font-size", 0);
								pointMove = animate("font-size", 0, chart.labels.fontSize, chart.animate.duration, "freeze");
								pointValue.appendChild(pointMove);
							}

							chart.panel.appendChild(pointValue);
						}
					}

					++valuesIndex;
				}
			});

			++legendsIndex;
		});
	};

	// Draw stacked bars
	let drawStackedBars = function(chart) {

		if(undefined == chart.labels.list) {
			return;
		}

		// Calculate variables
		let labelCount = chart.labels.list.length;
		let groupUnit = 3;
		let unitCount = groupUnit * labelCount + 1;

		let unitWidth = graphWidth / unitCount;

		let id = "";

		let bar = null;
		let barWidth = unitWidth * 2;
		let valueHeight = 0;
		let x = 0;
		let y = 0;
		let valueY = 0;

		let animation = null;

		let barValue = null;

		let labelIndex = 0;

		let legendsList = chart.legends.list;
		let labelObject = null;

		// Create value array by label
		let value = 0;
		let stackedBarArray = new Array();

		chart.labels.list.forEach(function(label) {

			labelObject = new Object();
			labelObject[label] = new Array();

			chart.legends.list.forEach(function(legend) {

				value = legend.values[labelIndex];
				value = undefined === value ? 0 : value; // Undefined value to Zero

				// Negative value not allowed at Stacked-Bar chart
				if(value < 0) {
					try {
						throw new Error("Negative value not allowed at [" 
							+ legend.name + "][" + labelIndex + "] = " + value);
					}
					catch(e) {
						console.log(e);
					}
					value = 0;
				}

				labelObject[label].push(value);

			});

			stackedBarArray.push(labelObject);

			++labelIndex;
		});

		// Draw bar
		let valuesIndex = 0;
		let legendsIndex = 0;
		let totalValue = 0;
		let cummulatedValue = 0;

		stackedBarArray.forEach(function(values) {

			legendsIndex = 0;
			x = graphMarginLeft + (groupUnit * valuesIndex + 1) * unitWidth;
			y = getAxisXPosition(chart);

			// Sum total value by label
			totalValue = 0;
			cummulatedValue = 0;

			values[chart.labels.list[valuesIndex]].forEach(function(value) {
				totalValue += value;
			});

			values[chart.labels.list[valuesIndex]].forEach(function(value) {

				// Draw bars
				id = chart.id + "-bar-" + legendsIndex + "-" + valuesIndex;
				valueHeight = value * getRatio(chart);

				if(getAxisYMinValue(chart) > 0) {

					if(cummulatedValue + value <= getAxisYMinValue(chart)) {
						valueHeight = 0;
					}
					else if(cummulatedValue <= getAxisYMinValue(chart) && cummulatedValue + value > getAxisYMinValue(chart)) {
						valueHeight = ((cummulatedValue + value) - getAxisYMinValue(chart)) * getRatio(chart);
					}
				}

				y -= valueHeight;

				bar = rect(id, x + 1, y, barWidth - 2, valueHeight, legendsList[legendsIndex].fill, legendsList[legendsIndex].stroke);

				if(!chart.isIE) {
					bar.classList.add(chart.id + "-bar"); // Add class Bar
					bar.classList.add(chart.id + "-bar-" + legendsIndex); // Add class Bar-Legend
				}
				bar.style.cursor = "pointer";

				if(chart.animate.show) {

					bar.setAttribute("height", 0);
					animation = animate("height", 0, valueHeight, chart.animate.duration, "freeze");
					bar.appendChild(animation);

					bar.setAttribute("y", getAxisXPosition(chart));
					animation = animate("y", getAxisXPosition(chart), y, chart.animate.duration, "freeze");
					bar.appendChild(animation);
				}
				
				chart.panel.appendChild(bar);

				// Draw tooltip
				if(chart.tooltip.show) {

					bar.setAttribute("legend", chart.legends.list[legendsIndex].name);
					bar.setAttribute("value", addComma(value) + " / " + addComma(totalValue));
					bar.setAttribute("label", chart.labels.list[valuesIndex]);

					bar.addEventListener("mouseover", function(event) {
						chart.showTooltip(event, this, chart);
					});
					bar.addEventListener("mousemove", function(event) {
						chart.showTooltip(event, this, chart);
					});
					bar.addEventListener("mouseout", function(event) {
						chart.hideTooltip(event, chart);
					});
				}

				// Draw value on bar
				valueY = y + valueHeight / 2;

				if(chart.valueOnChart.show && valueHeight > 0 && value > 0 && valueY > 0) {

					id = chart.id + "-bar-" + legendsIndex + "-" + valuesIndex + "-value";

					barValue = text(id, x + barWidth/2, valueY, chart.labels.fontSize, "middle", "middle", chart.labels.fontColor, addComma(value));
					if(!chart.isIE) {
						barValue.classList.add(chart.id + "-bar-value");
						barValue.classList.add(chart.id + "-bar-value-" + legendsIndex);
					}

					if(chart.animate.show) {

						barValue.setAttribute("font-size", 0);
						animation = animate("font-size", 0, chart.labels.fontSize, chart.animate.duration, "freeze");
						barValue.appendChild(animation);

						barValue.setAttribute("y", getAxisXPosition(chart));
						animation = animate("y", getAxisXPosition(chart), valueY, chart.animate.duration, "freeze");
						barValue.appendChild(animation);
					}

					chart.panel.appendChild(barValue);
				}

				cummulatedValue += value;
				++legendsIndex;
			});

			++valuesIndex;
		});
	};

	// Draw pie
	let drawPie = function(chart) {

		if(undefined == chart.labels.list) {
			return;
		}

		let legendName = "";
		let totalValue = 0;

		// Pie chart draws by first value
		for(let i = 0; i < chart.legends.list.length; i++) {

			legendName = chart.legends.list[i].name;

			// Negative value not allowed at Pie chart
			if(chart.legends.list[i].values[0] > 0) {
				totalValue += chart.legends.list[i].values[0];
			}
		}

		let cx = chart.getWidth() / 2;
		let cy = chart.padding.top + (chart.getHeight() - chart.padding.top) / 2;

		let radius = graphWidth / 2 > graphHeight / 2 ? graphHeight / 2 : graphWidth / 2;

		let id = "";
		let piece = null;
		let cummulatedValue = 0;
		let cummulatedRate = 0;
		let currentValue = 0;
		let currentRate = 0;
		let legendsIndex = 0;
		let transparent = "rgba(255, 255, 255, 0)"
		let gray = "rgba(200, 200, 200, 1)"
		let valueX = 0;
		let valueY = 0;

		chart.legends.list.forEach(function(legend) {

			currentValue = legend.values[0];

			// Negative value not allowed at Pie chart
			if(currentValue < 0) {
				try {
					throw new Error("Negative value not allowed at [" 
						+ legend.name + "][0] = " + currentValue);
				}
				catch(e) {
					console.log(e);
				}
			}

			else {

				currentRate = currentValue / totalValue;

				id = chart.id + "-pie-" + legendsIndex

				if(currentRate == 1.0) {
					piece = circle(id, cx, cy, radius, legend.fill, legend.stroke, 1);
				}
				else {
					piece = pie(id, cx, cy, radius, cummulatedRate, cummulatedRate + currentRate, legend.fill, legend.stroke, 1);
				}
				if(!chart.isIE) {
					piece.classList.add(chart.id + "-pie"); // Add class Bar
				}
				piece.style.cursor = "pointer";

				if(chart.animate.show) {

					piece.setAttribute("fill", transparent);
					animation = animate("fill", transparent, legend.fill, chart.animate.duration, "freeze");
					piece.appendChild(animation);

					piece.setAttribute("stroke", gray);
					animation = animate("stroke", gray, legend.stroke, chart.animate.duration, "freeze");
					piece.appendChild(animation);
				}

				chart.panel.appendChild(piece);

				// Draw tooltip
				if(chart.tooltip.show) {

					piece.setAttribute("legend", legend.name);
					piece.setAttribute("value", addComma(currentValue));
					piece.setAttribute("label", Math.round(10000 * (currentRate)) / 100 + "%");

					piece.addEventListener("mouseover", function(event) {
						chart.showTooltip(event, this, chart);
					});
					piece.addEventListener("mousemove", function(event) {
						chart.showTooltip(event, this, chart);
					});
					piece.addEventListener("mouseout", function(event) {
						chart.hideTooltip(event, chart);
					});
				}

				// Draw value on Pie
				if(chart.valueOnChart.show) {

					valueX = cx + (radius / 1.5) * Math.cos(((cummulatedRate + currentRate/2) * 360 - 90) * Math.PI / 180.0);
					valueY = cy + (radius / 1.5) * Math.sin(((cummulatedRate + currentRate/2) * 360 - 90) * Math.PI / 180.0);

					id = chart.id + "-pie-" + legendsIndex + "-name";

					legendText = text(id, valueX, valueY, chart.labels.fontSize, "middle", "middle", chart.labels.fontColor, Math.round(10000 * (currentRate)) / 100 + "%");
					if(!chart.isIE) {
						legendText.classList.add(chart.id + "-pie-name");
					}

					if(chart.animate.show) {

						legendText.setAttribute("font-size", 0);
						animation = animate("font-size", 0, chart.labels.fontSize, chart.animate.duration, "freeze");
						legendText.appendChild(animation);
					}

					chart.panel.appendChild(legendText);
				}

				cummulatedValue += currentValue;
				cummulatedRate = cummulatedValue / totalValue;
			}

			++legendsIndex;
		});
	};

	// Draw chart by type
	if("Column" == this.type) {

		drawGridX(this);
		drawGridY(this);

		drawColumns(this);

		drawAxisY(this);
		drawAxisX(this);

		drawLabels(this);
		drawChartTitle(this);
		drawLegendTable(this);

		if(restartAnimation) {
			this.restartAnimation(this);
		}
	}
	if("Bar" == this.type) {

		drawGridX(this);
		drawGridY(this);

		drawAxisX(this);
		drawAxisY(this);

		drawBars(this);

		drawLabels(this);
		drawChartTitle(this);
		drawLegendTable(this);

		if(restartAnimation) {
			this.restartAnimation(this);
		}
	}
	else if("Line" == this.type) {

		drawGridX(this);
		drawGridY(this);

		drawAxisX(this);
		drawAxisY(this);

		drawLines(this);
		drawPoints(this);

		drawLabels(this);
		drawChartTitle(this);
		drawLegendTable(this);

		if(restartAnimation) {
			this.restartAnimation(this);
		}
	}
	else if("Stacked-Bar" == this.type) {

		drawGridX(this);
		drawGridY(this);

		drawAxisX(this);
		drawAxisY(this);

		drawStackedBars(this);

		drawLabels(this);
		drawChartTitle(this);
		drawLegendTable(this);

		if(restartAnimation) {
			this.restartAnimation(this);
		}
	}
	else if("Pie" == this.type) {

		drawPie(this);

		drawChartTitle(this);
		drawLegendTable(this);

		if(restartAnimation) {
			this.restartAnimation(this);
		}
	}
}