import { trigger, transition, style, query, group, animate } from '@angular/animations';

// Route transition animations for entering and leaving content
export const routeTransitionAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0
      })
    ], { optional: true }),

    group([
      // Animating the leaving element: Fade out and slide upwards
      query(':leave', [
        animate('500ms ease-out', style({
          opacity: 0,
          transform: 'translateY(-30px)' // Slide upwards when leaving
        }))
      ], { optional: true }),

      // Animating the entering element: Fade in and slide in from below
      query(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(30px)' // Start from below
        }),
        animate('500ms ease-in', style({
          opacity: 1,
          transform: 'translateY(0)'  // Final position
        }))
      ], { optional: true })
    ])
  ])
]);
