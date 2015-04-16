/**
 * Created by sagun on 4/15/15.
 */

angular.module('qmsApp.dnForm', [])

    .directive('dnInput', function() {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: "shared/dn_form/dn-input.html",
        replace: false,
        controller: ['$scope', '$element', function($scope, $element) {
          $scope.formName = $element.parent().attr("name");
        }],

        link: function(scope, element, attributes) {
          if(attributes.field) {
            // Only override scope.field if field attribute is set
            // Otherwise it would be destructive to override field possibly set by ngRepeat implicitly
            scope.field = scope.$eval(attributes.field);
          }
        }
      }

    });