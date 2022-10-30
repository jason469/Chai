import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {CwimpieFormService} from "../../../../services/cwimpies/cwimpieForm.service";
import {IAddCwimpieData} from "../../../../shared/interfaces/IAddCwimpieData";

@Component({
  selector: 'app-add-cwimpie',
  templateUrl: './add-cwimpie.component.html',
  styleUrls: ['./add-cwimpie.component.scss']
})
export class AddCwimpieComponent implements OnInit {
  constructor(
    private cwimpieFormService: CwimpieFormService,
  ) {
  }

  ngOnInit(): void {
  }

  form = new FormGroup({});
  model: IAddCwimpieData = {
    name: "",
    photo: "",
    birthdate: String(Date.now()),
    partnerName: "",
    colour: {
      "name": ""
    },
    species: {
      "name": ""
    },
    primaryParent: {
      "name": ""
    },
    favourites: [{
      "name": ""
    }],
    professions: [{
      "name": ""
    }],
    hobbies: [{
      "name": ""
    }],

  };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
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
                  props: {
                    label: 'Profile picture',
                  }
                },
                {
                  key: 'birthdate',
                  type: 'datepicker',
                  props: {
                    label: 'Birthday',
                    required: true,
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
                  required: true,
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
                        required: true,
                      },
                      hooks: {
                        onInit: (field) => this.cwimpieFormService.getColours(field)
                      }
                    }
                  ],
                },
                {
                  key: 'species',
                  fieldGroup: [
                    {
                      key: 'name',
                      type: 'select',
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
                      label: 'Favourite',
                      required: true,
                    }
                  },
                  {
                    key: 'type',
                    type: 'select',
                    className: 'valueType__select',
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

  submit() {
    console.log(JSON.stringify(this.model));
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
