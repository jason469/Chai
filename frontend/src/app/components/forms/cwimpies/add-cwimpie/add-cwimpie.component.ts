import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {CwimpieFormService} from "../../../../services/cwimpies/cwimpieForm.service";
import {Cwimpie} from "../../../../shared/models/Cwimpie";

@Component({
  selector: 'app-add-cwimpie',
  templateUrl: './add-cwimpie.component.html',
  styleUrls: ['./add-cwimpie.component.scss']
})
export class AddCwimpieComponent implements OnInit {
  ngOnInit(): void {
  }

  form: FormGroup
  model: Cwimpie;
  options: FormlyFormOptions;
  fields: Array<FormlyFieldConfig>
  addNewColour: boolean

  constructor(
    private cwimpieFormService: CwimpieFormService,
  ) {
    this.addNewColour = false;
    this.form = new FormGroup({});
    this.model = new Cwimpie()
    this.options = {}
    this.fields = [
      {
        type: 'stepper',
        fieldGroup: [
          {
            fieldGroupClassName: 'addCwimpies_page1',
            props: {label: 'Personal Details'},
            fieldGroup: [
              {
                className: 'addCwimpies_page1__left',
                fieldGroup: [
                  {
                    key: 'name',
                    type: 'input',
                    props: {
                      label: 'Cwimpie\'s name!',
                      required: true,
                    }
                  },
                  // {
                  //   key: 'photo',
                  //   type: 'file',
                  //   templateOptions: {
                  //     multiple: true
                  //   },
                  // },
                  {
                    key: 'birthdate',
                    type: 'datepicker',
                    defaultValue: new Date(),
                    props: {
                      label: 'Birthday',
                      required: true,
                      description: "DD/MM/YYYY"
                    },
                  },
                ]
              },
              {
                className: 'addCwimpies_page1__right',
                fieldGroup: [{
                  key: 'partnerName',
                  type: 'select',
                  templateOptions: {
                    label: 'Partner',
                    options: [],
                    description: `Lovers ♥ !!`,
                  },
                  hooks: {
                    onInit: (field) => this.cwimpieFormService.getPartners(field)
                  }
                },
                  {
                    key: 'colour',
                    fieldGroup: [
                      {
                        key: 'name',
                        type: 'select',
                        templateOptions: {
                          label: 'Colour',
                          options: [],
                        },
                        hooks: {
                          onInit: (field) => this.cwimpieFormService.getColours(field)
                        },
                      },
                    ],
                  },
                  {
                    key: 'newColour',
                    className: "valueType",
                    fieldGroup: [
                      {
                        key: 'name',
                        type: 'input',
                        templateOptions: {
                          label: 'New colour\'s name',
                          required: false,
                        },
                        expressionProperties: {
                          'templateOptions.disabled': "true",
                        },
                      },
                      {
                        key: 'hexCode',
                        type: 'input',
                        templateOptions: {
                          label: 'New colour\'s hex code',
                          required: false,
                        },
                        expressionProperties: {
                          'templateOptions.disabled': "true",
                        },
                      },
                    ],
                  },
                  {
                    key: 'species',
                    fieldGroup: [
                      {
                        key: 'name',
                        type: 'select',
                        defaultValue: 'Bunny',
                        templateOptions: {
                          label: 'Species',
                          options: [],
                          required: true,
                        },
                        hooks: {
                          onInit: (field) => this.cwimpieFormService.getSpecies(field)
                        }
                      }
                    ],
                  },
                  {
                    key: 'primaryParent',
                    fieldGroup: [
                      {
                        key: 'name',
                        type: 'select',
                        defaultValue: 'Jason Liu',
                        templateOptions: {
                          label: 'Primary Parent',
                          options: [],
                          required: true,
                        },
                        hooks: {
                          onInit: (field) => this.cwimpieFormService.getUsers(field)
                        }
                      }
                    ],
                  },
                ]
              },
            ]
          },
          {
            props: {label: 'Favourites !'},
            fieldGroup: [
              {
                key: 'favourites',
                wrappers: ['panel'],
                props: {
                  label: 'Favourites',
                  description: "Add favourites",
                },
                type: 'repeat',
                templateOptions: {
                  addText: 'Add another favourite',
                },
                className: "valueType",
                fieldArray: {
                  fieldGroup: [
                    {
                      key: 'name',
                      type: 'input',
                      className: "valueType__input",
                      props: {
                        label: 'Favourite',
                        required: true,
                      }
                    },
                    {
                      key: 'type',
                      type: 'select',
                      className: 'valueType__select',
                      defaultValue: "Food",
                      templateOptions: {
                        label: 'Type',
                        options: [],
                        required: true,
                      },
                      hooks: {
                        onInit: (field) => this.cwimpieFormService.getFavouriteTypes(field)
                      }
                    },
                  ],
                },
              },
            ]
          },
          {
            props: {label: 'What do they do with their spare time?'},
            fieldGroup: [
              {
                key: 'professions',
                wrappers: ['panel'],
                props: {label: 'Profession'},
                type: 'repeat',
                templateOptions: {
                  addText: 'Add another investment',
                },
                className: "valueType",
                fieldArray: {
                  fieldGroup: [
                    {
                      key: 'name',
                      type: 'input',
                      className: "valueType__input",
                      props: {
                        label: 'Profession',
                        required: true,
                      }
                    },
                    {
                      key: 'type',
                      type: 'select',
                      className: 'valueType__select',
                      defaultValue: "Main",
                      templateOptions: {
                        label: 'Type',
                        options: [],
                        required: true,
                      },
                      hooks: {
                        onInit: (field) => this.cwimpieFormService.getProfessionTypes(field)
                      }
                    },
                  ],
                },
              },
              {
                key: 'hobbies',
                wrappers: ['panel'],
                props: {
                  label: 'Hobbies',
                  description: "Add hobbies",
                },
                type: 'repeat',
                templateOptions: {
                  addText: 'Add another investment',
                },
                fieldArray: {
                  fieldGroup: [
                    {
                      key: 'name',
                      type: 'input',
                      props: {
                        label: 'Hobbies',
                        required: true,
                      }
                    },
                  ]
                },
              },
            ]
          }
        ]
      }
    ];
  }

  toggleNewColour() {
    // @ts-ignore
    let firstPage = this.fields[0].fieldGroup[0].fieldGroup[1].fieldGroup
    let colourField = firstPage!.find(obj => obj.key == "colour")
    let newColourGroup = firstPage!.find(obj => obj.key == "newColour")
    if (this.addNewColour) { // If addNewColour is true, then we don't want to add a new colour
      colourField!.formControl!.patchValue({name: ""})
      colourField!.templateOptions!.disabled = false
      newColourGroup!.fieldGroup?.forEach((field) => {
        field.formControl?.patchValue("")
        field.templateOptions!.disabled = true
      })
      this.addNewColour = false
    } else {  // We do want to add a new colour
      colourField!.formControl!.patchValue({name: ""})
      colourField!.templateOptions!.disabled = true
      newColourGroup!.fieldGroup?.forEach((field) => field.templateOptions!.disabled = false)
      this.addNewColour = true
    }

    // console.log(this)
  }


  submit() {
    this.cwimpieFormService.postCwimpieData(
      this.model
    ).subscribe(
      responseData => {
        this.form.reset()
        console.log(responseData)
      }, errorMessage => {
        console.log('error in creating cwimpie', errorMessage)
      }
    )
  }
}
