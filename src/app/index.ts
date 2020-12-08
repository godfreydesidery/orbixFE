import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
  } from '@ngrx/store';
  import { environment } from '../environments/environment';
  import { storeFreeze } from 'ngrx-store-freeze';
  import * as fromGlobal from './global.reducer';
  
  export interface AppState {
    global: fromGlobal.State;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    //user: fromUser.reducer,
    global: fromGlobal.reducer
  };
  
  // console.log all actions
  export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function (state: AppState, action: any): AppState {
      return reducer(state, action);
    };
  }
  
  export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger, storeFreeze]
    : [];
  
  
  // GLOBAL REDUCER
  export const getSpinnerCounter = createSelector(null, fromGlobal.getSpinnerCounter);  //modified ..getGlobalState replaced by null