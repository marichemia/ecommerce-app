import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { provideHttpClient } from '@angular/common/http';



@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  providers: [Auth],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  registerForm;
  passwordVisible = false;
  avatarPreview: string | ArrayBuffer | null = null;
  errorMessage: string | null = '';

  constructor(private fb: FormBuilder, private auth: Auth) { 
    this.registerForm = this.fb.group({

    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]], 
    confirmPassword: ['', [Validators.required, Validators.minLength(3)]], 
    avatar: [null],

  });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  avatarChange(event: any) {

    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ avatar: file });
      const reader = new FileReader();
      reader.onload = e => this.avatarPreview = reader.result;
      reader.readAsDataURL(file);
    }
  
  }

  submit() {
    console.log("submitted");
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) return;

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMessage = 'password do not match';
      return;
    }

    const formData = new FormData();
    formData.append('username', this.registerForm.value.username!);
    formData.append('email', this.registerForm.value.email!);
    formData.append('password', this.registerForm.value.password!);
    formData.append('password_confirmation', this.registerForm.value.confirmPassword!);

    if (this.registerForm.value.avatar) {
      formData.append('avatar', this.registerForm.value.avatar);
    }

    console.log('About to send registration request');


    this.auth.register(formData).subscribe({

      next: (res) => {
        console.log('registration complete', res);
        //redirect to login page
      },
      error: (err) => {
        if (err.status === 422) {
          console.log('Full error object:', err); 
          this.errorMessage = 'username or email already exists';
        } else {
          console.log('error occurred', err);
        }
      }

    });






  }
}
