describe('controllers', () => {
  let vm;

  beforeEach(angular.mock.module('generic-search-flow'));

  beforeEach(inject(($controller) => {
    vm = $controller('DetailsController');
  }));
});
