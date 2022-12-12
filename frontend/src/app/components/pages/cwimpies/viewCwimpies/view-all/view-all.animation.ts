import {transition, trigger} from "@angular/animations";
import {horizontalBounce, verticalBounceIn, verticalBounceOut} from "../../../../../shared/utils/animations";

export const loadListAnimation =
  trigger('loadListAnimationTrigger', [
    transition('void => *', verticalBounceIn()),
    transition('* => void', verticalBounceOut()),
  ])

export const tabAnimation =
  trigger('tabAnimationTrigger', [
    transition('* => *', horizontalBounce('.filterOption')),
  ])

