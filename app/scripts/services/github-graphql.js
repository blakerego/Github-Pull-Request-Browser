'use strict';

/**
 * @ngdoc function
 * @name lodashGithubApp.graphqlFileLoader
 * @description
 * # Github Graphql Service
 * This service is the interface between our app and the Github v4 graphql API.
 *    app/queries/[graphql-filename]
 */
angular.module('lodashGithubApp').service('githubGraphQL', ['$http', 'graphqlFileLoader', 'GITHUB_ACCESS_TOKEN',
  function ($http, graphqlFileLoader, GITHUB_ACCESS_TOKEN) {

  function tokenizedHeader() {
    return {
      'Authorization': 'bearer ' + GITHUB_ACCESS_TOKEN
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
      return graphqlFileLoader.loadFile('lodash_prs_1.graphql').then(function (query) {
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