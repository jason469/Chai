import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ColourMenuService} from "../../../../services/misc/helpMenu/colourMenu.service";
import {Subscription} from "rxjs";
import {Colour} from "../../../../shared/models/models";

@Component({
  selector: 'app-colour-menu',
  templateUrl: './colour-menu.component.html',
  styleUrls: ['./colour-menu.component.scss']
})
export class ColourMenuComponent implements OnInit, OnDestroy {
  private getAllColoursSub: Subscription | undefined;
  allColours: Colour[] = [];
  @ViewChild('colourMenu') private menu!: ElementRef;

  constructor(
    private colourMenuService: ColourMenuService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.getAllColoursSub = this.colourMenuService.getAllColours().subscribe(data => {
      if (data.length != 0) {
        for (let colour of data) {
          let colourData: Colour = {
            name: colour.name,
            hexCode: colour.hexCode
          }
          this.allColours.push(colourData)
        }
      }
    })
  }

  showMenu() {
    this.renderer.setStyle(this.menu.nativeElement, 'visibility', 'visible')
  }

  hideMenu() {
    this.renderer.setStyle(this.menu.nativeElement, 'visibility', 'hidden')
  }

  ngOnDestroy(): void {
    this.getAllColoursSub?.unsubscribe()
  }

}
