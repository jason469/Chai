import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfilePageService} from "../../../services/profile/profilePage.service";
import {Subscription} from "rxjs";
import {User} from "../../../shared/models/models";
import {IUserCwimpies} from "../../../shared/interfaces/IUserCwimpies";
import {loadCarouselAnimation} from "./profile.animation";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    loadCarouselAnimation
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  private getCurrentUserSub: Subscription | undefined;
  private getCwimpiesFromUserSub: Subscription | undefined;
  currentUser!: User;
  allCwimpies: IUserCwimpies[] = [];
  isLoading: boolean = true

  constructor(
    private profilePageService: ProfilePageService
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUserSub = this.profilePageService.getCurrentUser()?.subscribe({
      next: (response: User) => {
        this.currentUser = response
        if (this.currentUser.username) {
          this.getCwimpiesFromUserSub = this.profilePageService
            .getCwimpiesFromUser(this.currentUser.username)
            .subscribe(allCwimpiesResponse => {
              if (allCwimpiesResponse.length != 0) {
                for (let cwimpieData of allCwimpiesResponse) {
                  let cwimpie: IUserCwimpies = {
                    name: cwimpieData.name,
                    photo: cwimpieData.photo
                  }
                  this.allCwimpies.push(cwimpie)
                }
              }
            })
        }
        this.isLoading = false
      }
    })
  }

  ngOnDestroy(): void {
    if (this.getCurrentUserSub) {
      this.getCurrentUserSub.unsubscribe()
    }
    if (this.getCwimpiesFromUserSub) {
      this.getCwimpiesFromUserSub.unsubscribe()
    }
  }

}
