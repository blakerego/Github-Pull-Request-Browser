'use strict';
angular.module('lodashGithubApp').service('githubGraphQL', ['$http', function ($http) {

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
      var request = {
        method: 'POST',
        url: svc.graphqlUrl,
        headers: tokenizedHeader(),
        data: {
          query: "query {\
  organization(login: \"lodash\") {\
    name,\
    repositories(first: 10) {\
      edges {\
        node {\
          pullRequests(first: 10) {\
            edges {\
              node {\
                state:merged\
                author {\
                  avatarUrl\
                  login\
                  resourcePath\
                  url\
                }\
              }\
            }\
          }\
        }\
      }\
    }\
  }\
}"
        }
      };

      return $http(request);
    }
  };

  return svc;

}]);