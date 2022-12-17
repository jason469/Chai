import {transition, trigger} from "@angular/animations";
import {horizontalBounce, verticalBounceIn} from "../../../../shared/utils/animations";

export const loadCommandmentsAnimation =
  trigger('commandmentsAnimationTrigger', [
      transition('void => *', verticalBounceIn()),
    ],
  )
