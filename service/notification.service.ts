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

    let css: string = ""
    switch (servility) {
      case AlertServility.INFO: {
        css = "app-notification-info"
        break;
      }
      case AlertServility.SUCCESS: {
        css = "app-notification-success"
        break;
      }
      case AlertServility.ERROR: {
        css = "app-notification-error"
        break;
      }
    }

    return this._snackBar.open(message, undefined, {
      panelClass: css,
      duration: 2000
    });
  }
}

export enum AlertServility {
  INFO,
  SUCCESS,
  ERROR
}
