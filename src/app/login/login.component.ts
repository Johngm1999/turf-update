import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService,  private router: Router, private sharedService : SharedService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Access form values using this.myForm.value
      const formData = this.loginForm.value;
      this.userService.validateEmployee(formData)
        .subscribe(
          (response: any) => {
            if (response !== null) {
              this.sharedService.setData(response);
              sessionStorage.setItem("useremail",this.loginForm.get('email')?.value)
              this.router.navigate(['/dashboard']);
            }
            else {
              alert("Sorry. Password Mismatch")
            }
            // Handle success (e.g., show a success message)
          },
          (error: any) => {
            alert("Something went wrong");
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }
}
