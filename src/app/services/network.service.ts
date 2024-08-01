import { Injectable } from '@angular/core'
import { BehaviorSubject, fromEvent, merge, of } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private onlineSubject: BehaviorSubject<boolean>
  public online$

  constructor() {
    const isOnline = typeof window !== 'undefined' ? navigator.onLine : true
    this.onlineSubject = new BehaviorSubject<boolean>(isOnline)
    this.online$ = this.onlineSubject.asObservable()

    if (typeof window !== 'undefined') {
      merge(
        of(navigator.onLine),
        fromEvent(window, 'online').pipe(map(() => true)),
        fromEvent(window, 'offline').pipe(map(() => false))
      ).subscribe(this.onlineSubject)
    }
  }
}
