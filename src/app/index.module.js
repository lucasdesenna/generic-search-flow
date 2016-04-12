/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { themeConfig } from './index.theme';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { DetailsController } from './details/details.controller';
import { RetractableSearchbarDirective } from '../app/components/retractableSearchbar/retractableSearchbar.directive';

angular.module('generic-search-flow', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ngRoute', 'ngMaterial', 'toastr', 'infinite-scroll'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .config(themeConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('DetailsController', DetailsController)
  .directive('retractableSearchbar', RetractableSearchbarDirective)
