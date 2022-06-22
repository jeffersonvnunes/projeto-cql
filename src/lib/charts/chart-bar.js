angular.module('projetocql.charts')

  .factory("BarChart", function (BaseChart) {

      function BarChart(data) {
         BaseChart.apply(this, arguments);
      }

      BarChart.prototype = Object.create(BaseChart.prototype);
      BarChart.prototype.constructor = BarChart;

      BarChart.prototype.toAmChart = function() {

      var chart = new AmCharts.AmSerialChart(AmCharts.themes.light);

      this.setDefaultConf(chart);

      chart.dataProvider = this.chartData;
      chart.categoryField = this.serie;
      chart.startEffect = "easeInSine";
      chart.sequencedAnimation = false;
      chart.startDuration = this.animationDuration;


      if(this.zoomEnabled){
          chart.chartScrollbar = new AmCharts.ChartScrollbar();
      }

      var categoryAxis = chart.categoryAxis;
      categoryAxis.autoGridCount  = false;
      categoryAxis.gridCount = chart.dataProvider.length;
      categoryAxis.gridAlpha = 0;//calcGridAlpha(this.showGridLineWidthAxisY);
      categoryAxis.gridPosition = "start";
      categoryAxis.labelRotation = 45;//this.rotateLabel;
      categoryAxis.title = this.serieLabel;

      var graph = {};

      for(var i = 0; i < this.valueFields.length; i++){
          graph = new AmCharts.AmGraph();
          graph.id = i+1;
          graph.title = this.valueFields[i].label;
          graph.valueField = this.valueFields[i].value;
          //graph.colorField = "color";

          graph.showBalloon = !this.showValueLabels;

          if (graph.showBalloon){
              graph.balloonText = "[[category]]: <b>[[value]]</b>";
          } else {
              graph.labelText = "[[value]]";
          }

         if (!this.valueFields[i].line){
             graph.type = "column";
             graph.lineAlpha = 0;
             graph.fillAlphas = 1;
         }else{
             graph.bullet = "round";
             graph.lineThickness = 3;
             graph.bulletSize = 7;
             graph.bulletBorderAlpha = 1;
             graph.useLineColorForBulletBorder = true;
             graph.bulletBorderThickness = 3;
             graph.lineAlpha = 1;
             graph.fillAlphas = 0;
         }

          graph.lineColor = this.valueFields[i].color ? this.valueFields[i].color : null;
          chart.addGraph(graph);
      }

      chart.creditsPosition = "top-right";

      if (!this.hideLegend){
          var legend = new AmCharts.AmLegend();
          legend.borderAlpha = 0.2;
          legend.horizontalGap = 10;
          chart.addLegend(legend);
      }

      var valueAxis = new AmCharts.ValueAxis();
      valueAxis.dashLength = 5;
      valueAxis.title = this.valueLabel;
      valueAxis.axisAlpha = 0;
      chart.addValueAxis(valueAxis);

      return chart;
    };

    return BarChart;
  });
