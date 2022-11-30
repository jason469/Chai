import {Component, Input, OnInit} from '@angular/core';
import {Cwimpie} from "../../../../shared/models/models";
import moment from "moment";
import {IBirthdayCwimpie} from "../../../../shared/interfaces/IBirthdayCwimpie";

@Component({
  selector: 'app-birthday-card',
  templateUrl: './birthday-card.component.html',
  styleUrls: ['./birthday-card.component.scss']
})
export class BirthdayCardComponent implements OnInit {
  @Input('cwimpieData') data!: IBirthdayCwimpie;
  age!:number
  pronoun!:string

  constructor() { }

  ngOnInit(): void {
    this.pronoun = (this.data.sex == "Male") ? "he" : "she"

    let birthday = this.data.birthdate
    let birthday_utc = new Date(birthday!)
    this.age = moment().diff(birthday_utc, 'years', false)
  }

}
