import { Injectable } from '@angular/core';
import { User } from './user';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    ) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if(user){
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      )
    }

  async login(){
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  updateUserData(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    userRef.set(data, {merge: true});
  }
  
}