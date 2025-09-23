import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartPanelService {
  private openSubject = new BehaviorSubject<boolean>(false);

  readonly isOpen$ = this.openSubject.asObservable();

  open() { this.openSubject.next(true); }
  close() { this.openSubject.next(false); }
  toggle() { this.openSubject.next(!this.openSubject.value); }

}
