/**
 * Created by sagun on 4/15/15.
 */

var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length-1].src;
currentScriptPath = currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1);

angular.module('angularForm', ['ngMaterial'])

    .directive('dnInput', ['$compile', '$filter', function($compile, $filter) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: currentScriptPath + "angular-input.html",
        replace: false,
        controller: ['$scope', '$http', function($scope, $http) {
          if($scope.field.type == "select") {
            if($scope.field.optionsUrl) {
              $http.get($scope.field.optionsUrl)
                  .success(function (data) {
                    $scope.field.options = data;
                  }
              )
            }
            $scope.filtered = function (list) {
              if ($scope.field.optionsFilter) {
                return $filter($scope.field.optionsFilter)(list);
              } else {
                return list;
              }
            }
          }

          $scope.makeForSIL = function (formFields) {
            return {
              "name": "child",
              "fields": formFields
            }
          };

          $scope.addSI = function(model) {
            model.push({});
          };

          $scope.removeSI = function(model, index) {
            model.splice(index, 1);
            $scope[$scope.form.name].$setDirty(true);
          };

          $scope.moveUpSI = function(model, index) {
            if(index != 0) {
              var preIndex = index - 1;
              var temp = model[preIndex];
              model[preIndex] = model[index];
              model[index] = temp;
            }
          };

          $scope.moveDownSI = function(model, index) {
            if(index < (model.length-1)) {
              var nextIndex = index + 1;
              var temp = model[nextIndex];
              model[nextIndex] = model[index];
              model[index] = temp;
            }
          }
        }]
      }
    }])

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
          $scope.isArray = function (object) {
            return object.constructor == Array;
          };

          $scope.isObject = function (object) {
            return object.constructor == Object;
          };

          $scope.form.isValid = function () {
            var form = $scope[$scope.form.name];
            return !form.$pristine && !form.$invalid;
          };

          $scope.form.get = function () {
            return $scope[$scope.form.name];
          }
        }]
      }
    })

    .directive('validateDate', function() {
      // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
      function isValidDate(dateString)
      {
        // First check for the pattern
        if(!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString))
          return false;

        // Parse the date parts to integers
        var parts = dateString.split("-");
        var day = parseInt(parts[2], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[0], 10);

        // Check the ranges of month and year
        if(year < 1000 || year > 3000 || month == 0 || month > 12)
          return false;

        var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        // Adjust for leap years
        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
          monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
      }

      return {
        restrict: 'A',
        require: 'ngModel', // Element must have ng-model attribute.
        link: function(scope, element, attributes, controller) {
          controller.$parsers.unshift(function (value) {
            if(value) {
              var valid = isValidDate(value);
              controller.$setValidity('invalidDate', valid);
            }

            // If it's valid, return the value to the model,
            // otherwise return undefined.
            return valid ? value : undefined;
          });
        }
      }
    })

    .directive('comparator', function() {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attributes, controller) {
          var data = scope.$eval(attributes.comparator);
          var thisModelName = attributes.name;
          var form = scope[scope.form.name];
          
          scope.$watch('modelName[\''+ data.field +'\']', function (n,v) {
            if ( !n || n.length == 0 || !scope.modelName[thisModelName]) return;
            console.log(form);
            var model = form[thisModelName];
            //model.$invalidate();
            //model.$setViewValue(model.$viewValue);
            model.$setViewValue("YOMANJUSTWORK");
            //scope.modelName[thisModelName] = "YO MAN, LETS DO THIS";
            console.log(model.$viewValue);
            //model.$setDirty();
          });
          
          controller.$parsers.unshift(function (value) {
            var field = scope.modelName[data.field];
            var comparision = field == value;
            
            if(value) {
              var valid = comparision;
              controller.$setValidity('comparisonError', valid);
            }

            // If it's valid, return the value to the model,
            // otherwise return undefined.
            return value;
          });
        }
      }
    })

    .directive('dynamicDirectives', ['$compile',
      function($compile) {

        var addDirectiveToElement = function(scope, element, dir) {
          var propName = dir.validator;
          if (dir.data) {
            element.attr(propName, JSON.stringify(dir.data));
          } else {
            element.attr(propName, "");
          }
        };

        var linker = function(scope, element, attrs) {
          var directives = scope.$eval(attrs.dynamicDirectives);

          if (!directives || !angular.isArray(directives)) {
            element.removeAttr(attrs.$attr.dynamicDirectives);
            $compile(element)(scope);
            return true;
          }

          // Add all directives in the array
          angular.forEach(directives, function(dir){
            addDirectiveToElement(scope, element, dir);
          });


          // Remove attribute used to add this directive
          element.removeAttr(attrs.$attr.dynamicDirectives);
          // Compile element to run other directives
          $compile(element)(scope);
        };

        return {
          priority: 1001, // Run before other directives e.g.  ng-repeat
          terminal: true, // Stop other directives running
          link: linker
        };
      }
    ]);
