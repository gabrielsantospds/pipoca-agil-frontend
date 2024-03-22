import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-dialog-animation',
  templateUrl: './dialog-animation.component.html',
  styleUrls: ['./dialog-animation.component.css']
})
export class DialogAnimationComponent {

  constructor(public dialogRef: MatDialogRef<DialogAnimationComponent>,
    private validator: ValidatorService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  successMessage = this.validator.successMessage
}
