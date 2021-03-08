import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
})
export class AdminPage implements OnInit {
  email: string;
  password: string;

  constructor(
    private admin: AdminService,
    private router: Router,
    private toastr: ToastController
  ) {}

  ngOnInit() {}

  home() {
    this.router.navigate(['/home']);
  }

  regAdmin() {
    this.router.navigate(['/reg-admin']);
  }

  login() {
    if (this.email && this.password) {
      this.admin.signIn(this.email, this.password);
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
