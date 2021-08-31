import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalConstants } from 'src/common/globalConstants';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  welcomeMessage: string;

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.userDetailFromToken()
      this.welcomeMessage=GlobalConstants.Messages.welcomeMessage
    }
  }

  logOut(){
    this.authService.logout()
  }

}
