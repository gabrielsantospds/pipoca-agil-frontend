import { DialogService } from './../../../services/dialog.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Register } from 'src/app/register';
import { RequestsService } from 'src/app/services/requests.service';
import { ShareService } from 'src/app/services/share.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {

  hide = true
  hideConfirm = true
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

  validationMessages = this.validatorService.validationMessages

  ngOnInit(): void {
    this.createForm()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createForm() {
    this.accountDetails = this.fb.group({
      password: new FormControl(''),
      newPassword: new FormControl('')
    })
  }

  deleteAccount() {
    this.dialogService.openChangesDialog()
  }

  navigate() {
    this.router.navigate(['user-data/update'])
  }

  inputTouched() {
    this.setValidation()
  }

  setValidation() {
    if (!this.accountDetails.get('password')?.hasValidator(Validators.required)) {
      this.accountDetails.get('password')?.addValidators(
        [Validators.required]
      )
      this.accountDetails.get('newPassword')?.addValidators(
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      )
    }
  }

  updateValidity() {
    this.accountDetails.get('password')?.updateValueAndValidity()
    this.accountDetails.get('newPassword')?.updateValueAndValidity()
    this.accountDetails.get('password')?.markAsDirty()
    this.accountDetails.get('newPassword')?.markAsDirty()
  }

  save() {
    this.setValidation()
    this.updateValidity()
    if (this.accountDetails.valid) {
      console.log("Save button activated")
    }
  }
}
