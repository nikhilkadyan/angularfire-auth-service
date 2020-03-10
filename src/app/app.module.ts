import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AuthService } from './core/auth.service';

@NgModule({
  imports:      [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule, 
    ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [AuthService]
})
export class AppModule { }
