import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(
    private _snackBar: MatSnackBar) {
  }

  error(message: string = "An error happened") {
    return this._snackBar.open(message, undefined, {
      panelClass: ['snackbar-error'],
      duration: 2000
    });
  }

  success(message: string | undefined) {
    return this._snackBar.open("deleting \"" + message + "2\" was successful!", undefined, {
      panelClass: ['snackbar-success'],
      duration: 2000
    });
  }

  info(message: string) {
    return this._snackBar.open(message, undefined, {
      panelClass: ['snackbar-info'],
      duration: 2000
    });
  }
}
