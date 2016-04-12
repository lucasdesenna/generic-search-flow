export class DetailsController {
  constructor ($scope, $resource, $log, $routeParams) {
    'ngInject';

    var self = $scope;

    self.serviceUrl = 'http://www.omdbapi.com/';
    self.searchText = $routeParams.s;
    self.movieId = $routeParams.id;
    self.moviePoster;
    self.movieDetails;

    self.getDetails = function() {
      var query = {
        i: self.movieId
      };

      var call = $resource(self.serviceUrl);
      call.get(query, function(data) {
        delete data.Response;
        self.moviePoster = data.Poster;
        delete data.Poster;
        self.movieDetails = data;
        self.movieCount = data.totalResults;
      }, function(error) {
        $log.error(error);
      }).$promise.finally(function() {
        self.loadingMovies = false;
      });
    };

    self.hasPoster = function() {
      if(self.moviePoster === 'N/A' || !angular.isString(self.moviePoster)) {
        return false;
      } else {
        return true;
      }
    }

    self.getDetails();
  }
}
