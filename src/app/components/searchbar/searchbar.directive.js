export function SearchbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/searchbar/searchbar.html',
    scope: {
      serviceUrl: '@',
      param: '@',
      retracted: '='
    },
    controller: SearchbarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class SearchbarController {
  constructor ($scope, $resource, $log, $animate) {
    'ngInject';

    var self = this;
    
    self.retract = function() {
      // var container = angular.element('#container');

      self.retracted = true;
    }

    self.getSearchResults = function(searchText) {
      var serviceUrl = self.serviceUrl;
      var param = self.param;
      var query = {};
      query[param] = searchText;
      var searchResults;

      var call = $resource(serviceUrl);
      call.get(query, function(data) {
          searchResults = data.Search
          $log.debug(searchResults)
          self.retract();

          return searchResults;
        }, function (error) {
          $log.error(error);

          return false;
        });
    };

    self.shake = function() {
      var searchField = angular.element('#search-field');

      $animate.addClass(searchField, 'shake').then(function() {
        $animate.removeClass(searchField, 'shake');
      }); 
    }

    self.submit = function() {
      if(angular.isString(self.searchText) && self.searchText.length > 0) {
        self.getSearchResults(self.searchText);
      } else {
        self.shake();
      }
    }

    this.clear = function () {
      self.searchText = '';
    }
  }
}