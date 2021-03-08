import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.page.html',
})
export class RegUserPage implements OnInit {
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

  user() {
    this.router.navigate(['/user']);
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
            .collection('user')
            .doc(data.user.uid)
            .set({
              userId: data.user.uid,
              userEmail: this.email,
              userPhone: this.phone,
              createdAt: Date.now(),
            })
            .then(() => {
              loading.dismiss();
              this.toast('Akun berhasil ditambahkan', 'success');
              this.router.navigate(['/list']);
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
