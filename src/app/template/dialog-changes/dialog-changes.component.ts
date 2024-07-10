import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { RequestsService } from 'src/app/services/requests.service';
import { ShareService } from 'src/app/services/share.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-dialog-changes',
  templateUrl: './dialog-changes.component.html',
  styleUrls: ['./dialog-changes.component.css']
})
export class DialogChangesComponent {

  auth!: string
  sub!: string

  constructor(
    private requests: RequestsService,
    private shareService: ShareService,
    private validatorService: ValidatorService,
    private dialogService: DialogService,
    public dialogRef: DialogRef<DialogChangesComponent>
  ) { }

  ngOnInit(): void {
    this.auth = sessionStorage.getItem("auth")!
    this.sub = sessionStorage.getItem("sub")!
  }

  deleteAccount() {
    this.requests.delete(this.sub, this.auth, "disable").subscribe({
      next: (data) => {
        this.dialogRef.close()
        this.dialogService.openConfirmDialog("Conta excluída com sucesso!", "home")
        sessionStorage.clear()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  close() {
    this.dialogRef.close()
  }
  
}
