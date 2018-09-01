;(function () {
    'use strict';

    angular
        .module('app')
        .controller('LocationController', LocationController);


    LocationController.$inject = ['data', 'stations', '$mdSidenav', 'NgTableParams'];

    function LocationController(data, stations, $mdSidenav, NgTableParams) {
        var vm = this;
        vm.stringArray = data.content.split('\n');
        vm.content = vm.stringArray.slice(8);
        vm.currentCity = data.title;
        vm.stations = stations;
        vm.currentStation = vm.stations[data.state][data.title];
        vm.getMainObject = getMainObject;
        vm.stationDetails = vm.stringArray[1];
        vm.tableData = vm.getMainObject(vm.content);
        vm.tableParams = new NgTableParams({count: 55, sorting: {
                year: 'desc'
            }}, {counts: [], dataset: vm.tableData});
        vm.toggleLeft = buildToggler('left');

        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }

        function getMainObject(rawContent) {
            var index = 1;
            return rawContent.map(function (dataString) {
                var stringArray = dataString.trim().split(/\s+/);
                return {
                    year: stringArray[0],
                    month: stringArray[1],
                    tmax: stringArray[2],
                    tmin: stringArray[3],
                    af: stringArray[4],
                    rain: stringArray[5],
                    sun: stringArray[6]
                };
            });
        }
    }
})();