import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Register } from 'src/app/register';
import { DialogService } from 'src/app/services/dialog.service';
import { RequestsService } from 'src/app/services/requests.service';
import { ShareService } from 'src/app/services/share.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit, OnDestroy {

  register: Register
  private subscription: Subscription | undefined;

  loadedData = false

  constructor(
    private requests: RequestsService,
    private shareService: ShareService,
    private validatorService: ValidatorService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.register = new Register()
  }

  ngOnInit(): void {
    let auth!: string
    let sub!: string
    auth = sessionStorage.getItem("auth")!
    sub = sessionStorage.getItem("sub")!
    let response = this.requests.get<Register>(auth, sub).subscribe({
      next: (data) => {
        this.register = {
          name: data.name,
          email: data.email,
          birthDate: data.birthDate,
          password: "******"
        }
        this.loadedData = true
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateAccount() {
    this.router.navigate(['user-data/update'])
  }

  deleteAccount() {
    this.dialogService.openChangesDialog()
  }
}
