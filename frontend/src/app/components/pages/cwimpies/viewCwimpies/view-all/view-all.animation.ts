import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";

export const listAnimation =
  trigger('listAnimationTrigger', [
    transition('* => *', fadeIn()),
  ])

function fadeIn() {
  const optional = {
    optional: true
  }

  return [
    query(':enter',
      style({
        opacity: 0,
      }),
      optional
    ),

    query(':enter',
      stagger('150ms', [
        animate('0.5s ease-in', keyframes([
          style({
            opacity: 0,
            transform: 'translateY(-75px)',
            offset: 0
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

    query(':leave',
      stagger('150ms', [
        animate('0.5s ease-in', keyframes([
          style({
            opacity: 1,
            transform: 'translateY(0)',
            offset: 0
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

    // query('.reduced-cwimpie-card',
    //   animate(100,
    //     style({
    //       opacity: 1,
    //       transform: 'translateX(0px)',
    //     }),
    //   ),
    // ),
  ]
}
