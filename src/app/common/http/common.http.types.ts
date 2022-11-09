export type TServerEntityId = number;

export type TDataState<T> = {
  data: T;
  isLoading: false;
  hasError: false;
  nowEditWallet: number;
} | {
  data: null;
  isLoading: false;
  hasError: true;
  nowEditWallet: number;
} | {
  data: null;
  isLoading: true;
  hasError: false;
  nowEditWallet: number;
};
