import { Routes } from '@angular/router';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
];
