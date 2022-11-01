export type TServerEntityId = number;

export type TDataState<T> = {
  data: T;
  isLoading: false;
  hasError: false;
} | {
  data: null;
  isLoading: false;
  hasError: true;
} | {
  data: null;
  isLoading: true;
  hasError: false;
};
