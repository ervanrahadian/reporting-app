import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  user$: Observable<User>;
  user: User;

  constructor(
    private af: AngularFirestore,
    private afa: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) {
    this.user$ = this.afa.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.af.doc<User>(`user/${user.uid}`).valueChanges();
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
              this.toast('Verifikasi alamat email', 'warning');
              this.afa.signOut();
            } else {
              loading.dismiss();
              this.router.navigate(['/list']);
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
      this.router.navigate(['/user']);
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
