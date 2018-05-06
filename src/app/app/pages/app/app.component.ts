<<<<<<< HEAD
import { Component } from '@angular/core';
import {ForumService} from "../../../forum/services/forum-service.service";
=======
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, AfterViewChecked, AfterViewInit, OnChanges } from '@angular/core';
import { User } from '../../models/User';
>>>>>>> c5e7321d0005605d23adee974dec49e407f3b115

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
