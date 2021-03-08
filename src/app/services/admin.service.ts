import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AdminService {
  admin$: Observable<Admin>;
  admin: Admin;

  constructor(
    private af: AngularFirestore,
    private afa: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) {
    this.admin$ = this.afa.authState.pipe(
      switchMap((admin) => {
        if (admin) {
          return this.af.doc<Admin>(`admin/${admin.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signIn(email, password) {
    const loading = await this.loadingCtrl.create({
      message: 'Verifikasi...',
      spinner: 'crescent',
      showBackdrop: true,
    });

    loading.present();

    this.afa
      .setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
      .then(() => {
        this.afa
          .signInWithEmailAndPassword(email, password)
          .then((data) => {
            if (!data.user.emailVerified) {
              loading.dismiss();
              this.toast('Periksa alamat email', 'warning');
              this.afa.signOut();
            } else {
              loading.dismiss();
              this.router.navigate(['/stat']);
            }
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

  async signOut() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true,
    });

    loading.present();

    this.afa.signOut().then(() => {
      loading.dismiss();
      this.router.navigate(['/admin']);
    });
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
