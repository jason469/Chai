import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {CwimpieFormService} from "../../../../services/cwimpies/cwimpieForm.service";
import {Cwimpie} from "../../../../shared/models/models";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

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
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef
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
                  {
                    key: 'photo',
                    type: 'file',
                    templateOptions: {
                      multiple: true
                    },
                  },
                  {
                    key: 'birthdate',
                    type: 'datepicker',
                    defaultValue: new Date(),
                    props: {
                      label: 'Birthday',
                      required: true,
                      description: "MM/DD/YYYY"
                    },
                  },
                  {
                    key: 'stamp',
                    wrappers: ['panel'],
                    props: {
                      label: 'Stamps',
                      description: "Add stamp",
                    },
                    fieldGroup: [
                      {
                        key: 'primary_colour',
                        fieldGroup: [
                          {
                            key: 'name',
                            type: 'select',
                            templateOptions: {
                              options: [],
                            },
                            props: {
                              label: 'Primary Colour',
                              required: true,
                            },
                            hooks: {
                              onInit: (field) => this.cwimpieFormService.getColours(field)
                            }
                          }
                        ]
                      },
                      {
                        key: 'accent_colour',
                        fieldGroup: [
                          {
                            key: 'name',
                            type: 'select',
                            templateOptions: {
                              options: [],
                            },
                            props: {
                              label: 'Accent Colour',
                              required: true,
                            },
                            hooks: {
                              onInit: (field) => this.cwimpieFormService.getColours(field)
                            },
                          }
                        ]
                      },
                      {
                        key: 'font',
                        type: 'select',
                        templateOptions: {
                          options: [],
                        },
                        props: {
                          label: 'Font',
                          required: true,
                        },
                        hooks: {
                          onInit: (field) => this.cwimpieFormService.getFonts(field)
                        },
                      },
                    ]
                  },
                ]
              },
              {
                className: 'addCwimpies_page1__right',
                fieldGroup: [
                  {
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
                        validators: {
                          validation: ["VHexCode"]
                        }
                      },
                    ],
                  },
                  {
                    key: 'species',
                    fieldGroup: [
                      {
                        key: 'name',
                        type: 'select',
                        defaultValue: "Bunny",
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

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  toggleNewColour() {
    // @ts-ignore
    let firstPage = this.fields[0].fieldGroup[0].fieldGroup[1].fieldGroup
    let colourField = firstPage!.find(obj => obj.key == "colour")
    let newColourGroup = firstPage!.find(obj => obj.key == "newColour")
    if (this.addNewColour) { // If addNewColour is true, then we don't want to add a new colour
      colourField!.formControl!.patchValue({name: ""})
      colourField!.templateOptions!.disabled = false
      colourField!.templateOptions!.required = true
      newColourGroup!.fieldGroup?.forEach((field) => {
        field.formControl?.patchValue("")
        field.templateOptions!.disabled = true
        field.templateOptions!.required = false
      })
      this.addNewColour = false
    } else {  // We do want to add a new colour
      colourField!.formControl!.patchValue({name: ""})
      colourField!.templateOptions!.disabled = true
      colourField!.templateOptions!.required = false
      newColourGroup!.fieldGroup?.forEach((field) => {
        field.templateOptions!.disabled = false
        field.templateOptions!.required = true
      })
      this.addNewColour = true
    }
  }

  fillDefaultValues(field: any, valueType: string) {
    let getRandomValueSubscription: Subscription = this.cwimpieFormService.getRandomValues(valueType).subscribe(
      (randomValue) => {
        if (field.formControl!.value === "" || field.formControl!.value === undefined) {
          field.formControl!.patchValue(randomValue)
        }
      }, errorMessage => {
        console.log('error in fetching random value', errorMessage)
      }, () => {
        getRandomValueSubscription.unsubscribe()
      }
    )
  }

  insertRandomValues() {
    let firstPageLeft = this.fields[0].fieldGroup![0].fieldGroup![0].fieldGroup
    let secondPage = this.fields[0].fieldGroup![1].fieldGroup
    let thirdPage = this.fields[0].fieldGroup![2].fieldGroup
    let nameField = firstPageLeft!.find(obj => obj.key == "name")
    let favouriteFields = secondPage!.find(obj => obj.key == "favourites")
    let professionFields = thirdPage!.find(obj => obj.key == "professions")
    let hobbyFields = thirdPage!.find(obj => obj.key == "hobbies")
    let nestedFieldsToInsert = [
      {
        "valueType": "favourites",
        "fields": favouriteFields
      },
      {
        "valueType": "professions",
        "fields": professionFields
      },
      {
        "valueType": "hobbies",
        "fields": hobbyFields
      }]
    for (let currentFields of nestedFieldsToInsert) {
      for (let currentField of currentFields.fields!.fieldGroup!) {
        let field = currentField.fieldGroup![0]
        this.fillDefaultValues(field, currentFields.valueType)
      }
    }
    this.fillDefaultValues(nameField, "name")
  }


  submit() {
    if (this.addNewColour) {
      this.model.colour = this.model.newColour
    }
    delete this.model.newColour
    if (this.form.valid) {
      this.cwimpieFormService.postCwimpieData(
        this.model
      ).subscribe(
        (responseData: any) => {
          this.form.reset()
          this.toastrService.success(
            `Yayyy well done`,
            `${responseData.name} was created`
          );
        }, errorMessage => {
          this.toastrService.warning(
            `${JSON.stringify(errorMessage)}`,
            `There was an error in making the cwimpie :(`
          );
        }
      )
    }
    // else {
    //   validateAllFormFields(this.form)
    // }
  }
}
