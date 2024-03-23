import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  singIn!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.singIn = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.singIn.valid) {
      console.log(this.singIn.value); // You can send the form data to your backend service here
    } else {
      // Mark all fields as touched to display validation errors
      this.singIn.markAllAsTouched();
    }
  }
}
