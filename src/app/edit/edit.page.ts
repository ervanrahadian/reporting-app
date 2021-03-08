import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { CovidService } from '../services/covid.service';

interface Region {}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  providers: [CovidService],
})
export class EditPage implements OnInit {
  personId: string;
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
    private route: ActivatedRoute,
    private af: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private covidService: CovidService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.personId = this.route.snapshot.params['personId'];
  }

  ionViewWillEnter() {
    this.loadData();
  }

  list() {
    this.router.navigate(['/list']);
  }

  chooseFile(event) {
    this.selectedFile = event.target.files;
  }

  async loadData() {
    const loading = await this.loadingCtrl.create({
      message: 'Memuat Data...',
      spinner: 'crescent',
      showBackdrop: true,
    });

    loading.present();

    this.covidService.getCovid(this.personId).subscribe((covid) => {
      this.name = covid.name;
      this.age = covid.age;
      this.address = covid.address;
      this.imagePath = covid.imagePath;
      this.gender = covid.gender;
      this.location = covid.location;
      loading.dismiss();
    });
  }

  async updateData() {
    const loading = await this.loadingCtrl.create({
      message: 'Mengubah data...',
      spinner: 'crescent',
      showBackdrop: true,
    });

    loading.present();

    const imageUrl = await this.uploadFile(this.personId, this.selectedFile);

    this.af
      .collection('covid')
      .doc(this.personId)
      .set(
        {
          name: this.name,
          age: this.age,
          address: this.address,
          // updateImage, percobaan 2, fail (image not found)
          // imagePath: imageUrl,
          // updateImage, percobaan 3, ok (ternary operator)
          imagePath: imageUrl ? imageUrl : this.imagePath,
          gender: this.gender,
          location: this.location,
        },
        { merge: true }
      )
      .then(() => {
        loading.dismiss();
        this.toast('Data berhasil diubah', 'success');
        this.router.navigate(['/list']);
      })
      .catch((error) => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      });
  }

  async uploadFile(id, file): Promise<any> {
    if (file && file.length) {
      try {
        const loading = await this.loadingCtrl.create({
          message: 'Mengubah data...',
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
