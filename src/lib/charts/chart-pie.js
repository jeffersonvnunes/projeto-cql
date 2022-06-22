angular.module('projetocql.charts')

  .factory("PieChart", function (BaseChart) {

      function PieChart(data) {
         BaseChart.apply(this, arguments);
         this.donutStyle = data.config.donutStyle;
      }

      PieChart.prototype = Object.create(BaseChart.prototype);
      PieChart.prototype.constructor = PieChart;

      PieChart.prototype.toAmChart = function() {

      var chart = new AmCharts.AmPieChart();

      this.setDefaultConf(chart);

          chart.dataProvider = this.chartData;
          chart.titleField = this.serieLabel;
          chart.valueField =  this.serie;
          chart.startEffect = 'elastic';
          chart.sequencedAnimation = true;
          chart.startDuration = this.animationDuration;
          chart.groupPercent = 2;
          chart.groupedTitle = 'Outros';

          if(this.donutStyle) {
              chart.innerRadius = '45%';
          }

          if(this.showLegend) {
              var legend = new AmCharts.AmLegend();

              legend.align = 'center';
              legend.autoMargins = false;
              legend.markerType = 'circle';
              legend.valueText = '';
              legend.spacing = 20;
              legend.valueText = '[[value]]';

              chart.addLegend(legend);
          }

      return chart;
    };

    return PieChart;
  });
