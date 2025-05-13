import { trigger, transition, animate, keyframes, style } from '@angular/animations';

export const allAnimations = [
  trigger('numberChange', [
    transition(':increment', [
      animate('0.5s ease-in-out', keyframes([
        style({ opacity: 0, transform: 'translateY(-20%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
      ]))
    ]),
    transition(':decrement', [
      animate('0.5s ease-in-out', keyframes([
        style({ opacity: 0, transform: 'translateY(20%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
      ]))
    ])
  ])
];