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
  styleUrls: ['./add-cwimpie.component.css']
})
export class AddCwimpieComponent implements OnInit {
  constructor(
    private cwimpieFormService: CwimpieFormService,
  ) {
  }

  ngOnInit(): void {
  }

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model = {};
  fields: FormlyFieldConfig[] = [
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
      key: 'partner',
      type: 'select',
      className: 'select-stlyes',
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
      className: 'select-stlyes',
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
      className: 'select-stlyes',
      templateOptions: {
        label: 'Species',
        options: [],
      },
      hooks: {
        onInit: (field) => this.getSpecies(field)
      }
    },
    {
      key: 'birthday',
      type: 'datepicker',
      props: {
        label: 'Birthday',
      },
    },
    {
      key: 'favouriteGroup',
      wrappers: ['panel'],
      props: {label: 'Favourites'},
      fieldGroup: [
        {
          key: 'favouriteGroup1',
          wrappers: ['panel'],
          fieldGroup: [
            {
              key: 'favourites',
              type: 'input',
              props: {
                label: 'Favourite',
              }
            },
            {
              key: 'favouritesType',
              type: 'select',
              className: 'select-styles',
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
    {
      key: 'professionGroup',
      wrappers: ['panel'],
      props: {label: 'Profession'},
      fieldGroup: [
        {
          key: 'professionGroup1',
          wrappers: ['panel'],
          fieldGroup: [
            {
              key: 'profession',
              type: 'input',
              props: {
                label: 'Profession',
              }
            },
            {
              key: 'professionType',
              type: 'select',
              className: 'select-stlyes',
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
      fieldGroup: [
        {
          key: 'hobbies',
          type: 'input',
          props: {
            label: 'Hobbies',
          }
        },
      ]
    },
    {
      key: 'primary_parent',
      type: 'select',
      className: 'select-stlyes',
      templateOptions: {
        label: 'Primary Parent',
        options: [],
      },
      hooks: {
        onInit: (field) => this.getUsers(field)
      }
    },
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

  addNewField(groupKey:string){
    let group:any = this.fields.find((obj) => obj.key === groupKey)
    let newGroupId: number = group.fieldGroup.length + 1
    let newGroup = JSON.parse(JSON.stringify(group.fieldGroup[0]))
    newGroup.key = `${groupKey}${String(newGroupId)}`
    group.fieldGroup.splice(1, 0, newGroup)
    this.fields = this.fields.map(field => field);
  }

  addFavouriteField() {
    this.addNewField("favouriteGroup")
  }

  addProfessionField() {
    this.addNewField("professionGroup")
  }

  addHobbyField() {
    this.addNewField("hobbies")
  }
}
