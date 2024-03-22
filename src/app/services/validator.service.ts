import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationComponent } from '../template/dialog-animation/dialog-animation.component';
import { DialogChangesComponent } from '../template/dialog-changes/dialog-changes.component';
import { DialogConfirmComponent } from '../template/dialog-confirm/dialog-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  successMessage: boolean = true

  constructor(private dialog: MatDialog) { }

  validatorMessage(type: string) {
    let time = "100ms"
      this.openDialog(time, time)
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DialogAnimationComponent, {
      width: '494px',
      enterAnimationDuration,
      exitAnimationDuration,
      autoFocus: false,
    })
  }

  openChangesDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DialogChangesComponent, {
      width: '625px',
      enterAnimationDuration,
      exitAnimationDuration,
      autoFocus: false
    })
  }

  openConfirmDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DialogConfirmComponent, {
      width: '625px',
      height: '374px',
      enterAnimationDuration,
      exitAnimationDuration,
      autoFocus: false
    })
  }
}
