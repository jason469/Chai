import {animate, state, style, transition, trigger} from "@angular/animations";

export const clickCommandmentsAnimation =
  trigger('toggleClick', handleClick())


function handleClick() {
  return [
    state('true', style({      // final CSS following animation
      color: `#02774e`
    })),
    state('false', style({
    })),
    transition('true => false', animate('250ms linear')),  // animation timing
    transition('false => true', animate('250ms linear'))
  ]
}
