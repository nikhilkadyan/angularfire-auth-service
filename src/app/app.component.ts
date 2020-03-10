import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(public auth: AuthService) { }
}
