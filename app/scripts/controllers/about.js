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

    var weeks = _.groupBy(lodashPullRequests, 'weekMarker');
    var durationVsWeek = [];
    _.each(weeks, function(prs, key) {
      var arr = key.split('.');
      var year = arr[0];
      var week = arr[1];
      var normalizedWeek = Math.floor((week / 51)*100);
      var newKey = year + '.' + normalizedWeek;
      durationVsWeek.push({
        'x': newKey,
        'y': _.meanBy(prs, 'durationInHours'),
        'size': 3
      });
    });

    $scope.durationVsWeek = [{
      'key': 'Average Duration vs. Week',
      'values': durationVsWeek
    }];



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
