//import { assign } from '@utils/reducer';
import {
  GlobalActionTypes,
  GlobalActionsUnion
} from './global.action';

export interface State {
  spinnerCounter: number;
}

const initialState: State = {
  spinnerCounter: 0
};

export function reducer(
  state: State = initialState,
  action: GlobalActionsUnion
): State {
  switch (action.type) {
    case GlobalActionTypes.ShowSpinner: {
      return {
        spinnerCounter: state.spinnerCounter + 1
      };
    }
    case GlobalActionTypes.HideSpinner: {
      return {
        spinnerCounter: state.spinnerCounter > 0 ? state.spinnerCounter - 1 : 0
      };
    }
    default:
      return state;
  }
}

export const getSpinnerCounter = (state: State) => state.spinnerCounter;