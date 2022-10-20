import {Component, OnInit} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {AuthService} from "../../services/auth/auth.service";
import {Observable} from "rxjs";
import {AuthResponseData} from "../../shared/interfaces/AuthResponseData";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  error: string = "";

  constructor(private userService: AuthService, private router: Router) {
  }

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

    let user: Observable<AuthResponseData>;

    this.isLoading = true;

    user = this.userService.login({
      username: username,
      password: password
    })

    user.subscribe(
      resData => {
        form.resetForm();
        this.router.navigate(['/'])
      }, errorMessage => {
        console.log('error in login', errorMessage)
      })

    this.isLoading = false;

  }

  ngOnInit(): void {
  }

}
