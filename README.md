# dopyo.js
dopyo.js is simple JavaScript chart library based SVG.
Easy to use, easy to modify.

## Exmaple
- [Click link](http://park108-dopyo-js.s3-website.ap-northeast-2.amazonaws.com)

## How to Use
1. Import library in HTML
	```
	<script src="{path}/dopyo.js"></script>
	```

2. Create Dopyo.js Object
	```
	let d = new Dopyo("chart-id", "Bar"); // DOM id, Chart type
	```

3. Set labels.
	```
	d.setLabels(["2013", "2014", "2015", "2016", "2017", "2018"]);
	```

4. Set legends and values.
	```
	d.addLegend({"name": "Alpha", "values": [10, 20, 30, 40, 50, 60]});
	d.addLegend({"name": "Bravo", "values": [65, 15, 25, 40, 60, 75]});
	d.addLegend({"name": "Charlie", "values": [20, 45, 65, 45, 20, 70]});
	```

5. Set attributes as you want.
	```
	d.setPadding(75, 30, 10, 0);
	d.setTitleText("Title for Chart");
	d.setGridYShow(true);
	...
	```

6. Inject chart into DOM object.
	```
	let div = document.getElementById("chart1");
	d.inject(div);
	```

7. Draw
	```
	d.draw();
	```

## Chart types
1. Bar chart
	![Bar chart exmaple](http://park108-dopyo-js.s3-website.ap-northeast-2.amazonaws.com/document/bar.png)

2. Column chart
	![Column chart exmaple](http://park108-dopyo-js.s3-website.ap-northeast-2.amazonaws.com/document/column.png)

3. Line chart
	![Line chart exmaple](http://park108-dopyo-js.s3-website.ap-northeast-2.amazonaws.com/document/line.png)

4. Stacked-Bar chart
	![Stacked-Bar chart exmaple](http://park108-dopyo-js.s3-website.ap-northeast-2.amazonaws.com/document/stacked-bar.png)

5. Pie chart
	![Pie chart exmaple](http://park108-dopyo-js.s3-website.ap-northeast-2.amazonaws.com/document/pie.png)


## API
- [API document link](http://park108-dopyo-js.s3-website.ap-northeast-2.amazonaws.com/jsdoc/Dopyo.html)