import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { City } from '../interfaces/city.model';
import { EnvironmentUrlService } from './environment-url.service';
import { NewCity } from '../interfaces/newCity.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private citiesUrl = 'api/cities';  // URL to web api

  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService,
  ) { }
  
  // GET cities from the server
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.createCompleteRoute(this.citiesUrl, this.envUrl.urlAddress))
  }

  // POST city
  addCity(newCity: NewCity): Observable<City> {
    let data = newCity;
    return this.http.post<City>(this.createCompleteRoute(this.citiesUrl, this.envUrl.urlAddress), data);
  }

  // PUT city
  updateCity(city: City): Observable<City> {
    let data = city;
    return this.http.put<City>(this.createCompleteRoute(this.citiesUrl, this.envUrl.urlAddress)+`/${data.id}`, data);
  }

  // DELETE city from the server
  deletecity(city: City): Observable<City>  {
    let data = {
      'id': city.id,
      'name': city.name,
      'description': city.description,
    };
    return this.http.delete<City>(this.createCompleteRoute(this.citiesUrl, this.envUrl.urlAddress)+`/${data.id}`);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

}


