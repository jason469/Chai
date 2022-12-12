import {animate, group, query, style, transition, trigger} from "@angular/animations";
import {optional} from "./shared/constants/animations";

export const routeAnimation =
  trigger('routeAnimationTrigger', [
    transition('* <=> *', fadePage()),
  ])

function fadePage() {
  return [
    style({  // The entering and leaving components need a relative position to work (but should only apply in the context of the animation)
      position: 'relative',
    }),
    query(':enter, :leave', [ // Preparing component for transfer by removing the components first
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      })
    ], optional),

    group([  // Group the entering the leaving animations to happen at the same time (in parallel)

      query(':leave', [  // Fade out the leaving component
        animate('200ms', style({
          opacity: 0,
        }))
      ], optional),

      query(':enter', [  // Fade in the entering component
        style({  // Start by hiding the entering component
          opacity: 0,
        }),
        animate('300ms', style({
          opacity: 1
        }))
      ], optional)
    ])
  ]
}
