import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
})
export class UserPage implements OnInit {
  email: string;
  password: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastController
  ) {}

  ngOnInit() {}

  home() {
    this.router.navigate(['/home']);
  }

  regUser() {
    this.router.navigate(['/reg-user']);
  }

  login() {
    if (this.email && this.password) {
      this.auth.signIn(this.email, this.password);
    } else {
      this.toast('Data tidak boleh kosong', 'danger');
    }
  }

  async toast(msg, status) {
    const toast = await this.toastr.create({
      message: msg,
      position: 'top',
      color: status,
      duration: 2000,
    });

    toast.present();
  }
}
