import { Component, OnInit } from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {UserService} from "../../services/user.service";

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
      key: 'username',
      type: 'input',
      props: {
        label: 'Username',
        placeholder: 'Username',
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
    if (!form.valid) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;

    this.isLoading = true;
    this.userService.login({
      username: username,
      password: password
    }).subscribe(() => {
    })
    form.resetForm();
  }

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
  }

}
