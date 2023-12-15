import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';
import { UserGoogle } from '../interfaces/user-google';
import { Router } from '@angular/router';
import { ApiDataService } from './api-data.service';

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
  private googleUser: UserGoogle = { info: { at_hash: "",  sub: "", email: "none", name: "", picture: "" }, token: ""}
  private userInfo = new BehaviorSubject<UserGoogle>(this.googleUser)

  constructor(
    private readonly oAuthService: OAuthService,
    private apiDataService: ApiDataService,
    private router: Router,  
  ) {
    this.oAuthService.configure(authConfig)

    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if (this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.loadUserProfile().then(googleUser => {
            // this.oAuthService.getIdToken()
            this.userInfo.next(googleUser as UserGoogle)

            apiDataService.postLoginBackend(this.userInfo.value.info.email, this.userInfo.value.info.at_hash)
            .subscribe(res => {
              console.log("GoogleAuth & ApiAuth", res)
            })
          })
        }
      })
    })
  }

  get getUserInfo() {
    console.log("-- GETUSER --", this.googleUser)
    return this.userInfo.asObservable()
  }

  logIn() {
    console.log("-- LOGIN --", this.googleUser)
    this.oAuthService.initLoginFlow()
    this.router.navigateByUrl('/');
    console.log("-- LogIn --")
  }

  logOut() {
    console.log("-- LOGOUT --", this.googleUser)
    this.oAuthService.logOut()
    this.router.navigateByUrl('/');
    this.userInfo.next(this.googleUser)
    console.log("-- LogOut --")
  }

}
