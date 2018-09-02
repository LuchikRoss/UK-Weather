;(function () {
    'use strict';
    angular
        .module('factory.url', [])
        .factory('url', url);

    url.$inject = [];

    function url() {
        var FilePath = {};
        FilePath.getLink = getLink;

        function getLink(cityName) {
            var baseUrl = 'https://www.metoffice.gov.uk/pub/data/weather/uk/climate/';
            return baseUrl + (cityName ? 'stationdata/' + cityName : 'historic/historic.json');
        }

        return FilePath;
    }

})();