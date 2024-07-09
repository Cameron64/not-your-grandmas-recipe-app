import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Confirmation } from '../models/confirmation';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  _dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  
constructor(dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Confirmation) {
  this._dialogRef = dialogRef;
}

  confirm() {
    this._dialogRef.close(true);
  }


}
