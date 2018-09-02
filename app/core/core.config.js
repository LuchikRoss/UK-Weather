;(function () {
        'use strict';

        angular
            .module('app')
            .config(mainConfig);

        mainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

        function mainConfig($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/location/');

            $stateProvider

                .state('location', {
                    url: '/location/:location',
                    templateUrl: 'templates/location/location.html',
                    controller: 'LocationController',
                    controllerAs: 'vm',
                    resolve: {
                        data: loadData,
                        stations: loadStations
                    },
                    params : {
                        stationInfo : {city: 'Bradford', state: 'open', url: 'bradforddata.txt'}
                    }
                });
        }

        function loadStations(getRemoteData) {
            return getRemoteData.get();
        }

        function loadData($log, $q, $stateParams, stations, getRemoteData) {
            var stationInfo = $stateParams.stationInfo;

            return $q.all({
                title: stationInfo.city,
                state: stationInfo.state,
                content: getRemoteData.get(stationInfo.url)
            });
        }
    }

)();

