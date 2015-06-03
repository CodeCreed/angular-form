/**
 * Created by sagun on 4/15/15.
 */

var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length-1].src;
currentScriptPath = currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1);

angular.module('angularForm', [])

    .directive('dnInput', function() {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: currentScriptPath + "angular-input.html",
        replace: true,
        controller: ['$scope', '$element', function($scope, $element) {
          $scope.messagesPath = currentScriptPath + "error-messages.html"
        }]
      }

    })

    .directive('dnForm', function() {
        return {
            restrict: 'E',
            templateUrl: currentScriptPath + "angular-form.html",
            replace: true,
            scope: {
                form: "=",
                modelName: "=dnModel",
                submitMethod: "=dnSubmit"
            },

            controller: ['$scope', '$element', function($scope, $element) {

            }]
        }
    });
