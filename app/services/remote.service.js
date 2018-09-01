;(function () {

    'use strict';

    angular.module('service.getRemoteData', [])
        .service('getRemoteData', getRemoteData);


    getRemoteData.$inject = ['$http', 'url'];

    function getRemoteData($http, url) {


        return {
            get: get
        };

        /**
         * Function for getting cities list with basic info
         * @returns {*}
         */
        function get(cityName) {
            return $http.get(url.getLink(cityName))
                .then(function (res) {
                    return res.data;
                });
        }
    }
})();