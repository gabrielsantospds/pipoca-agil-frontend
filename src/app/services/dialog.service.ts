import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogChangesComponent } from '../template/dialog-changes/dialog-changes.component';
import { DialogConfirmComponent } from '../template/dialog-confirm/dialog-confirm.component';
import { DialogAnimationComponent } from '../template/dialog-animation/dialog-animation.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  successMessage: boolean = true

  constructor(private dialog: MatDialog, private dialogTest: Dialog) { }

  openDialog(successMessage: boolean, email: string, password: string) {
    this.dialogTest.open(DialogAnimationComponent, {
      panelClass: 'test',
      width: '494px',
      height: '314px',
      data: {
        successMessage: successMessage,
        email: email,
        password: password
      }
    })
  }

  openChangesDialog() {
    this.dialogTest.open(DialogChangesComponent, {
      panelClass: 'test',
      width: '625px',
      height: '374px'
    })
  }

  openConfirmDialog(message: string, path: string) {
    this.dialogTest.open(DialogConfirmComponent, {
      panelClass: 'test',
      width: '625px',
      height: '374px',
      data: {
        message: message,
        path: path
      }
    })
  }


}
