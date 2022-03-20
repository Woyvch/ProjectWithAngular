import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { UserForRegistration } from 'src/app/interfaces/userForRegistration';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  // create a new FormGroup object
  public registerForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    //  populate the registrationform with all the FormControls
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }
  // Validation of the input fields
  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName)
  }

  public registerUser = (registerFormValue: any) => {
    this.showError = false;
    // extract the user’s data
    const formValues = { ...registerFormValue };
    // create the user object
    const user: UserForRegistration = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm,
    };
    // call the registerUser function from the Authentication service
    this.authService.registerUser("api/accounts/registration", user)
    .subscribe(_ => {
      //console.log("Successful registration");
      this.router.navigate(["/authentication/login"]);
    },
    error => {
      // show the errors from the API’s response
      this.errorMessage = error;
      this.showError = true;
    })
  }

}
