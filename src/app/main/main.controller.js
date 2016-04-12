export class MainController {
  constructor ($scope, $resource, $routeParams, $log) {
    'ngInject';

    var self = $scope;
   
    self.serviceUrl = 'http://www.omdbapi.com/';
    self.servicePage;
    self.loadingMovies = false;
    self.searchbarRetracted = false;
    self.searchText = $routeParams.s;
    self.movies = [];
    self.movieCount;
    self.page;
    self.pageSize = 6;
    self.moviesToDisplay;

    self.displayMovies = function() {
      var baseIndex = (self.page - 1) * self.pageSize;
      var moviesToDisplay = [];

      for(var i = baseIndex; i < baseIndex + self.pageSize; i++) {
        moviesToDisplay.push(self.movies[i]);
      }

      self.moviesToDisplay = moviesToDisplay;
    }

    self.getMovies = function() {
      self.loadingMovies = true;

      var query = {};
      query.s = self.searchText;

      if(self.servicePage) {
        query.page = self.servicePage;
      }

      var call = $resource(self.serviceUrl);
      call.get(query, function(data) {
        if(self.servicePage > 0) {
          self.movies = self.movies.concat(data.Search);
        } else {
          self.servicePage = 1;
          self.page = 1;
          self.movies = data.Search;
          self.movieCount = data.totalResults;
        }
      }, function(error) {
        $log.error(error);
      }).$promise.finally(function() {
        self.loadingMovies = false;
        self.displayMovies();
      });
    };

    self.thereAreMoreMovies = function() {
      if(self.servicePage * 20 < self.movieCount) {
        return true;
      } else {
        return false;
      }
    }

    self.needsMoreMovies = function() {
      if(self.movies.length < (self.page + 1) * self.pageSize) {
        return true;
      } else {
        return false;
      }
    }

    self.getNextMovies = function() {
      // self.moviesToDisplay = [];
      if(self.thereAreMoreMovies() && !self.loadingMovies) {
        self.page++
        if(self.needsMoreMovies()) {
          self.servicePage++;
          self.getMovies(self.searchText, self.servicePage + 1);
        } else {
          self.displayMovies();
        }
      }
    }

    self.getPreviousMovies = function() {
      if(self.page > 1 && !self.loadingMovies) {
        self.page--
        self.displayMovies();
      }
    }

    self.thereAreMovies = function() {
      if(self.movies.length > 0) {
        return true;
      } else {
        return false;
      }
    }

    self.hasPoster = function(movie) {
      var posterSource = movie.Poster;

      if(posterSource === 'N/A' || !angular.isString(posterSource)) {
        return false;
      } else {
        return true;
      }
    }

    self.totalPageCount = function() {
      return Math.ceil(self.movieCount / self.pageSize);
    }

    if(angular.isString(self.searchText) && self.searchText.length > 0) {
      self.searchbarRetracted = true;
      self.getMovies(self.searchText);
    } else {
      self.searchbarRetracted = false;
    }
  }
}