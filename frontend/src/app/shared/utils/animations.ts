import {animate, keyframes, query, stagger, style} from "@angular/animations";
import {optional} from "../constants/animations";

export function verticalBounceIn() {
  return [
    style({  // The entering and leaving components need a relative position to work (but should only apply in the context of the animation)
      position: 'relative',
    }),

    query(':enter',  // Hide the entering component
      style({
        opacity: 0,
      }), optional
    ),

    query(':enter',  // Add in the component
      stagger('300ms', [
        animate('500ms ease-in', keyframes([
          style({
            opacity: 0,
            transform: 'translateY(-75px)',
            offset: 0,
            display: 'block',
          }),
          style({
            opacity: 0.5,
            transform: 'translateY(35px)',
            offset: 0.3
          }),
          style({
            opacity: 1,
            transform: 'translateY(0px)',
            offset: 1
          }),
        ]))
      ]),
      optional,
    ),
  ]
}

export function verticalBounceOut() {
  return [
    query(':leave',
      stagger('300ms', [
        animate('500ms ease-in', keyframes([
          style({
            opacity: 1,
            transform: 'translateY(0)',
            offset: 0
          }),
          style({
            opacity: 0.5,
            transform: 'translateY(35px)',
            offset: 0.3
          }),
          style({
            opacity: 0,
            transform: 'translateY(-75px)',
            offset: 1
          }),
        ]))
      ]),
      optional,
    ),
  ]
}

export function verticalBounceInAndOut() {
  return verticalBounceIn().concat(verticalBounceOut())
}

export function horizontalBounce(selector:string) {
  return [
    query(selector, style({
      opacity: 0,
      transform: 'translateX(-40px)'
    })),

    query(selector,
      stagger('300ms', [
        animate('400ms 500ms ease-out',
          style({
            opacity: 1,
            transform: 'translateX(0)'
          }))
      ])
    )
  ]
}
