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
      var r2 = pullRequestDecorator.decorate(pullRequestData1).weekMarker;
      expect(r2.weekMarker).toBe('2012.17');
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

});


angular.module('mockAppData', []).constant('pullRequestData1', {
  'node': {
    'mergedAt': '2012-04-23T03:34:50Z',
    'title': 'Replace the `Makefile` with a JavaScript-based build system.',
    'url': 'https:\/\/github.com\/lodash\/lodash\/pull\/1',
    'baseRefName': 'master',
    'headRefName': 'master',
    'author': {
      'avatarUrl': 'https:\/\/avatars3.githubusercontent.com\/u\/243830?v=3',
      'login': 'kitcambridge',
      'url': 'https:\/\/github.com\/kitcambridge'
    }
  }
});
