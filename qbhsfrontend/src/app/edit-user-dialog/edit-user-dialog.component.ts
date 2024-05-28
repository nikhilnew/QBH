import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: [data.user.name, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
      phoneNumber: [data.user.phoneNumber, Validators.required],
      address: [data.user.address, Validators.required]
    });
  }

  save() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
