import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {CwimpieFormService} from "../../../../services/cwimpies/cwimpieForm.service";
import {Cwimpie} from "../../../../shared/models/models";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {CwimpieUpdateDataService} from "../../../../services/cwimpies/cwimpieUpdateData.service";

@Component({
  selector: 'app-update-cwimpie',
  templateUrl: './update-cwimpies.component.html',
  styleUrls: ['./update-cwimpies.component.scss']
})
export class UpdateCwimpiesComponent implements OnInit {
  form: FormGroup
  model: Cwimpie;
  options: FormlyFormOptions;
  fields: Array<FormlyFieldConfig>
  addNewColour: boolean
  cwimpieUpdateDataServiceSubscription!: Subscription
  initialData!: Cwimpie;

  constructor(
    private cwimpieFormService: CwimpieFormService,
    private toastrService: ToastrService,
    private cwimpieUpdateDataService: CwimpieUpdateDataService,
  ) {
    this.addNewColour = false;
    this.form = new FormGroup({});
    this.model = new Cwimpie()
    this.options = {}
    this.fields = [
      {
        props: {label: 'Personal Details'},
        wrappers: ['panel'],
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
          {
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
                      defaultValue: "",
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
      },
    ];
  }

  fill_update_field(field: any, value: any) {
    if (field.formControl != undefined) {
      let patchValue
      patchValue = (typeof value == "string") ? value : value[field.key]
      field.formControl!.patchValue(patchValue)
    } else {
      console.log(`${field} formControl is undefined`)
    }
    return
  }

  search_form_for_fields(searchFields: any, value: any, key: any, parentKey = "") {  // If parent key isnt empty, search for parent first and then key. If no parent key, then just stearch for key
    if (parentKey != "") {  // The key name is not unique and so we need to find the parent first (which is unique)
      for (let field of searchFields) {
        if (field.key == parentKey) {  // Found the parent field
          console.log(`parent field is ${field} with key ${parentKey}`)
          this.search_form_for_fields(field.fieldGroup, value, key)
        }
      }
    } else {  // We know that the key name is unique and can just walk through the form
      for (let field of searchFields) {
        if (field.key) {  // Should just have a fieldGroup if no key
          if (field.key == key) {  // Current field is the correct field
            this.fill_update_field(field, value)
            return
          } else if (field.fieldGroup) {  // Current field incorrect, search another level down
            this.search_form_for_fields(field.fieldGroup, value, key, parentKey)
          }
        } else if (field.fieldGroup) {
          this.search_form_for_fields(field.fieldGroup, value, key, parentKey)
        }
      }
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cwimpieUpdateDataServiceSubscription = this.cwimpieUpdateDataService.getData().subscribe({
      next: (data: Cwimpie) => {
        this.initialData = data
        console.log(this.initialData)
        console.log(this.fields[0].fieldGroup)
        let allSections = this.fields[0].fieldGroup
        for (const [key, value] of Object.entries(this.initialData)) {
          if (key !== "cwimpieId" && key != "newColour") {  // List of keys to ignore from Cwimpie object
            if (Array.isArray(value)) {  // List of objects
              for (const singleValue of value) {
                for (const [nestedKey, nestedValue] of Object.entries(singleValue)) {
                  if (nestedKey != "_id") {
                    console.log('list', nestedKey, key, value)
                    this.search_form_for_fields(allSections, nestedValue, nestedKey, key)
                  }
                }
              }
            } else if (typeof value == "object") {  // 1+ nested objects
              for (const [nestedKey, nestedValue] of Object.entries(value)) {
                if (nestedKey != "_id") {
                  if (typeof value[nestedKey] == "string") { // 1 nested object
                    console.log('1nested', nestedKey, key, value)
                    this.search_form_for_fields(allSections, value, nestedKey, key)
                    break
                  } else {  // 2 + nested objects
                    // @ts-ignore
                    for (const [nestedNestedKey, nestedNestedValue] of Object.entries(nestedValue)) {
                      if (nestedNestedKey != "_id") {
                        console.log('2+nested', nestedNestedKey, nestedKey, nestedNestedValue)
                        this.search_form_for_fields(allSections, nestedNestedValue, nestedNestedKey, key)
                      }
                    }
                  }
                }
              }
            } else { // 0 nested objects
              console.log('0nested', key, value)
              this.search_form_for_fields(allSections, value, key)
            }
          }
        }
      }
    });
  }


  toggleNewColour() {
    let firstPage = this.fields[0].fieldGroup![1].fieldGroup
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

  submit() {
    // if (this.addNewColour) {
    //   this.model.colour = this.model.newColour
    // }
    // delete this.model.newColour
    // if (this.form.valid) {
    //   this.cwimpieFormService.postCwimpieData(
    //     this.model
    //   ).subscribe(
    //     (responseData:any) => {
    //       this.form.reset()
    //       this.toastrService.success(
    //         `Yayyy well done`,
    //         `${responseData.name} was created`
    //       );
    //     }, errorMessage => {
    //       this.toastrService.warning(
    //         `${JSON.stringify(errorMessage)}`,
    //         `There was an error in making the cwimpie :(`
    //       );
    //     }
    //   )
    // }
    // else {
    //   validateAllFormFields(this.form)
    // }
  }

  ngOnDestroy()
    :
    void {
    if (this.cwimpieUpdateDataServiceSubscription
    ) {
      this.cwimpieUpdateDataServiceSubscription.unsubscribe()
    }
  }

}
