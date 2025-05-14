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
  ]),
  trigger('heightAnimation', [
    transition(':enter', [
      style({ height: '0px', opacity: 0 }),
      animate('250ms ease-out', style({ height: '*', opacity: 1 }))
    ]),
    transition(':leave', [
      animate('150ms ease-out', style({ height: '0px', opacity: 0 }))
    ])
  ]),
  trigger('heightWidthAnimation', [
    transition(':enter', [
      style({ height: '0px', width: '0px', opacity: 0 }),
      animate('250ms ease-out', style({ height: '*', width: '*', opacity: 1 }))
    ]),
    transition(':leave', [
      animate('150ms ease-out', style({ height: '0px', width: '0px', opacity: 0 }))
    ])
  ]),
  trigger('fadeInAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms ease-in', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      animate('200ms ease-out', style({ opacity: 0 }))
    ])
  ]),
]