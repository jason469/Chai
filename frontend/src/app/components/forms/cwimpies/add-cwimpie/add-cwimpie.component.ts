import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";

@Component({
  selector: 'app-add-cwimpie',
  templateUrl: './add-cwimpie.component.html',
  styleUrls: ['./add-cwimpie.component.css']
})
export class AddCwimpieComponent implements OnInit {

  constructor() { }

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
      type: 'input',
      props: {
        label: 'Partner',
      }
    },
    {
      key: 'colour',
      type: 'input',
      props: {
        label: 'Colour',
      }
    },
    {
      key: 'species',
      type: 'input',
      props: {
        label: 'Species',
      }
    },
    {
      key: 'birthdate',
      type: 'input',
      props: {
        label: 'Birthdate',
      }
    },
    {
      key: 'favourites',
      type: 'input',
      props: {
        label: 'List of favourites',
      }
    },
    {
      key: 'hobbies',
      type: 'input',
      props: {
        label: 'Hobbies',
      }
    },
    {
      key: 'primary_parent',
      type: 'input',
      props: {
        label: 'Primary Parent',
      }
    },
  ];


}
