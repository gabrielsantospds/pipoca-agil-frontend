import { Component, OnInit } from '@angular/core';
import { Register } from '../../../register';
import { RequestsService } from '../../../services/requests.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidatorService } from '../../../services/validator.service';
import { throwIfEmpty } from 'rxjs';
import { ShareService } from 'src/app/services/share.service';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  accountDetails!: FormGroup
  hide = true
  hideConfirm = true

  register: Register

  constructor(
    private requestService: RequestsService,
    private validatorService: ValidatorService,
    private dialogService: DialogService,
    private fb: FormBuilder,
  ) {
    this.register = new Register()
  }

  validationMessages = this.validatorService.validationMessages

  ngOnInit(): void {
    this.createForm()
    this.accountDetails.controls['password'].valueChanges.subscribe((newValue) => {
      this.validatorService.passwordUpdate = newValue
    })
  }

  createForm() {
    this.accountDetails = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
      birthDate: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      keyWord: new FormControl('')
    })
  }

  // validarNumero() {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const valor = control.value;
  //     const numerosApenas = valor.replace(/[^0-9]/, '');

  //     control.setValue(numerosApenas, { emitEvent: false });

  //     return null;
  //   }

  // }

  blockLetters(event: KeyboardEvent) {
    const regex = /[0-9\/]/;

    if (event.key === 'Backspace' || event.key === 'Tab') {
      return;
    }

    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  inputTouched() {
    this.setValidation()
  }

  setValidation() {
    if (!this.accountDetails.get('name')?.hasValidator(Validators.required)) {
      this.accountDetails.get('name')?.addValidators(
        [
          Validators.required,
          this.validatorService.spaceValidator(),
          this.validatorService.characterValidator()
        ]
      )
      this.accountDetails.get('email')?.addValidators(
        [
          Validators.required,
          Validators.email
        ]
      )
      this.accountDetails.get('birthDate')?.addValidators(
        [
          Validators.required,
          this.validatorService.formatValidator(),
          this.validatorService.ageValidator(18)
        ]
      )
      this.accountDetails.get('password')?.addValidators(
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      )
      this.accountDetails.get('confirmPassword')?.addValidators(
        [
          Validators.required,
          this.validatorService.equalValidator()
        ]
      )
      this.accountDetails.get('keyWord')?.addValidators(
        [
          Validators.required
        ]
      )
    }
  }

  updateValidity() {
    this.accountDetails.get('name')?.updateValueAndValidity()
    this.accountDetails.get('email')?.updateValueAndValidity()
    this.accountDetails.get('birthDate')?.updateValueAndValidity()
    this.accountDetails.get('password')?.updateValueAndValidity()
    this.accountDetails.get('confirmPassword')?.updateValueAndValidity()
    this.accountDetails.get('keyWord')?.updateValueAndValidity()

    this.accountDetails.get('name')?.markAsDirty()
    this.accountDetails.get('email')?.markAsDirty()
    this.accountDetails.get('birthDate')?.markAsDirty()
    this.accountDetails.get('password')?.markAsDirty()
    this.accountDetails.get('confirmPassword')?.markAsDirty()
    this.accountDetails.get('keyWord')?.markAsDirty()
  }

  send() {
    let ret
    this.register = {
      name: this.accountDetails.value.name,
      email: this.accountDetails.value.email,
      password: this.accountDetails.value.password,
      birthDate: this.accountDetails.value.birthDate,
      favoriteWordPhrase: this.accountDetails.value.keyWord
    }

    this.setValidation()
    this.updateValidity()
    if (this.accountDetails.valid) {
      this.requestService.post<Register>(this.register, 'user/signup', false).subscribe(
        {
          next: (data) => {
            this.dialogService.openDialog(true, this.register.email!, this.register.password!)
          },
          error: (error) => {
            this.dialogService.successMessage = false
            this.dialogService.openDialog(false, this.register.email!, this.register.password!)
          }
        }
      )
    }
  }

  checked = false
}
