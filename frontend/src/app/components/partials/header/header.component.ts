import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription | undefined;
  isAuthenticated = false;
  navbarVisible: boolean = true;
  @ViewChild('toggleNavbarHamburger') toggleNavbarHamburger!: ElementRef<HTMLElement>
  @ViewChild('toggleNavbarCross') toggleNavbarCross!: ElementRef<HTMLElement>

  constructor(
    private authService: AuthService,
  ) {
  }

  onLogout() {
    this.authService.logOut()
  }

  toggleNavbar(event:boolean) {
    this.navbarVisible = event
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user  // True if user, false if no user
    })
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe()
    }
  }
}
