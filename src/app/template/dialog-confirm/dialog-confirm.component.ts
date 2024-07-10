import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnDestroy {

  constructor(
    private dialogRef: DialogRef<DialogConfirmComponent>,
    private router: Router,
    @Inject(DIALOG_DATA) public data: any
  ) { }

  message = this.data.message

  close() {
    this.dialogRef.close()
  }

  ngOnDestroy(): void {
      this.router.navigate([this.data.path])
  }
}
