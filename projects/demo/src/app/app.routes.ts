import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'welcome' },
      {
        path: 'welcome',
        loadComponent: () => import('./pages/welcome/welcome').then((m) => m.Welcome),
      },
      {
        path: 'button',
        loadComponent: () => import('./pages/button/button').then((m) => m.ButtonPage),
      },
      {
        path: 'spinner',
        loadComponent: () => import('./pages/spinner/spinner').then((m) => m.SpinnerPage),
      },
      {
        path: 'input',
        loadComponent: () => import('./pages/input/input').then((m) => m.InputPage),
      },
      {
        path: 'input-group',
        loadComponent: () =>
          import('./pages/input-group/input-group').then((m) => m.InputGroupPage),
      },
      {
        path: 'form-field',
        loadComponent: () => import('./pages/form-field/form-field').then((m) => m.FormFieldPage),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
