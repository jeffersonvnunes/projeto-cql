angular.module('projetocql.charts', [])

.constant('GRAPH_TYPE',{
    bar: ['BAR','Gráfico de Barra'],
    pie: ['PIE','Gráfico Pizza'],
    table:['TABLE','Gráfico de Tabela']
})

.constant('DATA_FORMAT',{
    text: ['TEXT','Texto'],
    integer: ['INTEGER','Número'],
    float: ['FLOAT','Valor'],
    date: ['DATE','Data'],
    dateTime: ['DATETIME','Data e Hora'],
    time: ['TIME','Hora']
})

.constant('ANIMATION',{
    duration: 0
})

.factory('BaseChart', function (ANIMATION) {
    function BaseChart(data, source) {
        this.title = data.name;
        this.animationDuration = ANIMATION.duration;
        this.id = data._id;
        this.serie = data.config.serie;
        this.serieLabel = data.config.serieLabel;
        this.valueFields = data.config.valueFields;
        this.valueLabel = data.config.valueLabel;
        this.chartData = source.query;
        this.datafields = source.fields;
        this.showLegend = true;
        this.zoomEnabled = data.config.zoomEnabled;
        this.amChartObj = true;
        this.showValueLabels = data.config.showValueLabels;
        this.hideLegend = data.config.hideLegend;
    }

    BaseChart.prototype.setDefaultConf = function(chart) {
        chart.thousandsSeparator = ".";
        chart.decimalSeparator = ",";
        chart.language = 'pt';
        chart.responsive = {
            "enabled": true
        };

        chart.addTitle(this.title);
    };

    BaseChart.prototype.refreshDataOnly = function(query){
        this.chartData = query;
        this.amChart.dataProvider = this.chartData;
        this.amChart.validateData();
    };

    BaseChart.prototype.toAmChart = undefined;

    return BaseChart;
});
