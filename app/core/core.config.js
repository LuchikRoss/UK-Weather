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
                        data: getData,
                        stations: getStations
                    },
                    params : {
                        stationInfo : {city: 'Bradford', state: 'open', url: 'bradforddata.txt'}
                    }
                });
        }

        function getStations(getRemoteData) {
            return getRemoteData.get();
        }

        function getData($log, $q, $stateParams, stations, getRemoteData) {
            var stationInfo = $stateParams.stationInfo;
            $log.debug(stationInfo);
            return $q.all({
                title: stationInfo.city,
                state: stationInfo.state,
                content: getRemoteData.get(stationInfo.url)
            });
        }
    }

)();

