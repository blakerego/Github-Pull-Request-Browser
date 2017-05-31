'use strict';

/**
 * @ngdoc function
 * @name lodashGithubApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lodashGithubApp
 */
angular.module('lodashGithubApp')
  .controller('AboutCtrl', function ($scope, githubGraphQL) {


    var lodashPullRequests;
    githubGraphQL.getLodashPullRequests(false).then(function (prs) {
      lodashPullRequests = prs;
      var values = _.map(lodashPullRequests, function (pr) {
        return {
          'x': pr.commitCount,
          'y': pr.durationInHours,
          'size': 3
        };
      });
      $scope.exampleData = [{
        'key': 'Commit count vs. Duration (h)',
        'values': values
      }];
      console.log(values);
    });

  });
