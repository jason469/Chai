import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {CwimpieFormService} from "../../../../services/cwimpies/cwimpieForm.service";
import {Cwimpie} from "../../../../shared/models/models";
import {ToastrService} from "ngx-toastr";
import {CwimpieUpdateDataService} from "../../../../services/cwimpies/cwimpieUpdateData.service";
import {BsModalService} from "ngx-bootstrap/modal";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-cwimpie',
  templateUrl: './update-cwimpies.component.html',
  styleUrls: ['./update-cwimpies.component.scss']
})
export class UpdateCwimpiesComponent implements OnInit, OnDestroy {
  @Output('cwimpieChanged') changedCwimpieName = new EventEmitter<string>();

  form: FormGroup
  model: Cwimpie;
  options: FormlyFormOptions;
  fields: Array<FormlyFieldConfig>
  addNewColour: boolean
  initialData!: Cwimpie;
  cwimpieUpdateDataServiceSubscription!: Subscription

  constructor(
    private cwimpieFormService: CwimpieFormService,
    private toastrService: ToastrService,
    private cwimpieUpdateDataService: CwimpieUpdateDataService,
    private modalService: BsModalService,
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
                },
                expressionProperties: {
                  'templateOptions.disabled': "true",
                },
              },
              {
                key: 'photo',
                type: 'file',
                templateOptions: {
                  multiple: true
                },
              },
              {
                key: 'sex',
                type: 'select',
                props: {
                  label: 'Sex',
                  required: true,
                  options: [
                    {label: 'Male', value: 'Male'},
                    {label: 'Female', value: 'Female'},
                  ],
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
                key: 'partner',
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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cwimpieUpdateDataServiceSubscription = this.cwimpieUpdateDataService.getData().subscribe({
      next: (data: Cwimpie) => {
        this.initialData = data
        this.model = this.initialData
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
    if (this.addNewColour) {
      this.model.colour = this.model.newColour
    }
    delete this.model.newColour
    if (this.form.valid) {
      this.cwimpieFormService.updateCwimpieData(
        this.model, this.initialData.name
      ).subscribe(
        (responseData: any) => {
          let photoData = new FormData();
          photoData.append('photo', this.model.photo[0]);
          this.cwimpieFormService.postCwimpiePhoto(
            photoData, this.model.name
          ).subscribe(
            (responseData: any) => {
              this.toastrService.success(
                `Yayyy well done`,
                `${this.model.name} was updated`
              );
              this.changedCwimpieName.next(this.initialData.name)
              this.modalService.hide()
            }
          )
        }, errorMessage => {
          this.toastrService.warning(
            `${JSON.stringify(errorMessage)}`,
            `There was an error in making the cwimpie :(`
          );
        }
      )
    }
  }

  ngOnDestroy():void {
    if (this.cwimpieUpdateDataServiceSubscription) {
      this.cwimpieUpdateDataServiceSubscription.unsubscribe()
    }
  }
}


// Archived code which replicates the update functionality using a custom search function
// fill_update_field(field: any, value: any) {
//   if (field.formControl != undefined) {
//     if (value != undefined) {
//       let patchValue = (typeof value == "string") ? value : value[field.key]
//       field.formControl!.patchValue(patchValue)
//     }
//   } else {
//     console.log(`${field} formControl is undefined`)
//   }
//   return
// }
//
// search_form_for_fields(rootField: any, key: any) {
//   let queue = rootField.slice() // This is a queue of fields to check
//   let currentField;
//
//   while (true) {
//     currentField = queue.shift()
//     if (currentField.key != undefined) {  // Is a field
//       if (currentField.key == key) {  // Found the field
//         queue.length = 0
//         return currentField
//       }
//     } else {
//       if (currentField.fieldGroup) {
//         for (let newField of currentField.fieldGroup) {
//           queue.push(newField)
//         }
//       }
//     }
//   }
// }
//
// ngAfterViewInit(): void {
//   const blackListedKeys = ["_id", "_v", "hexCode"]
//   this.cwimpieUpdateDataServiceSubscription = this.cwimpieUpdateDataService.getData().subscribe({
//     next: (data: Cwimpie) => {
//       this.initialData = data
//       const rootField = [this.fields[0]]
//       for (const [key, value] of Object.entries(this.initialData)) {
//         if (key !== "cwimpieId" && key != "newColour") {  // List of keys to ignore from Cwimpie object
//           if (Array.isArray(value)) {  // List of objects
//             let parentField = this.search_form_for_fields(rootField, key)
//             if (parentField.fieldGroup.length != 0) {
//               for (const singleValue of value) {
//                 for (const [nestedKey, nestedValue] of Object.entries(singleValue)) {
//                   if (!blackListedKeys.includes(nestedKey)) {
//                     let childField = this.search_form_for_fields(parentField.fieldGroup[0].fieldGroup, nestedKey)
//                     this.fill_update_field(childField, nestedValue)
//                   }
//                 }
//               }
//             }
//           } else if (typeof value == "object") {  // 1+ nested objects
//             for (const [nestedKey, nestedValue] of Object.entries(value)) {
//               if (!blackListedKeys.includes(nestedKey)) {
//                 if (typeof value[nestedKey] == "string") { // 1 nested object
//                   let parentField = this.search_form_for_fields(rootField, key)
//                   let childField = this.search_form_for_fields(parentField.fieldGroup, nestedKey)
//                   this.fill_update_field(childField, nestedValue)
//                 } else {  // 2 + nested objects
//                   // @ts-ignore
//                   for (const [nestedNestedKey, nestedNestedValue] of Object.entries(nestedValue)) {
//                     if (!blackListedKeys.includes(nestedNestedKey)) {
//                       let parentField = this.search_form_for_fields(rootField, key)
//                       let childField = this.search_form_for_fields(parentField.fieldGroup, nestedKey)
//                       let grandChildField = this.search_form_for_fields(childField.fieldGroup, nestedNestedKey)
//                       this.fill_update_field(grandChildField, nestedNestedValue)
//                     }
//                   }
//                 }
//               }
//             }
//           } else { // 0 nested objects
//             let field = this.search_form_for_fields(rootField, key)
//             this.fill_update_field(field, value)
//           }
//         }
//       }
//     }
//   });
// }
