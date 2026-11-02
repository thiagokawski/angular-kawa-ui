import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidenav } from '../components/sidenav/sidenav';
import { Topbar } from '../components/topbar/topbar';

@Component({
  imports: [RouterOutlet, Sidenav, Topbar],
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
