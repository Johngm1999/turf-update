import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    registerForm!:FormGroup;
    showSuccessMessage:number=0;
    showError:boolean=false;

    constructor(private fb: FormBuilder, private router: Router, private userService:UserService) { }

    ngOnInit() {
      this.registerForm = this.fb.group({
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        email: [null, [Validators.required,Validators.email,this.doubleComValidator()]],
        phone: [null, [Validators.required,this.phoneValidator]],
        password: ['', Validators.required],
      });

      this.registerForm.addControl('confirmPassword', this.fb.control('', Validators.required)); //since its not a field of for group, its done like this
      this.registerForm.get('confirmPassword')?.setValidators(this.passwordMatchValidator.bind(this));
    }

    phoneValidator(control: AbstractControl): { [key: string]: any } | null {
      const phonePattern = /^\d{10}$/;
      if (control.value && !phonePattern.test(control.value)) {
        return { 'invalidPhone': true };
      }
      return null;
    }

    doubleComValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const email = control.value;
        
        if (!email) {
          // Return null if the value is null or undefined
          return null;
        }
        
        // Regular expression with a lookahead assertion
        const pattern = /^.*@.*\..*$/i;
        
        if (pattern.test(email)) {
          // Valid Gmail address with no characters after '.com'
          return null;
        } else {
          // Invalid Gmail address with characters after '.com'
          return { 'invalidDoubleCom': true };
        }
      };
    }

    passwordMatchValidator(control: AbstractControl) {
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = control.value;
  
      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      } else {
        return null;
      }
    }
    onSubmit() {
      if (this.registerForm.valid) {
        const formData = this.registerForm.value;
        this.userService.createUser(formData)
          .subscribe(
            (response:any) => {
              console.log(response);
              if (response.success==true) {
                  this.showSuccessMessage=1
                  setTimeout(() => {
                    this.showSuccessMessage = 0;
                    console.log("s")
                    this.router.navigate(['/login']); // Navigate to login page
                  }, 1000);
                  // console.log(response)
                  
              }
            },
            (error: any) => {
              alert('Error creating User');
              // Handle error (e.g., show an error message)
            }
          );
      } else {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 1000);
      }
    }
  }
    
    
