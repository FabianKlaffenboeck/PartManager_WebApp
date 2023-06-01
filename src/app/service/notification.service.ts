import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(
    private _snackBar: MatSnackBar) {
  }

  snackbar(servility: AlertServility, message: string = "") {
    return this._snackBar.open(message, undefined, {
      duration: 2000
    });
  }
}

export enum AlertServility {
  OKAY,
  ERROR,
  INFO
}
