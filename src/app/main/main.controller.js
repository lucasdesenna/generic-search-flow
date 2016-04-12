export class MainController {
  constructor ($scope, $resource, $routeParams, $log) {
    'ngInject';

    var self = $scope;

    angular.element('div[ng-view]').addClass('scroll-locked');
    self.serviceUrl = 'http://www.omdbapi.com/';
    self.servicePage;
    self.callingServer = false;
    self.searchbarRetracted = false;
    self.searchText = $routeParams.s;
    self.movies = [];
    self.movieCount;
    self.page;
    self.pageSize = 6;
    self.moviesToDisplay;

    self.capString = function (string) {
      var capAt = 45;
      var cappedString = string.slice(0, capAt);

      if(string.length > capAt) {
        cappedString = string.slice(0, capAt) + '...';
      } else {
        return string;
      }

      return cappedString;
    }

    self.callServer = function(query, onSuccess, duringFinally) {
      self.callingServer = true;

      var call = $resource(self.serviceUrl);
      call.get(query, function(data) {
        if(onSuccess) {
          onSuccess(data);
        }
      }, function(error) {
        $log.error(error);
      }).$promise.finally(function() {
        if(duringFinally) {
          duringFinally();
        }
        self.callingServer = false;
      });
    }

    self.resetMovieList = function() {
      self.servicePage = 1;
      self.movies = [];
      self.movieCount = 0;
      self.page = 1;
      self.moviesToDisplay = [];
    }

    self.selectMoviesToDisplay = function(movies, currentPage) {
      var pageSize = self.pageSize;
      var baseIndex = (currentPage - 1) * pageSize;
      var moviesToDisplay = [];

      for(var i = baseIndex; i < baseIndex + pageSize; i++) {
        var movie = movies[i];

        if(movie) {
          moviesToDisplay.push(movie);
        } else {
          break;
        }
      }

      return moviesToDisplay;
    }

    self.getNewMovieList = function() {
      self.resetMovieList();

      var query = {
        s: self.searchText
      };

      var onSuccess = function(data) {
        self.movies = data.Search;
        self.movieCount = data.totalResults;
        self.moviesToDisplay = self.selectMoviesToDisplay(self.movies, self.page);
      };

      self.callServer(query, onSuccess);
    };

    self.updateMovieList = function() {
      self.moviesToDisplay = [];

      var query = {
        s: self.searchText,
        page: self.servicePage
      };

      var onSuccess = function(data) {
        self.movies = self.movies.concat(data.Search);
        self.moviesToDisplay = self.selectMoviesToDisplay(self.movies, self.page);
      };

      self.callServer(query, onSuccess);
    };

    self.totalPageCount = function() {
      return Math.ceil(self.movieCount / self.pageSize);
    }

    self.thereAreMoreMovies = function() {
      if(self.page < self.totalPageCount()) {
        return true;
      } else {
        return false;
      }
    };

    self.needsMoreMovies = function() {
      if(self.movies.length < (self.page + 1) * self.pageSize) {
        return true;
      } else {
        return false;
      }
    };

    self.requestNextMovies = function() {
      if(self.thereAreMoreMovies() && !self.callingServer) {
        self.page++;

        if(self.needsMoreMovies()) {
          self.servicePage++;
          self.updateMovieList();
        } else {
          self.moviesToDisplay = self.selectMoviesToDisplay(self.movies, self.page);
        }
      }
    };

    self.requestPreviousMovies = function() {
      if(self.page > 1 && !self.callingServer) {
        self.page--;
        self.moviesToDisplay = self.selectMoviesToDisplay(self.movies, self.page);
      }
    };

    self.thereAreMovies = function() {
      if(self.movies.length > 0) {
        return true;
      } else {
        return false;
      }
    };

    self.hasPoster = function(movie) {
      var posterSource = movie.Poster;

      if(posterSource === 'N/A' || !angular.isString(posterSource)) {
        return false;
      } else {
        return true;
      }
    };

    if(angular.isString(self.searchText) && self.searchText.length > 0) {
      self.searchbarRetracted = true;
      self.getNewMovieList();
    } else {
      self.searchbarRetracted = false;
    }
  }
}