/**
 * Created by sagun on 4/15/15.
 */

angular.module('qmsApp.dnForm', [])

    .directive('dnInput', function() {
      return {
        restrict: 'E',
        replace: false,
        scope: true,
        //scope: {
        //  formName: '@',
        //  field: '='
        //},
        templateUrl: "shared/dn_form/dn-form.html",
        controller: ['$scope', '$element', function($scope, $element) {
          $scope.formName = $element.parent().attr("name");
        }],

        link: function(scope, el, attr) {

        }
      }

    });