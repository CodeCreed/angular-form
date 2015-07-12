### Requirements
------------------

* angular-material (*bower install angular-material*)

### Installation
------------------


#### Bower installation

``` $ bower install https://github.com/codecreed/angular-form ```

Or download zip manually from the link above

#### Insert JS and CSS dependencies

```html
<link rel="stylesheet" href="bower_components/angular-form/angular-form.css"/>
<script src="bower_components/angular-form/angular-form.js"></script>
```

#### Inject module dependency

```Javascript
angular.module('yourApp', ['angularForm'])
```

#### Running the provided example

``` cd example ```
``` bower install ```

### Example usage
------------------

[Live Demo](http://ruraj.com/angular-form/example/example.html)

#### Form JSON

```html
<dn-form form=sampleForm dn-model=sampleFormData dn-submit=sampleFormSubmit></dn-form>
```

NOTE: sampleFormObject and sampleFormData need to be the scope of the controller within which ```<dn-form></dn-form>``` is being used.

Controller providing form object and model
```javascript
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
      {"type": "textarea", "name": "description", "label": "Say something about yourself", "maxLength": 250},
      {"type": "submit", "label": "Register"}
    ]
  };
  // This variable is updated with the values entered in the form
  $scope.sampleFormData = {};
  
  $scope.sampleFormSubmit = function () {
    // TODO This method is called when the form submit button is pressed
    // Form data is accessed using the name as the key:
    alert("Welcome " + $scope.sampleFormData.first_name + "!\n Your Form: \n" + JSON.stringify($scope.sampleFormData, null, ' '));
  };
```

### Advanced Features

#### Ajax Select Options
Options to select type input can be passed with ajax call. Add `"optionsUrl": "/data/api/list"` as one of the properties.

#### Custom Select Options Filter
Options can be filtered by providing an additional property like `"optionsFilter": "filterName"`.
#### Custom Field Validator
```
"validators":
  [
    {
      "validate-date": "true", // Name of the validator, enabled/disabled
      "error": "invalidDate",  // Validity ID
      "message": "Invalid Date Format" // Error message to show if enabled
    }
  ]
````
