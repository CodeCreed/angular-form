### Requirements

* angular-material (*bower install angular-material*)

### Creating form from JSON
-----------------------
```html
<dn-form form=formObject dn-model=formData></dn-form>
```


NOTE: formObject and formData need to be the scope of the controller within which *<dn-form></dn-form>* is being used.


### Example Controller providing form object and model
------------------
```javascript
function FormController($scope) {
  $scope.formObject = {
    name: "TestForm", // Name should not contain any special characters like space or anything
    fields:
        [ // start of rows
          [ // Row 1
            [ // Column 1
                {type: "text", name: "firstname", label: "Name" , required: true},
                {type: "radio", name: "ide_id", label: "IDE" , options:[{id: 1, name: "Eclipse"},{id: 2, name: "IntelliJ"},{id: 3, name: "Netbeans"},{id: 4, name: "Brackets"}], required: true},
                {type: "email", name: "emailUser", label: "Email" , required: true}
            ]
          ],
          [ // Row 2
            [ // Column 1
                {type: "password", name: "pass", label: "Password" , minPassword: 6, required: true},
                {type: "select", name: "programmer_id", label: "Programmer" , options:[{id:"1", name: "Sagun"},{id:"2", name: "Ruraj"},{id:"3", name: "Sushan"},{id:"4", name: "Subigya"}], required: true}
            ],
            [ // Column 2
                {type: "checkbox", name: "language_id", label: "Java", disabled: false},
                {type: "checkbox", name: "language_id2", label: "Scala", disabled: true},
            ]
          ],
          [ // Row 3
            [ // Column 1
                {type: "submit", name: "submit_button", label: "Submit"}
            ]
          ]
        ]
  };

  // This object will be used to populate the form and also will reflect any data entered in the form
  $scope.formData = {};
}
```

Notes:
1. Options to select type input can be passed with ajax call. Add `"optionsUrl": "/trekker/countries"` as one of the property.