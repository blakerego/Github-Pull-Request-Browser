'use strict';

describe('pullRequestDecorator Tests ----', function () {

  beforeEach(module('lodashGithubApp'));
  beforeEach(module('mockAppData'));


  describe('decorate --', function () {
    it('Should return the meat of the object (node)', inject(function (pullRequestDecorator, pullRequestData1) {
      var result = pullRequestDecorator.decorate(pullRequestData1);
      expect(result.title).toBe('Replace the `Makefile` with a JavaScript-based build system.');
    }));

    it('Should append the a week marker to the PR object', inject(function(pullRequestDecorator, pullRequestData1) {
      var r2 = pullRequestDecorator.decorate(pullRequestData1);
      expect(r2.weekMarker).toBe('2012.17');
    }));

    it('Should append author name to the PR object', inject(function(pullRequestDecorator, pullRequestData1) {
      var r3 = pullRequestDecorator.decorate(pullRequestData1);
      expect(r3.authorLogin).toBe('kitcambridge');
    }));

    it('Should append repository name to the PR object', inject(function(pullRequestDecorator, pullRequestData1) {
      var r3 = pullRequestDecorator.decorate(pullRequestData1);
      expect(r3.repoName).toBe('lodash');
    }));

    it('Should append commit count to the PR object', inject(function (pullRequestDecorator, pullRequestData1) {
      var r4 = pullRequestDecorator.decorate(pullRequestData1);
      expect(r4.commitCount).toBe(3);
    }));
  });

  describe('getWeekMarker --', function () {
    it('should return the year, followed by the week number', inject(function(pullRequestDecorator) {
      expect(pullRequestDecorator.weekMarkerFromDate('2012-04-23T03:34:50Z')).toBe('2012.17');
    }));

    it('should return december dates in previous year as before january dates in later year', inject(function (pullRequestDecorator) {
      var marker1 = pullRequestDecorator.weekMarkerFromDate('2015-12-23T03:34:50Z');
      var marker2 = pullRequestDecorator.weekMarkerFromDate('2016-01-02T03:34:50Z');
      expect( marker1 < marker2).toBe(true);
    }));
  });

  describe('reviewDurationInHours', function () {
    it('should return the difference between the merged and created timestamps, in hours', inject(function (pullRequestDecorator, pullRequestData1) {
      var duration = pullRequestDecorator.reviewDurationInHours(pullRequestData1.node);
      expect(duration < 1 && duration > 0).toBe(true);
    }));

    it('should append the duration to the object',  inject(function (pullRequestDecorator, pullRequestData1) {
      var r4 = pullRequestDecorator.decorate(pullRequestData1);
      console.log(r4.durationInHours);
      expect(r4.durationInHours).not.toBe(undefined);
    }));
  });
});


angular.module('mockAppData', [])
.constant('pullRequestData1', {
  'node': {
    'mergedAt': '2012-04-23T03:34:50Z',
    'createdAt': '2012-04-23T02:49:19Z',
    'title': 'Replace the `Makefile` with a JavaScript-based build system.',
    'url': 'https:\/\/github.com\/lodash\/lodash\/pull\/1',
    'baseRefName': 'master',
    'headRefName': 'master',
    'author': {
      'avatarUrl': 'https:\/\/avatars3.githubusercontent.com\/u\/243830?v=3',
      'login': 'kitcambridge',
      'url': 'https:\/\/github.com\/kitcambridge'
    },
    'commits': {
      'totalCount': 3
    },
    'repository': {
      'name': 'lodash'
    },
  }
})
;

