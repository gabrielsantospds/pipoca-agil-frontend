import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Register } from 'src/app/register';
import { RequestsService } from 'src/app/services/requests.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-dialog-animation',
  templateUrl: './dialog-animation.component.html',
  styleUrls: ['./dialog-animation.component.css']
})
export class DialogAnimationComponent implements OnDestroy {

  register: Register
  successMessage = this.data.successMessage
  private readonly authenticationKey = 'auth';
  private readonly subKey = 'sub';

  constructor(
    public dialogRef: DialogRef<DialogAnimationComponent>,
    private validator: ValidatorService,
    @Inject(DIALOG_DATA) public data: any,
    private requests: RequestsService,
    private router: Router
    ) {
      this.register = new Register()
  }

  ngOnDestroy(): void {
      if (this.successMessage) {
        let auth
      let sub
      this.register = {
        email: this.data.email,
        password: this.data.password
      }
      this.requests.post<Register>(this.register, "auth/login", false).subscribe({
        next: (data: any) => {
          auth = data.token
          sub = data.sub
          sessionStorage.setItem(this.authenticationKey, auth)
          sessionStorage.setItem(this.subKey, sub)
          this.router.navigate(['user-data/view'])
        },
        error: (err) => {

        }
      })
      }
  }

  close() {
    this.dialogRef.close()
  }
}
