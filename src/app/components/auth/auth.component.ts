import { Component, OnInit } from '@angular/core';
import {FormGroup, FormGroupDirective, NgForm} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  error: string = "";
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email'
      },
      props: {
        label: 'Email address',
        placeholder: 'Email',
        required: true,
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password'
      },
      props: {
        label: 'Password',
        placeholder: 'Enter password',
        required: true,
      }
    }
  ];

  onSubmit(form: FormGroupDirective) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    form.resetForm();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
