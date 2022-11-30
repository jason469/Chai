import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateCwimpieCardService {
  private updateCwimpieName: Subject<string> = new BehaviorSubject<string>("");
  private currentState = this.updateCwimpieName.asObservable()

  constructor() {
  }

  changeState(state: string) {
    this.updateCwimpieName.next(state)
  }

  getState(): Observable<string> {
    return this.currentState
  }

}
