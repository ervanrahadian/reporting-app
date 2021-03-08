import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Covid } from '../models/covid';
import { AuthService } from '../services/auth.service';
import { CovidService } from '../services/covid.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',

  providers: [CovidService],
})
export class ListPage implements OnInit {
  covids: Covid[];

  constructor(
    private af: AngularFirestore,
    private covidService: CovidService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastr: ToastController,
    private storage: AngularFireStorage,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.covidService.getCovids().subscribe((covids) => {
      this.covids = covids;
    });
  }

  create() {
    this.router.navigate(['/create']);
  }

  logout() {
    this.auth.signOut();
  }

  edit(personId) {
    this.router.navigate(['/edit/', personId]);
  }

  async delete(personId) {
    const loading = await this.loadingCtrl.create({
      message: 'Menghapus data...',
      spinner: 'crescent',
      showBackdrop: true,
    });

    loading.present();

    this.storage.ref('images').child(personId).delete();

    this.af
      .collection('covid')
      .doc(personId)
      .delete()
      .then(() => {
        loading.dismiss();
        this.toast('Data berhasil dihapus', 'success');
      })
      .catch((error) => {
        loading.dismiss();
        this.toast(error.message, 'danger');
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
