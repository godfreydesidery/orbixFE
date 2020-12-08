import { Action } from '@ngrx/store';

export enum GlobalActionTypes {
  ShowSpinner = '[Global] showSpinner',
  HideSpinner = '[Global] HideSpinner',
}

export class ShowSpinner implements Action {
  readonly type = GlobalActionTypes.ShowSpinner;
  constructor() {}
}
export class HideSpinner implements Action {
  readonly type = GlobalActionTypes.HideSpinner;
  constructor() {}
}

export type GlobalActionsUnion =
  ShowSpinner
  | HideSpinner
;