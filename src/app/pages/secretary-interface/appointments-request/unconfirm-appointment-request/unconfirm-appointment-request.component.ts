import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-unconfirm-appointment-request',
  templateUrl: './unconfirm-appointment-request.component.html',
  styleUrls: ['./unconfirm-appointment-request.component.scss']
})
export class UnconfirmAppointmentRequestComponent implements OnInit {

   title: string;
  message: string;

  constructor(
    private dialogRef: MatDialogRef<UnconfirmAppointmentRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {}

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 */
export class ConfirmDialogModel {
  constructor(public title: string, public message: string) {}
}


