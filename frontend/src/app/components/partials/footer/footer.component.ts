import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {HeaderVisibilityService} from "../../../services/partials/header/headerVisibility.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private headerVisiblitySub: Subscription | undefined;
  navBarVisible:boolean = false

  constructor(
    private headerVisibilityService: HeaderVisibilityService,
  ) { }

  ngOnInit(): void {
    this.headerVisiblitySub = this.headerVisibilityService.getData().subscribe({
      next: (data: boolean) => {
        this.navBarVisible = data
        console.log(this.navBarVisible)
      }
    });
  }

}
