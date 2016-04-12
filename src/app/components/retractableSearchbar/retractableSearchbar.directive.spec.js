/**
 * @todo Complete the test
 * This example is not perfect.
 * Test should check if MomentJS have been called
 */
describe('directive retractableSearchbar', function() {
  let vm;
  let retracted;
  let searchText;
  let onSubmit;
  let element;

  beforeEach(angular.mock.module('generic-search-flow'));

  beforeEach(inject(($compile, $rootScope) => {
    retracted = vm.retracted;
    searchText = vm.searchText;
    onSubmit = vm.onSubmit;
    element = angular.element(`
      <retractable-searchbar" retracted="${retracted || true}" search-text="${searchText}" on-submit="${onSubmit}"></retractable-searchbar>
    `);

    $compile(element)($rootScope.$new());
    $rootScope.$digest();
    vm = element.isolateScope().vm;
  }));

  it('should be compiled', () => {
    expect(element.html()).not.toEqual(null);
  });

  it('should have isolate scope object with instanciate members', () => {
    expect(vm).toEqual(jasmine.any(Object));

    expect(vm.retracted).toEqual(jasmine.any(Boolean));

    expect(vm.searchText).toEqual(jasmine.any(Object));
    
    expect(vm.onSubmit).toEqual(jasmine.any(Function));
  });
});
