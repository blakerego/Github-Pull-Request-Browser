'use strict';

/**
 * @ngdoc function
 * @name lodashGithubApp.githubGraphQL
 * @description
 * # Github Graphql Service
 * This service is the interface between our app and the Github v4 graphql API.
 *    app/queries/[graphql-filename]
 */
angular.module('lodashGithubApp').service('githubGraphQL', ['$http', 'graphqlFileLoader', 'GITHUB_ACCESS_TOKEN', 'pullRequestDecorator', '$q',
  function ($http, graphqlFileLoader, GITHUB_ACCESS_TOKEN, pullRequestDecorator, $q) {

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

    lodashPullRequests: [],

  /**
   * @ngdoc function
   * @name lodashGithubApp.githubGraphQL.downloadLodashPullRequests
   * @description
   * This function makes a POST request to the Github graphql library, and returns
   * a promise containing a flat array of decorated pull request objects.
   */
    downloadLodashPullRequests: function () {
      return graphqlFileLoader.loadFile('lodash_prs_1.graphql').then(function (query) {
        var request = {
          method: 'POST',
          url: svc.graphqlUrl,
          headers: tokenizedHeader(),
          data: {
            query: query
          }
        };
        return $http(request).then(function (response) {
          var pullRequests = [];
          _.each(response.data.data.organization.repositories.edges, function(repo) {
            _.each(repo.node.pullRequests.edges, function (rawPullRequest) {
              pullRequests.push(pullRequestDecorator.decorate(rawPullRequest));
            });
          });
          svc.lodashPullRequests = pullRequests;
          return pullRequests;
        });
      });
    },

    getLodashPullRequests: function (forceRefresh) {
      if (forceRefresh || _.isEmpty(svc.lodashPullRequests)) {
        return svc.downloadLodashPullRequests();
      } else {
        var deferred = $q.defer();
        deferred.resolve(svc.lodashPullRequests);
        return deferred.promise;
      }
    }
  };

  return svc;

}]);