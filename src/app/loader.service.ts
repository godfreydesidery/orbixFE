import { Injectable } from '@angular/core';
import * as globalAction from './global.action';
import * as fromRoot from './index';
import { Store } from '@ngrx/store';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(
    public store: Store<fromRoot.AppState>
  ) {}
  show() {
    this.store.dispatch(new globalAction.ShowSpinner());
  }
  hide() {
    this.store.dispatch(new globalAction.HideSpinner());
  }




  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    display(value: boolean) {
    this.status.next(value);
}

}