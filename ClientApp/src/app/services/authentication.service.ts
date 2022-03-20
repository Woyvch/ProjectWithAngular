import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserForRegistration } from '../interfaces/userForRegistration';
import { RegistrationResponse } from '../interfaces/registrationResponse';
import { UserForAuthentication } from '../interfaces/userForAuthentication';
import { AuthResponse } from '../interfaces/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService,
    private jwtHelper: JwtHelperService,
  ) { }

  // Send the POST request to the Web API
  public registerUser = (route: string, body: UserForRegistration) => {
    return this.http.post<RegistrationResponse> (this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }

  // Create a complete route from the API’s root address and the endpoint part
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  
  public loginUser = (route: string, body: UserForAuthentication) => {
    return this.http.post<AuthResponse>(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public isUserAuthenticated = () => { //: boolean
    const token = localStorage.getItem("token");
 
    return token && !this.jwtHelper.isTokenExpired(token);
  }
}
