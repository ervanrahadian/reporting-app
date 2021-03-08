import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reg-admin',
  templateUrl: './reg-admin.page.html',
})
export class RegAdminPage implements OnInit {
  email: string;
  phone: string;
  password: string;

  constructor(
    private af: AngularFirestore,
    private afa: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) {}

  ngOnInit() {}

  admin() {
    this.router.navigate(['/admin']);
  }

  async register() {
    if (this.email && this.phone && this.password) {
      const loading = await this.loadingCtrl.create({
        message: 'Menambahkan data...',
        spinner: 'crescent',
        showBackdrop: true,
      });

      loading.present();

      this.afa
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification();
          this.af
            .collection('admin')
            .doc(data.user.uid)
            .set({
              adminId: data.user.uid,
              adminEmail: this.email,
              adminPhone: this.phone,
              createdAt: Date.now(),
            })
            .then(() => {
              loading.dismiss();
              this.toast('Akun berhasil ditambahkan', 'success');
              this.router.navigate(['/stat']);
            })
            .catch((error) => {
              loading.dismiss();
              this.toast(error.message, 'danger');
            });
        })
        .catch((error) => {
          loading.dismiss();
          this.toast(error.message, 'danger');
        });
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
