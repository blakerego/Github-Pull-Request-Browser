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
          svc.lodashPullRequests = [];
          _.each(response.data.data.organization.repositories.edges, function(repo) {
            _.each(repo.node.pullRequests.edges, function (rawPullRequest) {
              svc.lodashPullRequests.push(pullRequestDecorator.decorate(rawPullRequest));
            });

            svc.checkForAdditionalPrs(repo, repo.node.pullRequests.edges);
          });
          
          return svc.lodashPullRequests;
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
    },

    checkForAdditionalPrs: function (repo, pullRequestEdges) {
      var repoName = pullRequestEdges[0].node.repository.name;
      var resultsSoFar = _.filter(svc.lodashPullRequests, function (pr) { return pr.repoName === repoName; });
      var totalResultCount;
      var node; 
      if (repo.node) {
        node = repo.node;
      } else {
        node = repo;
      }
      totalResultCount = node.pullRequests.totalCount;
       
      if (resultsSoFar.length < node.pullRequests.totalCount) {
        var edgesCount = pullRequestEdges.length;
        var cursor = pullRequestEdges[edgesCount - 1].cursor;
        svc.getMorePullRequestsForRepository(repoName, totalResultCount - resultsSoFar.length, cursor);
      }
    },

    getMorePullRequestsForRepository: function (repoName, nAdditional, lastCursor) {
      var nCapped = nAdditional;
      if (nAdditional > 100) {
        nCapped = 100;
      }
      return graphqlFileLoader.loadFile('pull_requests_for_repo.graphql').then(function (rawTextQuery) {
        var query = rawTextQuery.replace('<NAME_TOKEN>', repoName).replace('"<N_MORE_TOKEN>"', nCapped).replace('<PULL_REQUEST_CURSOR_TOKEN>', lastCursor);
        var request = {
          method: 'POST',
          url: svc.graphqlUrl,
          headers: tokenizedHeader(),
          data: {
            query: query
          }
        };
        return $http(request).then(function (response) {
          _.each(response.data.data.organization.repository.pullRequests.edges, function (rawPullRequest) {
            svc.lodashPullRequests.push(pullRequestDecorator.decorate(rawPullRequest));
          });
          svc.checkForAdditionalPrs(response.data.data.organization.repository, response.data.data.organization.repository.pullRequests.edges);
          return svc.lodashPullRequests;
        });
      });
    }
  };

  return svc;

}]);