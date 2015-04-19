/**
 * Created by sagun on 4/15/15.
 */

angular.module('qmsApp.dnForm', [])

    .directive('dnInput', function() {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: "shared/dn_form/dn-input.html",
        replace: true,
        controller: ['$scope', '$element', function($scope, $element) {

        }]
      }

    })

    .directive('dnForm', function() {
      return {
        restrict: 'E',
        templateUrl: "shared/dn_form/dn-form.html",
        replace: true,
        controller: ['$scope', '$element', function($scope, $element) {

        }],
        link: function(scope, element, attrs) {
          if (attrs.form) {
            scope.form = scope.$eval(attrs.form);
          }
        }
      }
    });