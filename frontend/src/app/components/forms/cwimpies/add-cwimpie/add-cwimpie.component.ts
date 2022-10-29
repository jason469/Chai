import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {
  GET_ALL_COLOURS_URL,
  GET_ALL_CWIMPIES_URL,
  GET_ALL_FAVOURITE_TYPES,
  GET_ALL_PROFESSION_TYPES,
  GET_ALL_SPECIES_URL,
  GET_ALL_USERS_URL
} from "../../../../shared/constants/url";
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
    primary_parent: null,
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
                  description: `Lovers ♥ !!`
                },
                hooks: {
                  onInit: (field) => this.getPartners(field)
                }
              },
                {
                  key: 'colour',
                  type: 'select',
                  templateOptions: {
                    label: 'Colour',
                    options: [],
                  },
                  hooks: {
                    onInit: (field) => this.getColours(field)
                  }
                },
                {
                  key: 'species',
                  type: 'select',
                  templateOptions: {
                    label: 'Species',
                    options: [],
                  },
                  hooks: {
                    onInit: (field) => this.getSpecies(field)
                  }
                },
                {
                  key: 'primary_parent',
                  type: 'select',
                  templateOptions: {
                    label: 'Primary Parent',
                    options: [],
                  },
                  hooks: {
                    onInit: (field) => this.getUsers(field)
                  }
                },]
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
              fieldGroup: [
                {
                  key: 'favouriteInputs0',
                  className: "valueType",
                  fieldGroup: [
                    {
                      key: 'favourites',
                      type: 'input',
                      className: "valueType__input",
                      props: {
                        label: 'Favourite',
                      }
                    },
                    {
                      key: 'favouritesType',
                      type: 'select',
                      className: 'valueType__select',
                      templateOptions: {
                        label: 'Type',
                        options: [],
                      },
                      hooks: {
                        onInit: (field) => this.getFavouriteTypes(field)
                      }
                    },
                  ],
                },
              ],
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
              fieldGroup: [
                {
                  key: "professionInputs0",
                  className: "valueType",
                  fieldGroup: [
                    {
                      key: 'profession',
                      type: 'input',
                      className: "valueType__input",
                      props: {
                        label: 'Profession',
                      }
                    },
                    {
                      key: 'professionType',
                      type: 'select',
                      className: 'valueType__select',
                      templateOptions: {
                        label: 'Type',
                        options: [],
                      },
                      hooks: {
                        onInit: (field) => this.getProfessionTypes(field)
                      }
                    },
                  ],
                }
              ],
            },
            {
              key: 'hobbies',
              type: 'repeat',
              fieldGroup: [
                {
                  key: 'hobbyInput0',
                  type: 'input',
                  props: {
                    label: 'Hobbies',
                  }
                },
              ]
            },
          ]
        }
      ]
    }
  ];


  private getPartners(field: FormlyFieldConfig) {
    return this.cwimpieFormService.getSelectFieldOptions(GET_ALL_CWIMPIES_URL, "name", field)
  }

  private getColours(field: FormlyFieldConfig) {
    return this.cwimpieFormService.getSelectFieldOptions(GET_ALL_COLOURS_URL, "name", field)
  }

  private getSpecies(field: FormlyFieldConfig) {
    return this.cwimpieFormService.getSelectFieldOptions(GET_ALL_SPECIES_URL, "name", field)
  }

  private getUsers(field: FormlyFieldConfig) {
    return this.cwimpieFormService.getSelectFieldOptions(GET_ALL_USERS_URL, "name", field)
  }

  private getFavouriteTypes(field: FormlyFieldConfig) {
    return this.cwimpieFormService.getSelectFieldTypeOptions(GET_ALL_FAVOURITE_TYPES, field)
  }

  private getProfessionTypes(field: FormlyFieldConfig) {
    return this.cwimpieFormService.getSelectFieldTypeOptions(GET_ALL_PROFESSION_TYPES, field)
  }

  submit() {
    console.log(this.model);
    console.log(this.options)
  }
}
