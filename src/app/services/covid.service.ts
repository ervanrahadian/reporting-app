import { Injectable } from '@angular/core';
import { Covid } from '../models/covid';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable()
export class CovidService {
  covidCollection: AngularFirestoreCollection<Covid>;
  covidDocument: AngularFirestoreDocument<Covid>;
  covids: Observable<Covid[]>;
  covid: Observable<Covid>;
  covid$: any;

  constructor(private af: AngularFirestore) {
    this.covidCollection = this.af.collection('covid', (ref) =>
      ref.orderBy('name', 'asc')
    );

    this.covids = this.covidCollection.snapshotChanges().pipe(
      map((action) => {
        return action.map((a) => {
          const data = a.payload.doc.data() as Covid;
          data.personId = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getCovids() {
    return this.covids;
  }

  getCovid(personId) {
    this.covidDocument = this.af.doc<Covid>(`covid/${personId}`);
    return (this.covid = this.covidDocument.valueChanges());
  }
}
