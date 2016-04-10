export function themeConfig ($mdThemingProvider) {
  'ngInject';

  $mdThemingProvider.theme('default')
    .primaryPalette('amber')
    .accentPalette('deep-orange');
}
