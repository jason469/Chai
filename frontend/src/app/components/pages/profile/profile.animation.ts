import {transition, trigger} from "@angular/animations";
import {verticalBounceIn} from "../../../shared/utils/animations";

export const loadCarouselAnimation =
  trigger('loadCarouselAnimationTrigger', [
    transition('void => *', verticalBounceIn()),
  ])

