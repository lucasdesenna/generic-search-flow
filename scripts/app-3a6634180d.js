/******/!function(e){function t(r){if(a[r])return a[r].exports;var i=a[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}// webpackBootstrap
/******/
var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict";var r=a(1),i=a(2),s=a(3),o=a(4),n=a(5),l=a(6),c=a(7);angular.module("generic-search-flow",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ngRoute","ngMaterial","toastr"]).constant("moment",moment).config(r.config).config(i.routerConfig).config(s.themeConfig).run(o.runBlock).controller("MainController",n.MainController).controller("DetailsController",l.DetailsController).directive("retractableSearchbar",c.RetractableSearchbarDirective)},function(e,t){"use strict";function a(e,t){"ngInject";e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=3e3,t.positionClass="toast-top-right",t.preventDuplicates=!0,t.progressBar=!0}a.$inject=["$logProvider","toastrConfig"],Object.defineProperty(t,"__esModule",{value:!0}),t.config=a},function(e,t){"use strict";function a(e){"ngInject";e.when("/",{templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).when("/moreinfo",{templateUrl:"app/details/details.html",controller:"DetailsController",controllerAs:"details"}).otherwise({redirectTo:"/"})}a.$inject=["$routeProvider"],Object.defineProperty(t,"__esModule",{value:!0}),t.routerConfig=a},function(e,t){"use strict";function a(e){"ngInject";e.theme("default").primaryPalette("amber").accentPalette("deep-orange")}a.$inject=["$mdThemingProvider"],Object.defineProperty(t,"__esModule",{value:!0}),t.themeConfig=a},function(e,t){"use strict";function a(e){"ngInject";e.debug("runBlock end")}a.$inject=["$log"],Object.defineProperty(t,"__esModule",{value:!0}),t.runBlock=a},function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});t.MainController=["$scope","$resource","$routeParams","$log",function r(e,t,i,s){"ngInject";a(this,r);var o=e;o.serviceUrl="http://www.omdbapi.com/",o.servicePage,o.callingServer=!1,o.searchbarRetracted=!1,o.searchText=i.s,o.movies=[],o.movieCount,o.page,o.pageSize=6,o.moviesToDisplay,o.capString=function(e){var t=45,a=e.slice(0,t);return e.length>t?a=e.slice(0,t)+"...":e},o.callServer=function(e,a,r){o.callingServer=!0;var i=t(o.serviceUrl);i.get(e,function(e){a&&a(e)},function(e){s.error(e)}).$promise["finally"](function(){r&&r(),o.callingServer=!1})},o.resetMovieList=function(){o.servicePage=1,o.movies=[],o.movieCount=0,o.page=1,o.moviesToDisplay=[]},o.selectMoviesToDisplay=function(e,t){for(var a=o.pageSize,r=(t-1)*a,i=[],s=r;r+a>s;s++){var n=e[s];if(!n)break;i.push(n)}return i},o.getNewMovieList=function(){o.resetMovieList();var e={s:o.searchText},t=function(e){o.movies=e.Search,o.movieCount=e.totalResults,o.moviesToDisplay=o.selectMoviesToDisplay(o.movies,o.page)};o.callServer(e,t)},o.updateMovieList=function(){o.moviesToDisplay=[];var e={s:o.searchText,page:o.servicePage},t=function(e){o.movies=o.movies.concat(e.Search),o.moviesToDisplay=o.selectMoviesToDisplay(o.movies,o.page)};o.callServer(e,t)},o.totalPageCount=function(){return Math.ceil(o.movieCount/o.pageSize)},o.thereAreMoreMovies=function(){return o.page<o.totalPageCount()?!0:!1},o.needsMoreMovies=function(){return o.movies.length<(o.page+1)*o.pageSize?!0:!1},o.requestNextMovies=function(){o.thereAreMoreMovies()&&!o.callingServer&&(o.page++,o.needsMoreMovies()?(o.servicePage++,o.updateMovieList()):o.moviesToDisplay=o.selectMoviesToDisplay(o.movies,o.page))},o.requestPreviousMovies=function(){o.page>1&&!o.callingServer&&(o.page--,o.moviesToDisplay=o.selectMoviesToDisplay(o.movies,o.page))},o.thereAreMovies=function(){return o.movies.length>0?!0:!1},o.hasPoster=function(e){var t=e.Poster;return"N/A"!==t&&angular.isString(t)?!0:!1},angular.isString(o.searchText)&&o.searchText.length>0?(o.searchbarRetracted=!0,o.getMovies(o.searchText)):o.searchbarRetracted=!1}]},function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});t.DetailsController=["$scope","$resource","$log","$routeParams",function r(e,t,i,s){"ngInject";a(this,r);var o=e;o.serviceUrl="http://www.omdbapi.com/",o.searchText=s.s,o.movieId=s.id,o.moviePoster,o.movieDetails,o.getDetails=function(){var e={i:o.movieId},a=t(o.serviceUrl);a.get(e,function(e){delete e.Response,o.moviePoster=e.Poster,delete e.Poster,o.movieDetails=e,o.movieCount=e.totalResults},function(e){i.error(e)}).$promise["finally"](function(){o.loadingMovies=!1})},o.hasPoster=function(){return"N/A"!==o.moviePoster&&angular.isString(o.moviePoster)?!0:!1},o.getDetails()}]},function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(){"ngInject";var e={restrict:"E",templateUrl:"app/components/retractableSearchbar/retractableSearchbar.html",scope:{retracted:"@",searchText:"=",onSubmit:"="},controller:i,controllerAs:"vm",bindToController:!0};return e}Object.defineProperty(t,"__esModule",{value:!0}),t.RetractableSearchbarDirective=r;var i=function s(e,t){"ngInject";a(this,s);var r=this;r.searchField=angular.element(".retractable-searchbar-search-field:first"),r.searchFieldInput=angular.element(".retractable-searchbar-search-field-input:first"),r.retract=function(){e.addClass("retracted"),r.retracted=!0},r.selectInputText=function(){var e=r.searchFieldInput;e.select()},r.outputSearchText=function(){r.searchText=r.searchText},r.shake=function(){var e=r.searchField;t.addClass(e,"shake").then(function(){t.removeClass(e,"shake")})},r.submit=function(){var e=r.searchField;angular.isString(r.searchText)&&r.searchText.length>0?(e.blur(),r.retract(),r.outputSearchText(),r.onSubmit(r.searchText)):r.shake()},r.checkKey=function(e,t){return parseInt(e.keyCode)===parseInt(t)?!0:!1},r.submitOnKeyup=function(e,t){r.checkKey(e,t)&&r.searchFieldHasFocus&&r.submit()},r.clear=function(){r.searchText=""},r.retracted===!0&&e.addClass("retracted"),angular.isString(r.searchText)&&r.searchText.length>0&&(r.retract(),r.searchFieldInput.val(r.searchText))};i.$inject=["$element","$animate"]}]),angular.module("generic-search-flow").run(["$templateCache",function(e){e.put("app/details/details.html",'<div layout-align="start center" class=md-toolbar-tools><md-button href="#/?s={{searchText}}" aria-label=Voltar class=go-back><i class=material-icons>&#xE5CB;</i><span>Voltar</span></md-button><h2>Detalhes</h2></div><md-content><div layout=column layout-align="center center" class=list-header><h2 class=md-headline>{{movieDetails.Title}}</h2><img ng-if=hasPoster() src={{moviePoster}} class=poster></div><md-list flex><md-list-item ng-repeat="(key,val) in movieDetails" class=md-3-line><div layout=column class=md-list-item-text><p>{{key}}</p><h3>{{val}}</h3></div></md-list-item></md-list></md-content>'),e.put("app/main/main.html",'<retractable-searchbar retracted={{searchbarRetracted}} search-text=searchText on-submit=getNewMovieList class=fixed></retractable-searchbar><div ng-if=thereAreMovies() layout=column layout-gt-sm=row ng-cloak class=movie-list><div hide show-gt-sm flex-gt-sm=25 layout=column layout-align="center center" class=movie-list-nav><md-button ng-if="page &gt; 1" ng-click=requestPreviousMovies() class=md-raised><i class=material-icons>&#xE408;</i></md-button></div><div flex-gt-sm=50 layout=column><md-subheader hide show-gt-sm class=md-no-sticky>Página {{page}} de {{totalPageCount()}} - {{movieCount}} resultados encontrados.</md-subheader><md-grid-list md-cols=1 md-cols-gt-sm=3 md-row-height=3:4 md-gutter=8px md-gutter-gt-sm=16px layout-align="center center"><md-grid-tile ng-repeat="movie in moviesToDisplay" class=movie-list-tile><div class=movie-list-tile-tooltip><dl><dt>Título:</dt><dd>{{capString(movie.Title)}}</dd><br><dt>Ano:</dt><dd>{{movie.Year}}</dd><br><dt>Tipo:</dt><dd>{{movie.Type}}</dd><br><dt>imdbID:</dt><dd>{{movie.imdbID}}</dd><br></dl><md-button href="#/moreinfo?id={{movie.imdbID}}&amp;s={{searchText}}" aria-label="Mais Informações" class="md-raised md-primary">+ Info</md-button></div><div ng-if=hasPoster(movie) style="background-image: url(&quot;{{movie.Poster}}&quot;)" class=movie-list-tile-poster></div><div ng-if=!hasPoster(movie) layout=column layout-align="center center" class=movie-list-tile-no-poster><i class=material-icons>&#xE8DA;</i><h4 class=md-subhead>{{capString(movie.Title)}}</h4></div></md-grid-tile></md-grid-list></div><div hide show-gt-sm flex-gt-sm=25 layout=column layout-align="center center" class=movie-list-nav><md-button ng-if=thereAreMoreMovies() ng-click=requestNextMovies() class=md-raised><i class=material-icons>&#xE409;</i></md-button></div><div hide-gt-sm layout=row layout-align="center center" class=floating-nav><div flex=20 layout-align="center center" class=movie-list-nav><md-button ng-disabled="page &lt;= 1" ng-click=requestPreviousMovies() class=md-raised><i class=material-icons>&#xE408;</i></md-button></div><div flex=60 layout-align="center center" class=page-counter><span class=md-body-1>Página {{page}} de {{totalPageCount()}}</span></div><div flex=20 layout-align="center center" class=movie-list-nav><md-button ng-disabled=!thereAreMoreMovies() ng-click=requestNextMovies() class=md-raised><i class=material-icons>&#xE409;</i></md-button></div></div></div><div ng-if="!thereAreMovies() &amp;&amp; !callingServer" layout-fill layout=column layout-align="center center" class=movie-list-no-movies><h3 class=md-headline>Desculpe, mas não encontramos resultados para a sua busca.</h3></div><div ng-if=callingServer layout-fill layout=column layout-align="center center" class=movie-list-no-movies><md-progress-circular md-mode=indeterminate></md-progress-circular></div>'),e.put("app/components/retractableSearchbar/retractableSearchbar.html",'<form name=movieSearchForm layout=row layout-wrap layout-align="center center" ng-class="{retracted: vm.retracted}" ng-submit=$event.preventDefault() autocomplete=off class=retractable-searchbar-search-form><md-whiteframe layout=row flex flex-gt-sm=66 class="retractable-searchbar-search-field md-whiteframe-z1"><input type=search md-input-name=movieSearch ng-model=vm.searchText ng-click=vm.selectInputText(this) ng-focus="vm.searchFieldHasFocus = true" ng-blur="vm.searchFieldHasFocus = false" ng-keyup="vm.submitOnKeyup($event, 13)" placeholder="Procure seu filme" required class=retractable-searchbar-search-field-input><md-button tabindex=-1 ng-if=vm.searchText ng-click=vm.clear() class=retractable-searchbar-search-field-clear><md-icon md-svg-icon=md-close aria-hidden=true><svg version=1.1 x=0px y=0px viewBox="0 0 24 24" xmlns=http://www.w3.org/2000/svg fit="" height=100% width=100% preserveAspectRatio="xMidYMid meet" focusable=false><g><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"></path></g></svg></md-icon><span class=md-visually-hidden>Limpar</span></md-button></md-whiteframe><md-button ng-click=vm.submit() aria-label=Buscar flex-gt-sm=30 flex-order=2 class="retractable-searchbar-submit-button md-raised md-primary">Buscar</md-button></form>')}]);
//# sourceMappingURL=../maps/scripts/app-3a6634180d.js.map
