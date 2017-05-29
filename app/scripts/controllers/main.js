'use strict';

angular.module('lodashGithubApp')
/**
 * @ngdoc function
 * @name lodashGithubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lodashGithubApp
 */
.controller('MainCtrl', ['githubGraphQL', '$scope', function (githubGraphQL, $scope) {

  githubGraphQL.getLodashPullRequests().then(function (pullRequests) {
    
    $scope.pullRequestGrid = {
      data: pullRequests,
      columnDefs: [
      {
        field: 'repoName',
        displayName: 'Repository',
        width: 200
      },
      {
        field: 'weekMarker',
        displayName: 'Year.Week Merged'
      },
      {
        field: 'title',
        displayName: 'Title'
      },
      {
        field: 'headRefName',
        displayName: 'From'
      },
      {
        field: 'baseRefName',
        displayName: 'To'
      },
      {
        field: 'authorLogin',
        displayName: 'Author'
      },
      {
        field: 'mergedAt',
        displayName: 'Merged At'
      }
      ]
    };
  });

}]);
