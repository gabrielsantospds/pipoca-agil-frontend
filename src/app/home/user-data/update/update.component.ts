import { DialogService } from './../../../services/dialog.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Register } from 'src/app/register';
import { RequestsService } from 'src/app/services/requests.service';
import { ShareService } from 'src/app/services/share.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, OnDestroy {

  register: Register
  private subscription: Subscription | undefined;
  accountDetails!: FormGroup
  loadedData = false

  constructor(
    private requests: RequestsService,
    private shareService: ShareService,
    private validatorService: ValidatorService,
    private dialogService: DialogService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.register = new Register()
  }

  ngOnInit(): void {
    this.createForm()
    let auth!: string
    let sub!: string
    auth = sessionStorage.getItem("auth")!
    sub = sessionStorage.getItem("sub")!
    this.requests.get<Register>(auth, sub).subscribe({
      next: (data) => {
        this.accountDetails.setValue({
          name: data.name,
          email: data.email,
          birthDate: data.birthDate
        })
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

  createForm() {
    this.accountDetails = this.fb.group({
      name: new FormControl(' ', [
        Validators.required,
        this.validatorService.spaceValidator(),
        this.validatorService.characterValidator()
      ]),
      email: new FormControl(' ', [
        Validators.required,
        Validators.email
      ]),
      birthDate: new FormControl(' ', [
        Validators.required,
        this.validatorService.formatValidator(),
        this.validatorService.ageValidator(18)
      ])
    })
  }

  validationMessages = this.validatorService.validationMessages

  deleteAccount() {
    this.dialogService.openChangesDialog()
  }

  navigate() {
    this.router.navigate(['user-data/update-password'])
  }

  save() {
    if(this.accountDetails.valid) {
      console.log("Save button activated")
    }
  }
}
