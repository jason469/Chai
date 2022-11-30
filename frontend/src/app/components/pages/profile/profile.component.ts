import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfilePageService} from "../../../services/profile/profilePage.service";
import {Subscription} from "rxjs";
import {User} from "../../../shared/models/models";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private getCurrentUserSub: Subscription | undefined;
  currentUser!: User;
  loading: boolean = true

  constructor(
    private profilePageService: ProfilePageService
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUserSub = this.profilePageService.getCurrentUser()?.subscribe(response => {
      this.currentUser = response
      console.log(this.currentUser)
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    if (this.getCurrentUserSub) {
      this.getCurrentUserSub.unsubscribe()
    }
  }

}
