import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import {Register} from './auth/register/register';
import {Checkout} from './checkout/checkout';

export const routes: Routes = [

    {path: "login", component: Login},
    {path: "register", component: Register},
    {path: "checkout", component: Checkout},

    {path: '',
        loadChildren: () => import('./products/products-module').then(m => m.ProductsModule)
    }, 
];
