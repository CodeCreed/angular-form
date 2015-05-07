/**
 * Created by sagun on 4/15/15.
 */

angular.module('dnForm', [])

    .directive('dnInput', function() {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1) + "dn-input.html",
        replace: true,
        controller: ['$scope', '$element', function($scope, $element) {

        }]
      }

    })

    .directive('dnForm', function() {
      return {
        restrict: 'E',
        templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1) + "dn-form.html",
        replace: true,
        controller: ['$scope', '$element', function($scope, $element) {

        }],
        link: function(scope, element, attrs) {
          if (attrs.form) {
            scope.form = scope.$eval(attrs.form);
            scope.modelName = scope.$eval(attrs.dnModel);
            scope.submitMethod = scope.$eval(attrs.dnSubmit);
          }
        }
      }
    });
