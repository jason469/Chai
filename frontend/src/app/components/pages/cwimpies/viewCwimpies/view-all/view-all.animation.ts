import {transition, trigger} from "@angular/animations";
import {horizontalBounce, verticalBounceInAndOut} from "../../../../../shared/utils/animations";

export const listAnimation =
  trigger('listAnimationTrigger', [
    transition('* => *', verticalBounceInAndOut()),  // Unique case because when we unfilter an element, it's technically not void
  ])

export const tabAnimation =
  trigger('tabAnimationTrigger', [
    transition('* => *', horizontalBounce('.horizontal-animation')),
  ])

