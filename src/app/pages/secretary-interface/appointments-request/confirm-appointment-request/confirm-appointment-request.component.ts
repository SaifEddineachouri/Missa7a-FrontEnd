import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-appointment-request',
  templateUrl: './confirm-appointment-request.component.html',
  styleUrls: ['./confirm-appointment-request.component.scss']
})
export class ConfirmAppointmentRequestComponent implements OnInit {

  title: string;
  message: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmAppointmentRequestComponent>,
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

