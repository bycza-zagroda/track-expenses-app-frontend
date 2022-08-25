import {
  trigger,
  transition,
  style,
  query,
  animate,
} from '@angular/animations';

export const routerFade = trigger('routeAnimations', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0, position: 'absolute' })], {
      optional: true,
    }),
    query(
      ':leave',
      [
        style({ opacity: 1 }),
        animate('0.1s', style({ opacity: 0, position: 'absolute' })),
      ],
      { optional: true },
    ),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('0.2s', style({ opacity: 1, position: 'relative' })),
      ],
      { optional: true },
    ),
  ]),
]);
