'use strict';

angular.module('lodashGithubApp')
/**
 * @ngdoc function
 * @name lodashGithubApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lodashGithubApp
 */
.controller('AboutCtrl', function ($scope, githubGraphQL) {

  var lodashPullRequests;
  githubGraphQL.getLodashPullRequests(false).then(function (prs) {
    lodashPullRequests = prs;
    var commitCountValues = _.map(lodashPullRequests, function (pr) {
      return {
        'x': pr.commitCount,
        'y': pr.durationInHours,
        'size': 3
      };
    });
    $scope.commitCountVsDuration = [{
      'key': 'Commit count vs. Duration (h)',
      'values': commitCountValues
    }];


    var commentCountValues = _.map(lodashPullRequests, function (pr) {
      return {
        'x': pr.commentCount,
        'y': pr.durationInHours,
        'size': 3
      };
    });
    $scope.commentCountVsDuration = [{
      'key': 'Comment count vs. Duration (h)',
      'values': commentCountValues
    }];
  });

});
