import { animate, group, query, style, transition, trigger } from '@angular/animations';


export const displayPipelineChartBannerTrigger = trigger('displayPipelineChartBannerState' , [
  transition(':enter' , [
    style({ transform : 'scale(0.8)' , opacity: 0 }),
    animate('0.5s 2s ease-in-out' , style({
      transform : 'scale(1.1)',
      opacity: 1
    })),

    animate('0.1s ease-out' , style({
      transform : 'scale(1)',
    })),
  ]),
])



export const projectInfoPopupTrigger = trigger('projectInfoPopupState' , [
  transition(':enter' , [
    style({ transform : 'scale(0.8)' , opacity : 0.5 }),
    animate('0.5s ease-in-out' , style({
      transform : 'scale(1.05)',
      opacity : 1,
    })),
    animate('0.1s ease-out' , style({
      transform : 'scale(1)',
    })),
  ]),
])



export const firstViewTrigger = trigger('firstViewState' , [
  transition(':enter' , [
    style({ opacity : 0 }),
    animate('1s ease-out' , style({
      opacity : 1,
    })),
  ]),
])





export const groupsPanelTrigger = trigger('groupsPanelState' , [
  transition(':enter' , [
    // transform: translate(-90%, 0%);
    style({ transform : 'translate(-120%, 0%)'  }),
    animate('1s 1s ease-in-out' , style({
      transform : 'translate(-80%, 0%)',
    })),
    animate('.2s' , style({
      transform : 'translate(-90%, 0%)',
    })),
  ]),
])



export const cardsViewTrigger = trigger('cardsViewState' , [
  transition(':enter' , [
    style({ transform : 'translateX(100%)' }),
    animate('2s' , style({
      transform : 'translateX(0%)',
    })),
  ]), // transition


  // transition('* => void' , [
  //   style({ transform : 'translateX(0%)' }),
  //   animate('2s' , style({
  //     transform : 'translateX(-100%)'
  //   }))
  // ]),
  //
  transition(':leave' , [
    animate('2s' , style({
      transform : 'translateX(-100%)',
    })),
  ]),


])



// export const listViewTrigger = trigger('listViewState' , [
//   transition(':enter' , [
//     style({ opacity : 0 }),
//     animate('0.1s 3s ease-in-out' , style({
//       transform : 'translateX(100%)',
//       opacity : 1,
//     })),
//     animate('1s ease-in-out' , style({
//       transform : 'translateX(0%)',
//     })),
//   ]),
//
//
//   transition(':leave' , [
//     style({ transform : 'translateX(0%)' }),
//     animate('1s ease-in-out' , style({
//       transform : 'translateX(-100%)',
//     })),
//   ]),
//
// ])





export const viewTypeRouteTransitionAnimations = trigger('viewTypeRouteTransitionTrigger', [
  transition('* => *', [
    query(':enter', [ style({ opacity: 0 , transform : 'scale(1)' }) ] , { optional: true }),
    query(':enter', [
      animate('.5s  ease-out', style({  opacity: 0.5 , transform : 'scale(1.02)' })),
      animate('.2s ease-out', style({  opacity: 1 , transform : 'scale(1)' })),
    ] , { optional: true }),
  ])
]);




export const mainRouteTransitionAnimations = trigger('mainRouteTransitionTrigger', [
  transition('groupsView => projectsView', [
    style({ position: 'relative' }),
    query(':enter , :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
      }),
    ] ,  { optional: true }),
    // query(':enter', [style({ right: '-100%', opacity: 0 })]),
    query(':enter', [style({ right: '-100%', opacity: 1 })] , { optional: true }),
    // query(':leave', animateChild()),
    group([
      // query(':leave', [animate('4s ease-out', style({ right: '100%', opacity: 0 }))]),
      query(':leave', [animate('4s ease-out', style({ right: '100%', opacity: 1 }))] , { optional: true } ),
      query(':enter', [animate('4s ease-out', style({ right: '0%', opacity: 1 }))] , { optional: true } ),
    ]),
    // query(':enter', animateChild())
  ]),

  transition('projectsView => groupsView', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%', opacity: 1 })]),
    // query(':enter', [style({ left: '-100%', opacity: 0 })]),
    // query(':leave', animateChild()),
    group([
      // query(':leave', [animate('4s ease-out', style({ left: '100%', opacity: 0 }))]),
      query(':leave', [animate('4s ease-out', style({ left: '100%', opacity: 1 }))]),
      query(':enter', [animate('4s ease-out', style({ left: '0%', opacity: 1 }))]),
    ]),
    // query(':enter', animateChild())
  ]),
]);






