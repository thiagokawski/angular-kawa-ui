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
      {
        path: 'card',
        loadComponent: () => import('./pages/card/card').then((m) => m.CardPage),
      },
      {
        path: 'alert',
        loadComponent: () => import('./pages/alert/alert').then((m) => m.AlertPage),
      },
      {
        path: 'avatar',
        loadComponent: () => import('./pages/avatar/avatar').then((m) => m.AvatarPage),
      },
      {
        path: 'icon-button',
        loadComponent: () =>
          import('./pages/icon-button/icon-button').then((m) => m.IconButtonPage),
      },
      {
        path: 'pagination',
        loadComponent: () => import('./pages/pagination/pagination').then((m) => m.PaginationPage),
      },
      {
        path: 'select',
        loadComponent: () => import('./pages/select/select').then((m) => m.SelectPage),
      },
      {
        path: 'checkbox',
        loadComponent: () => import('./pages/checkbox/checkbox').then((m) => m.CheckboxPage),
      },
      {
        path: 'table',
        loadComponent: () => import('./pages/table/table').then((m) => m.TablePage),
      },
      {
        path: 'icon',
        loadComponent: () => import('./pages/icon/icon').then((m) => m.IconPage),
      },
      {
        path: 'badge',
        loadComponent: () => import('./pages/badge/badge').then((m) => m.BadgePage),
      },
      {
        path: 'tooltip',
        loadComponent: () => import('./pages/tooltip/tooltip').then((m) => m.TooltipPage),
      },
      {
        path: 'drawer',
        loadComponent: () => import('./pages/drawer/drawer').then((m) => m.DrawerPage),
      },
      {
        path: 'menu',
        loadComponent: () => import('./pages/menu/menu').then((m) => m.MenuPage),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
