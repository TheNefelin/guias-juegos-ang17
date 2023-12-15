import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserGoogle } from '../interfaces/user-google';
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
    oAuthService.configure(authConfig)

    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if (oAuthService.hasValidAccessToken()) {
          oAuthService.loadUserProfile().then(googleUser => {
            // oAuthService.getIdToken()
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
    return this.userInfo.asObservable()
  }

  logIn() {
    this.oAuthService.initLoginFlow()
    this.router.navigateByUrl('/');
  }

  logOut() {
    this.oAuthService.logOut()
    this.router.navigateByUrl('/');
    this.userInfo.next(this.googleUser)
  }

}
