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

    githubGraphQL.lodashQuery().then(function (response) {
      console.log(response.data);
    });

    // graphqlFileLoader.loadFile('lodash.graphql').then(function (response) {
    //   console.log(response.data);
    // });

  }]);
