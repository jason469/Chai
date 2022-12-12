import {animate, state, style, transition, trigger} from "@angular/animations";

export const clickCommandmentsAnimation =
  trigger('toggleClick', handleClick())


function handleClick() {
  return [
    state('true', style({      // final CSS following animation
      backgroundColor: `#A6ECA8`
    })),
    state('false', style({
    })),
    transition('true => false', animate('1000ms linear')),  // animation timing
    transition('false => true', animate('1000ms linear'))
  ]
}
