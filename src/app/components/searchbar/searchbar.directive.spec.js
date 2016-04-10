/**
 * @todo Complete the test
 * This example is not perfect.
 * Test should check if MomentJS have been called
 */
describe('directive searchbar', function() {
  let vm;
  let serviceUrl;
  let param;
  let retracted;
  let element;

  beforeEach(angular.mock.module('generic-search-flow'));

  beforeEach(inject(($compile, $rootScope) => {
    serviceUrl = vm.serviceUrl;
    param = vm.param;
    retracted = vm.retracted;
    element = angular.element(`
      <acme-searchbar" service-url="${serviceUrl}" param="${param}" retracted="${retracted || true}"></searchbar>
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

    expect(vm.serviceUrl).toEqual(jasmine.any(String));

    expect(vm.param).toEqual(jasmine.any(String));

    expect(vm.retracted).toEqual(jasmine.any(Boolean));
  });
});
