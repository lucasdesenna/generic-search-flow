export function RetractableSearchbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/retractableSearchbar/retractableSearchbar.html',
    scope: {
      retracted: '@',
      searchText: '=',
      onSubmit: '='
    },
    controller: RetractableSearchbarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class RetractableSearchbarController {
  constructor ($element, $animate) {
    'ngInject';

    var self = this;

    self.searchField = angular.element('.retractable-searchbar-search-field:first');
    self.searchFieldInput = angular.element('.retractable-searchbar-search-field-input:first');
    
    self.retract = function() {
      $element.addClass('retracted');
      self.retracted = true;
    }

    self.selectInputText = function() {
      var searchFieldInput = self.searchFieldInput;
      searchFieldInput.select();
    }

    self.outputSearchText = function() {
      self.searchText = self.searchText;
    }

    self.shake = function() {
      var searchField = self.searchField;

      $animate.addClass(searchField, 'shake').then(function() {
        $animate.removeClass(searchField, 'shake');
      }); 
    }

    self.submit = function() {
      var searchField = self.searchField;

      if(angular.isString(self.searchText) && self.searchText.length > 0) {
        searchField.blur();
        self.retract();
        self.outputSearchText();
        self.onSubmit(self.searchText);
      } else {
        self.shake();
      }
    }

    self.checkKey = function(event, keyCode) {
      if(parseInt(event.keyCode) === parseInt(keyCode)) {
        return true;
      } else {
        return false;
      }
    }

    self.submitOnKeyup = function(event, keyCode) {
      if(self.checkKey(event, keyCode) && self.searchFieldHasFocus) {
        self.submit();
      }
    }

    self.clear = function () {
      self.searchText = '';
    }

    if(self.retracted === true) {
      $element.addClass('retracted');
    }

    if(angular.isString(self.searchText) && self.searchText.length > 0) {
      self.retract();
      self.searchFieldInput.val(self.searchText);
    }
  }
}