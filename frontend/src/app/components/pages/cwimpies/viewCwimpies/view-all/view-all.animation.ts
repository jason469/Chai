import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";
import {horizontalBounce, verticalBounceInAndOut} from "../../../../../shared/utils/animations";
import {optional} from "../../../../../shared/constants/animations";

export const listAnimation =
  trigger('listAnimationTrigger', [
    transition('* => *', verticalBounceInAndOut()),  // Unique case because when we unfilter an element, it's technically not void
  ])

export const tabAnimation =
  trigger('tabAnimationTrigger', [
    transition('* => *', horizontalBounce('.filterOption')),
  ])

