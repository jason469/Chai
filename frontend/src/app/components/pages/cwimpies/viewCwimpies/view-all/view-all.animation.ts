import {animate, keyframes, style, transition, trigger} from "@angular/animations";

export const listAnimation =
  trigger('listAnimationTrigger', [
    transition('* => void', fadeUp()),
  ])

// export const tabAnimation =
//   trigger('tabAnimationTrigger', [
//     transition('void => *', fadeIn()),
//     transition('* => void', fadeOut()),
//   ])


function fadeUp() {
  return [
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
  ]
}
