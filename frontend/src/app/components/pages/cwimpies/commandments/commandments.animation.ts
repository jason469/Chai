import {transition, trigger} from "@angular/animations";
import {horizontalBounce} from "../../../../shared/utils/animations";

export const loadCommandmentsAnimation =
  trigger('commandmentsAnimationTrigger', [
      transition('void => *', horizontalBounce('.commandment__item')),
    ],
  )
