import {transition, trigger} from "@angular/animations";
import {horizontalBounce, verticalBounceIn} from "../../../shared/utils/animations";

export const loadSchedulesAnimation =
  trigger('loadSchedulesAnimationTrigger', [
    transition('void => *', horizontalBounce('.horizontal-animation')),
  ])

