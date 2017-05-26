'use strict';

/**
 * @ngdoc function
 * @name lodashGithubApp.graphqlFileLoader
 * @description
 * # Github Graphql Service
 * This service is the interface between our app and the Github v4 graphql API.
 *    app/queries/[graphql-filename]
 */
angular.module('lodashGithubApp').service('githubGraphQL', ['$http', 'graphqlFileLoader',
  function ($http, graphqlFileLoader) {

  function tokenizedHeader() {
    // return 'Authorization: bearer' + process.env.Authorization;
    return {
      'Authorization': 'bearer ' + 'ADD GITHUB TOKEN HERE'
    };
  }

  var svc = {

    schema: null,

    graphqlUrl: 'https://api.github.com/graphql',

    introspectionQuery: function () {
      var request = {
        method: 'GET',
        url: svc.graphqlUrl,
        headers: tokenizedHeader()
      };
      return $http(request).then(function (response) {
        svc.schema = response.data.data.__schema;
        return response.data;
      });
    },

    lodashQuery: function () {
      return graphqlFileLoader.loadFile('lodash.graphql').then(function (query) {
        var request = {
          method: 'POST',
          url: svc.graphqlUrl,
          headers: tokenizedHeader(),
          data: {
            query: query
          }
        };
        return $http(request);
      });
    }
  };

  return svc;

}]);