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
    private renderer: Renderer2
  ) {
  }

  onLogout() {
    this.authService.logOut()
  }

  toggleNavbar() {
    this.navbarVisible = !this.navbarVisible
    console.log(this.navbarVisible)
    if (this.navbarVisible) {  // Navbar is visible, so we want cross
      console.log('cross')
      this.renderer.removeClass(this.toggleNavbarCross.nativeElement, "hide")
      this.renderer.addClass(this.toggleNavbarHamburger.nativeElement, "hide")
    } else {  // Navbar isn't visible, so we want hamburger
      console.log('jamburger')
      this.renderer.removeClass(this.toggleNavbarHamburger.nativeElement, "hide")
      this.renderer.addClass(this.toggleNavbarCross.nativeElement, "hide")
    }

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
