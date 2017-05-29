'use strict';

/**
 * @ngdoc function
 * @name lodashGithubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lodashGithubApp
 */
angular.module('lodashGithubApp')
  .controller('MainCtrl', ['githubGraphQL',
    function (githubGraphQL) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var dt = moment('12/30/2017', 'MM/DD/YYYY').week();
    console.log(dt);
    githubGraphQL.getLodashPullRequests().then(function (pullRequests) {
      console.log(pullRequests);
    });

  }]);
