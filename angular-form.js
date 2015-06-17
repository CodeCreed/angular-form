/**
 * Created by sagun on 4/15/15.
 */

var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length-1].src;
currentScriptPath = currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1);

function loadStyle() {
    var fileRef = document.createElement("link");
    fileRef.setAttribute("rel", "stylesheet");
    fileRef.setAttribute("type", "text/css");
    fileRef.setAttribute("href", currentScriptPath + "styles.css");

    if (typeof fileRef != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileRef)
}

angular.module('angularForm', ['ngMaterial'])

    .directive('dnInput', function($compile) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: currentScriptPath + "angular-input.html",
            replace: false,
            controller: ['$scope', '$http', function($scope, $http) {
                loadStyle();

                if($scope.field.type == "select") {
                    if($scope.field.optionsUrl) {
                        $http.get($scope.field.optionsUrl)
                            .success(function (data) {
                                $scope.field.options = data;
                            }
                        )
                    }
                }
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

    .directive('dynamicDirectives', ['$compile',
        function($compile) {

            var addDirectiveToElement = function(scope, element, dir) {
                var propName;
                if (dir.if) {
                    propName = Object.keys(dir)[1];
                    var addDirective = scope.$eval(dir.if);
                    if (addDirective) {
                        element.attr(propName, dir[propName]);
                    }
                } else { // No condition, just add directive
                    propName = Object.keys(dir)[0];
                    element.attr(propName, dir[propName]);
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
