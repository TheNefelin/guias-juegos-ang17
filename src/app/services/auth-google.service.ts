import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';
import { GoogleUser } from '../interfaces/google-user';
import { Router } from '@angular/router';

const authConfig: AuthConfig = {
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  issuer: environment.GOOGLE_ISSUER,
  clientId: environment.GOOGLE_ID,
  scope: environment.GOOGLE_SCOPE,
}

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  private googleUser: GoogleUser = { info: { sub: "", email: "none", name: "", picture: "" }}
  private userInfo = new BehaviorSubject<GoogleUser>(this.googleUser)

  constructor(
    private readonly oAuthService: OAuthService,
    private router: Router,  
  ) {
    this.oAuthService.configure(authConfig)

    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if (this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.loadUserProfile().then(googleUser => {
            this.userInfo.next(googleUser as GoogleUser)
          })
        }
      })
    })
  }

  get getUserInfo() {
    return this.userInfo.asObservable()
  }

  logIn() {
    this.oAuthService.initLoginFlow()
    this.router.navigateByUrl('/');
    console.log("-- LogIn --")
  }

  logOut() {
    this.oAuthService.logOut()
    this.router.navigateByUrl('/');
    this.userInfo.next(this.googleUser)
    console.log("-- LogOut --")
  }

}
