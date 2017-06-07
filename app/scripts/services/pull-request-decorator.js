'use strict';

/**
 * @ngdoc function
 * @name lodashGithubApp.pullRequestDecorator
 * @description
 * # Pull Request Decorator
 * This service will add application specific fields to the base Pull Request
 * object that is returned from the Github API.
 */
angular.module('lodashGithubApp').service('pullRequestDecorator', [
  function () {

  var svc = {
    decorate: function (rawPullRequest) {
      var parsed = rawPullRequest.node;
      parsed.weekMarker = svc.weekMarkerFromDate(parsed.mergedAt);
      parsed.authorLogin = parsed.author.login;
      parsed.repoName = parsed.repository.name;
      parsed.durationInHours = svc.reviewDurationInHours(parsed);
      parsed.commitCount = parsed.commits.totalCount;
      parsed.commentCount = parsed.comments.totalCount;
      return parsed;
    },

    /// Takes a raw date string, and returns a string corresponding to
    /// the year.week.
    /// For example: 
    ///      Input: '2012-04-23T03:34:50Z'
    ///      Output: '2012.17'
    weekMarkerFromDate: function (date) {
      var momentDate = moment(date);
      var week = momentDate.week();
      if (String(momentDate.week()).length === 1) {
        week = '0' + momentDate.week();
      }
      return momentDate.year() + '.' + week;
    },

    /// Output will be a number representing the number of hours
    /// between when the pull request was created, and when it was
    /// merged.
    reviewDurationInHours: function (node) {
      var mergedDate = moment(node.mergedAt);
      var createdDate = moment(node.createdAt);
      return mergedDate.diff(createdDate, 'hours', true);
    }
  };

  return svc;

}]);