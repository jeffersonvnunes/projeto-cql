angular.module('projetocql').controller('PresentationController',
    function($scope, $routeParams, $sce, PresentationService, Dashboard) {

        $scope.message = {};
        $scope.presentation = {};
        $scope.coloredBackground = false;

        $scope.gridsterOpts = {
            columns: 12, // the width of the grid, in columns
            pushing: false, // whether to push other items out of the way on move or resize
            floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
            swapping: true, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
            width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
            colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
            rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
            margins: [5, 5], // the pixel distance between each widget
            outerMargin: true, // whether margins apply to outer edges of the grid
            sparse: false, // "true" can increase performance of dragging and resizing for big grid (e.g. 20x50)
            isMobile: false, // stacks the grid items if true
            mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
            mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
            minColumns: 1, // the minimum columns the grid must have
            minRows: 3, // the minimum height of the grid, in rows
            maxRows: 100,
            defaultSizeX: 1, // the default width of a gridster item, if not specifed
            defaultSizeY: 1, // the default height of a gridster item, if not specified
            minSizeX: 1, // minimum column width of an item
            maxSizeX: null, // maximum column width of an item
            minSizeY: 1, // minumum row height of an item
            maxSizeY: null, // maximum row height of an item
            resizable: {
                enabled: true
                //handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                //start: function(event, $element, widget) {}, // optional callback fired when resize is started,
                //resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
                //stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
            },
            draggable: {
                enabled: true // whether dragging items is supported
                //handle: '.my-class', // optional selector for drag handle
                //start: function(event, $element, widget) {}, // optional callback fired when drag is started,
                //drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
                //stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
            }
        };

        function updateSlideNumber(){
            for(var i = 0; i < $scope.presentation.views.length; i++){
                $scope.presentation.views[i].number = i;
            }
        }

        if($routeParams.presentationId) {
            PresentationService.get({id: $routeParams.presentationId},
                function(presentation) {
                    $scope.presentation = presentation;

                    updateSlideNumber();

                    $scope.selectedSlide = $scope.presentation.views[0];

                    $scope.selectedSlide.dashboards.forEach(function (dash) {
                        loadFilters(dash);
                    })
                },
                function(error) {
                    $scope.message = {
                        text: 'Apresentação não encontrada.'
                    };
                }
            );
        } else {
            $scope.presentation = new PresentationService();
            $scope.presentation.active = true;
            $scope.presentation.views = [];
        }

        $scope.addSlide = function (){
            var slide = {
                active: true,
                dashboards: [],
                number: $scope.presentation.views.length
            };

            $scope.presentation.views.push(slide);

            $scope.selectedSlide = slide;
        };

        $scope.addDashboard = function () {
            var dash = {
                    sizeX: 3,
                    sizeY: 3,
                    row: 0,
                    col: 0,
                    filtersSelected: []
                };

            $scope.selectedSlide.dashboards.push(dash);
        };

        $scope.removeSlide = function (){
            var slide = $scope.selectedSlide.number;

            $scope.selectedSlide = undefined;

            $scope.presentation.views.splice(slide, 1);

            if($scope.presentation.views.length > 0){
                updateSlideNumber();

                if(slide >= 1){
                    slide --;
                } else {
                    slide = 0;
                }

                $scope.selectedSlide = $scope.presentation.views[slide];
                
                $scope.selectedSlide.dashboards.forEach(function (dash) {
                    loadFilters(dash);
                });
            }
        };

        $scope.removeDashboard = function(index){
           $scope.selectedSlide.dashboards.splice(index,1);           
        };

        $scope.previousSlide = function () {
            if($scope.selectedSlide.number > 0){
                $scope.selectedSlide = $scope.presentation.views[$scope.selectedSlide.number - 1];
            }else {
                $scope.selectedSlide = $scope.presentation.views[$scope.presentation.views.length -1];
            }
            
            $scope.selectedSlide.dashboards.forEach(function (dash) {
                loadFilters(dash);
            });
        };

        $scope.nextSlide = function () {
            if($scope.selectedSlide.number < $scope.presentation.views.length - 1){
                $scope.selectedSlide = $scope.presentation.views[$scope.selectedSlide.number + 1];
            }else{
                $scope.selectedSlide = $scope.presentation.views[0];
            } 
            
            $scope.selectedSlide.dashboards.forEach(function (dash) {
                loadFilters(dash);
            });
        };

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
                    additionalAction(dash);
                }
            });
        }

        $scope.loadDashData = function (dash) {
            loadFilters(dash,  $scope.loadChart);
        };

        $scope.loadChart = function (dash) {
            if(dash._id){
                var filters = dash.filtersSelected[0] && dash.filtersSelected[0].value ? dash.filtersSelected : dash.filters;
                PresentationService.show(dash._id, filters).then(function (chart) {
                    dash.amChartObj =  chart.amChartObj;
                    dash.title = chart.title;
                    if(chart && chart.amChartObj){
                        chart.amChart.write(dash._id);
                    }else{
                        dash.chartHTML = $sce.trustAsHtml(chart.write());
                    }

                }).catch(function (error) {
                    $scope.message = {
                        text: error.message
                    };
                });
            }
        };

        $scope.updateChart = function (dash) {
            var filters = dash.filtersSelected[0] && dash.filtersSelected[0].value ? dash.filtersSelected : dash.filters;
            PresentationService.show(dash._id, filters).then(function (chart) {
                dash.amChartObj =  chart.amChartObj;
                dash.title = chart.title;
                if(chart && chart.amChartObj){
                    chart.amChart.write(dash._id);
                }else{
                    dash.chartHTML = $sce.trustAsHtml(chart.write());
                }
            }).catch(function (error) {
                $scope.message.text = error.message;
            });
        };

        $scope.save = function() {
            $scope.presentation.$save()
                .then(function() {
                    $scope.selectedSlide.dashboards.forEach(function (dash) {
                        loadFilters(dash);
                    });

                    updateSlideNumber();

                    $scope.message = {text: 'Salvo com sucesso'};
                })
                .catch(function(error) {
                    $scope.message = {text: 'Não foi possível salvar'};
                });
        };

        function getDashboards() {
            Dashboard.query(
                function(dashboards) {
                    $scope.dashboards = dashboards;
                },
                function(erro) {
                    console.log(erro);
                }
            );
        }
        getDashboards();
    });