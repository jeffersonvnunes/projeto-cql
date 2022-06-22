angular.module('projetocql').controller('PresentationSlideController',
    function($routeParams, $scope, $rootScope, $sce, PresentationService, Dashboard) {

        $rootScope.hideNavbar = $routeParams.navbar ? $routeParams.navbar.toUpperCase() === 'HIDE' : false;

        $scope.message = {};
        $scope.standardItems = [];

        $scope.gridsterOpts = {
            resizable: {
                enabled: false
            },
            draggable: {
                enabled: false
            }
        };

        var slideIndex = 0,
            windowOnkeydown = window.onkeydown,
            timeOutId;

        function onLeftRightPress(event){
            if(event.keyCode === 39 && $scope.nextSlide){
                $scope.nextSlide();
            }else if(event.keyCode === 37 && $scope.previousSlide){
                $scope.previousSlide();
            }
        }

        window.onkeydown = onLeftRightPress;


        $scope.loadChart = function (dash) {
            if(dash._id){
                var filters = dash.filtersSelected[0] && dash.filtersSelected[0].value ? dash.filtersSelected : dash.filters;
                dash.loading = true;
                PresentationService.show(dash._id, filters).then(function (chart) {
                    dash.amChartObj =  chart.amChartObj;
                    dash.title = chart.title;
                    if(chart && chart.amChartObj){
                        chart.amChart.write(dash._id);
                    }else{
                        dash.chartHTML = $sce.trustAsHtml(chart.write());
                    }
                    dash.loading = false;
                }).catch(function (error) {
                    $scope.message = {
                        text: error.message
                    };
                    dash.loading = false;
                });
            }
        };

        $scope.updateChart = function (dash, loadingIcon) {
            loadingIcon = (typeof loadingIcon !== 'undefined') ? loadingIcon : true;

            var filters = dash.filtersSelected[0] && dash.filtersSelected[0].value ? dash.filtersSelected : dash.filters;

            if(loadingIcon){
                dash.loading = true;
            }

            PresentationService.show(dash._id, filters).then(function (chart) {
                dash.amChartObj =  chart.amChartObj;
                dash.title = chart.title;
                if(chart && chart.amChartObj){
                    chart.amChart.write(dash._id);
                }else{
                    dash.chartHTML = $sce.trustAsHtml(chart.write());
                }
                dash.loading = false;
            }).catch(function (error) {
                $scope.message.text = error.message;
                dash.loading = false;
            });
        };

        $scope.$on('$destroy', function() {
            window.onkeydown = windowOnkeydown;

            if($scope.presentation){
                $scope.presentation.views.forEach(function (view) {
                    view.dashboards.forEach(function (dash) {
                        if(dash.intervalId){
                            clearInterval(dash.intervalId);
                        }
                    });
                });
            }
        });

        function loadFilters (dash, additionalAction) {

            Dashboard.getDataSourceFilterList(dash._id).then(function (data) {
                var
                    filterFound,
                    filtersSelected = [];

                dash.filters = data;

                for(var i = 0; i < dash.filters.length; i++){

                    filterFound = false;

                    for( var y = 0; y < dash.filtersSelected.length; y++ ){
                        if(dash.filtersSelected[y].identifier === dash.filters[i].identifier){
                            filterFound = true;

                            if(!dash.filtersSelected[y]){
                                dash.filtersSelected[y].value = dash.filters[i].values[0].value;
                            }

                            filtersSelected.push(dash.filtersSelected[y]);
                            break;
                        }
                    }

                    if(!filterFound){
                        filtersSelected.push({
                            identifier: dash.filters[i].identifier,
                            value: dash.filters[i].values[0].value
                        });
                    }

                    dash.filters[i].getDescription = function () {
                        return this.description ? this.description : this.identifier;
                    };
                }

                dash.filtersSelected = filtersSelected;

                if(additionalAction){
                    additionalAction();
                }

                if(dash.updateInterval && dash.updateInterval >= 1){
                    if(dash.intervalId){
                        clearInterval(dash.intervalId);
                    }

                    dash.intervalId = setInterval(function(){ 
                        $scope.updateChart(dash, false); 
                    }, dash.updateInterval * 1000);
                }

            });
        }

        function showSlide(index) {
            var slides = document.getElementsByClassName("slide"),
                dots = document.getElementsByClassName("dot");

            if(slides[slideIndex]){
                slides[slideIndex].style.display = "none";
                dots[slideIndex].className = dots[slideIndex].className.replace(" active", "");

                slideIndex = index;

                slides[slideIndex].style.display = "block";
                dots[slideIndex].className += " active";

                if(timeOutId){
                    clearTimeout(timeOutId);
                }

                var interval = $scope.presentation.views[slideIndex].slideInterval;

                timeOutId = setTimeout(function () {
                    $scope.nextSlide();
                }, (interval ? interval : 30) * 1000);
            }
        }

        $scope.nextSlide = function (){
            var newIndex = 0;

            if(slideIndex < $scope.presentation.views.length - 1){
                newIndex = slideIndex + 1;
            }

            showSlide(newIndex);
        };

        $scope.previousSlide = function () {
            var newIndex = $scope.presentation.views.length - 1;

            if(slideIndex >= 1){
                newIndex = slideIndex - 1;
            }

            showSlide(newIndex);
        };

        $scope.currentSlide = function (index) {
            showSlide(index);
        };

        PresentationService.get({id: $routeParams.presentationId},
            function(presentation) {
                var slide;
                $scope.presentation = presentation;

                for(var i = 0; i < $scope.presentation.views.length; i++){
                    slide = $scope.presentation.views[i];
                    slide.number = i;

                    slide.dashboards.forEach(function (dash) {
                        loadFilters(dash);
                    });
                }

                if($scope.presentation.views.length > 0){
                    setTimeout(function () {
                        var divs = document.getElementsByClassName("slide");

                        for (var i = 0; i < divs.length; i++) {
                            divs[i].style.display = "none";
                        }

                        $scope.currentSlide(0);
                    }, 500);
                }

            },
            function(error) {
                $scope.message = {
                    text: 'Apresentação não encontrada.'
                };
            }
        );

    });