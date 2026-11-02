import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-sidenav',
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  readonly items: NavItem[] = [{ label: 'Bem-vindo', path: '/welcome' }];

  readonly groups: NavGroup[] = [
    {
      label: 'Componentes',
      items: [
        { label: 'Button', path: '/button' },
        { label: 'Spinner', path: '/spinner' },
        { label: 'Input', path: '/input' },
        { label: 'Input Group', path: '/input-group' },
        { label: 'Form Field', path: '/form-field' },
      ],
    },
  ];
}
