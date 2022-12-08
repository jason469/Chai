import {animate, group, query, style, transition, trigger} from '@angular/animations'

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: "100%",
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        })
      ], {
        optional: true
      }),
      query(':enter', [
        animate('600ms ease',
          style({
            opacity: 1,
            transform: 'scale(1)'
          })
        )
      ], {
        optional: true
      })
    ])
  ])

// export const slider = trigger('routeAnimations', [
//   // Transition between any two states
//   transition('* <=> *', [
//     // Events to apply
//     // Defined style and animation function to apply
//     // Config object with optional set to true to handle when element not yet added to the DOM
//     query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
//     // group block executes in parallel
//     group([
//       query(':enter', [
//         style({ transform: 'translateX(100%)' }),
//         animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
//       ], { optional: true }),
//       query(':leave', [
//         style({ transform: 'translateX(0%)' }),
//         animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
//       ], { optional: true })
//     ])
//   ])
// ]);

export const slider =
  trigger('routeAnimations', [
    transition('* => isLeft', slideTo('left')),
    transition('* => isRight', slideTo('right')),
    transition('isRight => *', slideTo('left')),
    transition('isLeft => *', slideTo('right')),
  ])

function slideTo(direction: string) {
  const optional = {
    optional: true
  }
  console.log(direction)

  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        [direction]: 0,
        width: '100%',
      })
    ], optional),
    query(':enter', [
      style({
        [direction]: '-100%',
      })
    ]),
    group([
      query(':leave', [
        animate('600ms ease',
          style({
            [direction]: '100%'
          }))
      ], optional),
      query(':enter', [
        animate('600ms ease',
          style({
            [direction]: '0%'
          }))
      ])
    ])
  ]
}
