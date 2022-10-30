import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {CwimpieFormService} from "../../../../services/cwimpies/cwimpieForm.service";

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
  model: any = {
    name: "",
    photo: null,
    birthday: Date.now(),
    partner: null,
    colour: null,
    species: null,
    primaryParent: null,
    favouriteGroup: [],
    professionGroup: [],
    hobbies: [],

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
                  key: 'birthday',
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
                key: 'partner',
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
                  type: 'select',
                  templateOptions: {
                    label: 'Colour',
                    options: [],
                    required: true,
                  },
                  hooks: {
                    onInit: (field) => this.cwimpieFormService.getColours(field)
                  }
                },
                {
                  key: 'species',
                  type: 'select',
                  templateOptions: {
                    label: 'Species',
                    options: [],
                    required: true,
                  },
                  hooks: {
                    onInit: (field) => this.cwimpieFormService.getSpecies(field)
                  }
                },
                {
                  key: 'primaryParent',
                  type: 'select',
                  templateOptions: {
                    label: 'Primary Parent',
                    options: [],
                    required: true,
                  },
                  hooks: {
                    onInit: (field) => this.cwimpieFormService.getUsers(field)
                  }
                },
              ]
            },
          ]
        },
        {
          props: {label: 'Favourites !'},
          fieldGroup: [
            {
              key: 'favouriteGroup',
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
                    key: 'favourites',
                    type: 'input',
                    className: "valueType__input",
                    props: {
                      label: 'Favourite',
                      required: true,
                    }
                  },
                  {
                    key: 'favouritesType',
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
              key: 'professionGroup',
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
                    key: 'profession',
                    type: 'input',
                    className: "valueType__input",
                    props: {
                      label: 'Profession',
                      required: true,
                    }
                  },
                  {
                    key: 'professionType',
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
                    key: 'hobbyInput0',
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
    console.log(this.model);
  }
}
