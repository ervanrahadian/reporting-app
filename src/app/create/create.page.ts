import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

interface Region {}

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
})
export class CreatePage implements OnInit {
  name: string;
  age: number;
  address: string;
  imagePath: string;
  gender: string;
  location: string;

  selectedFile: any;

  regions: Region[] = [
    'Aceh',
    'Bali',
    'Banten',
    'Bengkulu',
    'DI Yogyakarta',
    'DKI Jakarta',
    'Gorontalo',
    'Jambi',
    'Jawa Barat',
    'Jawa Tengah',
    'Jawa Timur',
    'Kalimantan Barat',
    'Kalimantan Selatan',
    'Kalimantan Tengah',
    'Kalimantan Timur',
    'Kalimantan Utara',
    'Kepulauan Bangka Belitung',
    'Kepulauan Riau',
    'Lampung',
    'Maluku',
    'Maluku Utara',
    'Nusa Tenggara Barat',
    'Nusa Tenggara Timur',
    'Papua',
    'Papua Barat',
    'Riau',
    'Sulawesi Barat',
    'Sulawesi Selatan',
    'Sulawesi Tengah',
    'Sulawesi Tenggara',
    'Sulawesi Utara',
    'Sumatera Barat',
    'Sumatera Selatan',
    'Sumatera Utara',
  ];

  constructor(
    private af: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {}

  list() {
    this.router.navigate(['/list']);
  }

  // image, percobaan 2, ok (event)
  chooseFile(event) {
    this.selectedFile = event.target.files;
  }

  async createData() {
    if (
      this.name &&
      this.age &&
      this.address &&
      this.gender &&
      this.location &&
      this.imagePath
    ) {
      const loading = await this.loadingCtrl.create({
        message: 'Menambahkan data...',
        spinner: 'crescent',
        showBackdrop: true,
      });

      loading.present();

      const personId = this.af.createId();

      // image, percobaan 2, ok (await)
      const imageUrl = await this.uploadFile(personId, this.selectedFile);

      this.af
        .collection('covid')
        .doc(personId)
        .set({
          personId: personId,
          name: this.name,
          age: this.age,
          address: this.address,
          imagePath: imageUrl,
          gender: this.gender,
          location: this.location,
          createdAt: Date.now(),
        })
        .then(() => {
          loading.dismiss();
          this.toast('Data berhasil disimpan', 'success');
          this.router.navigate(['/list']);
        })
        .catch((error) => {
          loading.dismiss();
          this.toast(error.message, 'danger');
        });
    } else {
      this.toast('Data tidak boleh kosong', 'danger');
    }
  }

  // uploadImage, percobaan 2, fail (promise error)
  // async uploadFile(id, file) {
  //   if (file && file.length) {
  //     try {
  //       const task = await this.storage.ref('images').child(id).put(file[0]);
  //       return this.storage.ref(`images/${id}`).getDownloadURL();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  // uploadImage, percobaan 3, ok (asynchronous)
  async uploadFile(id, file): Promise<any> {
    if (file && file.length) {
      try {
        const loading = await this.loadingCtrl.create({
          message: 'Menambahkan data...',
          spinner: 'crescent',
          showBackdrop: true,
        });

        loading.present();
        const task = await this.storage.ref('images').child(id).put(file[0]);

        loading.dismiss();
        return this.storage.ref(`images/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
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
