import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {
  GET_ALL_COLOURS_URL,
  GET_ALL_CWIMPIES_URL, GET_ALL_FAVOURITE_TYPES, GET_ALL_PROFESSION_TYPES,
  GET_ALL_SPECIES_URL,
  GET_ALL_USERS_URL
} from "../../shared/constants/url";

@Injectable({
  providedIn: 'root'
})
export class CwimpieFormService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getSelectFieldOptions(url: string, propertyName: string, field: FormlyFieldConfig) {
    let choices: {}[] = [];
    if (!field || !field.templateOptions) {
      return;
    }
    field.templateOptions.options = this.http.get(url).pipe(
      map(responseData => {
          let allData = Object.values(responseData)
          for (let data of allData) {
            choices.push({value: data[propertyName], label: data[propertyName]})
          }
          return choices
        }
      )
    );
  }

  getSelectFieldTypeOptions(url: string, field: FormlyFieldConfig) {
    let choices: {}[] = [];
    if (!field || !field.templateOptions) {
      return;
    }
    field.templateOptions.options = this.http.get(url).pipe(
      map(responseData => {
          let allData = Object.values(responseData)
          for (let data of allData) {
            choices.push({value: data, label: data})
          }
          return choices
        }
      )
    );
  }

  getPartners(field: FormlyFieldConfig) {
    return this.getSelectFieldOptions(GET_ALL_CWIMPIES_URL, "name", field)
  }

  getColours(field: FormlyFieldConfig) {
    return this.getSelectFieldOptions(GET_ALL_COLOURS_URL, "name", field)
  }

  getSpecies(field: FormlyFieldConfig) {
    return this.getSelectFieldOptions(GET_ALL_SPECIES_URL, "name", field)
  }

  getUsers(field: FormlyFieldConfig) {
    return this.getSelectFieldOptions(GET_ALL_USERS_URL, "name", field)
  }

  getFavouriteTypes(field: FormlyFieldConfig) {
    return this.getSelectFieldTypeOptions(GET_ALL_FAVOURITE_TYPES, field)
  }

  getProfessionTypes(field: FormlyFieldConfig) {
    return this.getSelectFieldTypeOptions(GET_ALL_PROFESSION_TYPES, field)
  }

}
