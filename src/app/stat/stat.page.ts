import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.page.html',
})
export class StatPage implements OnInit {
  // getData, percobaan 2, fail (list not found)
  // covids: Covid[];

  // getData, percobaan 3, ok (data loaded)
  public searchList: any[];
  public loadedList: any[];

  constructor(
    private admin: AdminService,
    private af: AngularFirestore,
    private toastr: ToastController
  ) {}

  ngOnInit() {
    // searchBar, percobaan 2, fail (data not found)
    // this.covidService.getCovids().subscribe((covids) => {
    //   this.covids = covids;
    // });

    // searchBar, percobaan 3, ok (collection)
    this.af
      .collection('covid', (ref) => ref.orderBy('location', 'asc'))
      .valueChanges()
      .subscribe((searchList) => {
        this.searchList = searchList;
        this.loadedList = searchList;

        // push notification
        this.toast('Data telah diperbarui', 'success');
      });
  }

  initializeItems(): void {
    this.searchList = this.loadedList;
  }

  filterStat(event) {
    this.initializeItems();

    const searchTerm = event.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.searchList = this.searchList.filter((current) => {
      if (current.location && searchTerm) {
        if (
          current.location.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        ) {
          return true;
        }
        return false;
      }
    });
  }

  logout() {
    this.admin.signOut();
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
