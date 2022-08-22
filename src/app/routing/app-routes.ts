export interface AppRoute {
  path: string;
  data: {
    label: string;
  };
}

export const ROUTES: AppRoute[] = [
  {
    path: '',
    data: {
      label: 'Home',
    },
  },
  {
    path: 'wallet',
    data: {
      label: 'Wallet',
    },
  },
];
