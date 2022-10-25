import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {FormlyFieldConfig} from "@ngx-formly/core";

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

}
