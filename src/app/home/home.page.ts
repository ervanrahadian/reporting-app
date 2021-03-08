import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./style.css'],
})
export class HomePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  user() {
    this.router.navigate(['/user']);
  }

  admin() {
    this.router.navigate(['/admin']);
  }
}
