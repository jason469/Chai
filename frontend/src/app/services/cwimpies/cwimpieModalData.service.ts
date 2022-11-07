import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {
  IColour,
  ICwimpieCardData,
  IFavourite,
  IHobby,
  IProfession,
  ISpecies, IUser
} from "../../shared/interfaces/ICwimpieCardData";

@Injectable({
  providedIn: 'root'
})
export class CwimpieModalDataService {
  private data: Subject<ICwimpieCardData> = new BehaviorSubject<ICwimpieCardData>(new ICwimpieCardData());
  currentData = this.data.asObservable()

  constructor() {
  }

  changeData(data: ICwimpieCardData) {
    this.data.next(data)
  }

  getData(): Observable<any> {
    return this.currentData
  }

}
