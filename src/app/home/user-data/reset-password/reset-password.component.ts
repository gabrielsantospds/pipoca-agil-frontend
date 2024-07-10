import { ValidateToken } from './../../../register';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';
import { ShareService } from 'src/app/services/share.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  formDetails!: FormGroup

  validateToken: ValidateToken

  constructor(
    private validatorService: ValidatorService,
    private fb: FormBuilder,
    private router: Router,
    private requestService: RequestsService,
    private shareService: ShareService
  ) {
    this.validateToken = new ValidateToken()
  }

  validationMessages = this.validatorService.validationMessages

  ngOnInit(): void {
    this.createForm()

  }

  createForm() {
    this.formDetails = this.fb.group({
      dataType: new FormControl(''),
      value: new FormControl('')
    })
  }

  inputTouched() {
    this.setValidation()
  }

  setValidation() {
    if(!this.formDetails.get('value')?.hasValidator(Validators.required)) {
      this.formDetails.get('value')?.addValidators(
        Validators.required
      )
    }
  }

  updateValidity() {
    this.formDetails.get('value')?.updateValueAndValidity()
    this.formDetails.get('value')?.markAsDirty()
  }

  send() {
    this.setValidation()
    this.updateValidity()
    if(this.formDetails.valid) {
      this.validateToken = {
        token: this.formDetails.value.value
      }
      this.requestService.post<ValidateToken>(this.validateToken, 'user/confirm-pass', false).subscribe({
        next: () => {
          this.shareService.requestToken('token', this.formDetails.value.value)
          this.router.navigate(['reset-password'])
        },
        error: () => {

        }
      })
    }
  }

  navigateBack() {
    this.router.navigate(['forget-password'])
  }
}