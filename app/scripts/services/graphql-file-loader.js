'use strict';

/**
 * @ngdoc function
 * @name lodashGithubApp.graphqlFileLoader
 * @description
 * # Graph File Loader
 * This is a conveneience service to load the contents of the graphql queries
 * from file into memory.  This service assumes all files are at the following path:
 *    app/queries/[graphql-filename]
 */
angular.module('lodashGithubApp').service('graphqlFileLoader', ['$http', function ($http) {

  var svc = {
    loadFile: function (filename) {
      return $http.get('../queries/' + filename).then(function (response) {
        return response.data; /// graphql contents
      });
    }
  };

  return svc;

}]);