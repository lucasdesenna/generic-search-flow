export function routerConfig ($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .when('/moreinfo', {
      templateUrl: 'app/details/details.html',
      controller: 'DetailsController',
      controllerAs: 'details'
    })
    .otherwise({
      redirectTo: '/'
    });
}
