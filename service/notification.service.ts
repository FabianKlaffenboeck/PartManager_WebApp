import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor() {
  }

}

export enum AlertServility {
  INFO,
  SUCCESS,
  ERROR
}
