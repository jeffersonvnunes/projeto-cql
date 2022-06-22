angular.module('projetocql.charts')

  .factory("TableChart", function (BaseChart, DATA_FORMAT) {

      function TableChart(data) {
         BaseChart.apply(this, arguments);
         this.amChartObj = false;
      }

      TableChart.prototype = Object.create(BaseChart.prototype);
      TableChart.prototype.constructor = TableChart;

      TableChart.prototype.write = function() {

          function formatValue(value, format){
              var resp;

              switch(format) {
                  case DATA_FORMAT.dateTime[0]:
                      resp = new Date(value).toLocaleString()
                      break;
                  case DATA_FORMAT.date[0]:
                      resp = new Date(value).toLocaleDateString()
                      break;
                  case DATA_FORMAT.time[0]:
                      resp = new Date(value).toLocaleTimeString()
                      break;
                  case DATA_FORMAT.float[0]:
                      resp = parseFloat(value)
                      break;
                  case DATA_FORMAT.integer[0]:
                      resp = parseInt(value);
                      break;
                  case DATA_FORMAT.text[0]:
                      resp = value
                      break;
                  default:
                    resp = value
              }

              return resp;
          }

          var html =  '<section class="table-responsive full-h">'
                     +'    <table class="table table-striped table-hover">'
                     +'        <thead><tr>';

          for(var i = 0; i < this.valueFields.length; i++ ){
              html += '<th>' + (this.valueFields[i].label ? this.valueFields[i].label : this.valueFields[i].value) + '</th>';
          }

          html += '</tr></thead>';

          html += '<tbody class="scroll">';

          for(var i = 0; i < this.chartData.length; i++ ){
              html +=  '<tr>';

              for(var j = 0; j < this.valueFields.length; j++ ){
                  html += '<td>';

                  if(this.chartData[i][this.valueFields[j].value]) {
                    html += formatValue(this.chartData[i][this.valueFields[j].value], this.valueFields[j].dataFormat);
                  }

                  html += '</td>';
              }

              html += '</tr>';
          }

          html += '</tbody>';

          return html + '</table></section>';
      };

      return TableChart;
  });
