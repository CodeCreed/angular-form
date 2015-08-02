angular.module("sampleApp", ['ngMaterial', 'angularForm'])

  .controller("SampleAppController", SampleAppController)
  .filter("daysFilter", DaysFilter);
  
  
function SampleAppController ($scope) {
  var ideOptions = [
    {"id": 0, "name": "IntelliJ IDEA"},
    {"id": 1, "name": "Eclipse"},
    {"id": 2, "name": "EMACS"},
    {"id": 3, "name": "Vi"}
  ];

  $scope.sampleForm = {
    "name": "sampleForm", // No special characters allowed here
    "fields": [
      // Start of rows
      // Let's first add a row that has just a section divider
      {"type": "section", "label": "Personal Details"},
      [
        // Start of columns
        {"type": "text", "name": "first_name", "label": "First name", "required": true},
        {"type": "text", "name": "last_name", "label": "Last name", "required": true}
      ],
      {"type": "email", "name": "email", "label": "Email", "required": true},
      [
        [
          {"type": "section", "label": "Date of Birth"},
          [
            {"type": "select", "name": "Day", "label": "Day", "optionsUrl": "days", "optionsFilter": "daysFilter", "required": true},
            {"type": "select", "name": "Month", "label": "Month", "optionsUrl": "months", "required": true},
            {"type": "select", "name": "Year", "label": "Year", "optionsUrl": "years", "required": true}
          ]
        ]
      ],
      [
        {"type": "select", "name": "languages", "label": "Language Skills", "optionsUrl": "languages", "multiple": true},
        {"type": "select", "name": "ides", "label": "Preferred IDEs", "options": ideOptions, "multiple": true}
      ],
      {"type": "sortedinputlist", "name": "schools", "label": "Schools you have attended (in order)",
       "inputs": [
         [{"type": "select", "name": "name", "label": "School name", "optionsUrl": "schools"},
         {"type": "date", "name": "graduation", "label": "Graduation Date", "required": true}]
       ]
      },
      {"type": "textarea", "name": "description", "label": "Say something about yourself", "maxLength": 250},
      {"type": "submit", "label": "Register"}
    ]
  };
  // This variable is updated with the values entered in the form
  $scope.sampleFormData = {
    schools: [
      {"name": "KEC"},
      {"name": "ULCA"}
    ]
  };
  
  $scope.sampleFormSubmit = function () {
    // TODO This method is called when the form submit button is pressed
    // Form data is accessed using the name as the key:
    alert("Welcome " + $scope.sampleFormData.first_name + "!\n Your Form: \n" + JSON.stringify($scope.sampleFormData, null, ' '));
  };
}


function DaysFilter() {
  return function(list) {
    // TODO Check the month field value and generate either a 29, 30 or 31 day list here
    return list;
  }
}
