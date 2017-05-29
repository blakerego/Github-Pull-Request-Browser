'use strict';

/**
 * @ngdoc function
 * @name lodashGithubApp.pullRequestDecorator
 * @description
 * # Pull Request Decorator
 * This service will add application specific fields to the base Pull Request
 * object that is returned from the Github API.
 */
angular.module('lodashGithubApp').service('pullRequestDecorator', [
  function () {

  var svc = {
    decorate: function (rawPullRequest) {
      var parsed = rawPullRequest.node;
      parsed.weekMarker = svc.weekMarkerFromDate(parsed.mergedAt);
      return parsed;
    },

    /// Takes a raw date string, and returns a string corresponding to
    /// the year.week.
    /// For example: 
    ///      Input: '2012-04-23T03:34:50Z'
    ///      Output: '2012.17'
    weekMarkerFromDate: function (date) {
      var momentDate = moment(date);
      return momentDate.year() + '.' + momentDate.week();
    }
  };

  return svc;

}]);