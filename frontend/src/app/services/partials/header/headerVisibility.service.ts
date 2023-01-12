import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderVisibilityService {
  private status: Subject<boolean> = new BehaviorSubject<boolean>(false);
  currentStatus = this.status.asObservable()

  constructor() {
  }

  changeStatus(data: boolean) {
    this.status.next(data)
  }

  getData(): Observable<boolean> {
    return this.currentStatus
  }

}
