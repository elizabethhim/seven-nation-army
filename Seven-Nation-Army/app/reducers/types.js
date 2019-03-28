import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type chatStateType = {
  +chatIsVisible: boolean
};

export type Action = {
  +type: string
};

export type GetState = () => chatStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
