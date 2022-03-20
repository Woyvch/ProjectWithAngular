import { Component, OnInit, Inject } from '@angular/core';

import { City } from '../interfaces/city.model';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  public cities: City[] = [];

  constructor(
    private cityService: CityService,
  ) { }

  ngOnInit(): void {
    this.getCities();
  }

  getCities(): void {
    this.cityService.getCities()
      .subscribe(result => this.cities = result);
  }

  deleteCity(city: City): void {
    //console.log(city.id);
    this.cityService.deletecity(city)
      .subscribe(_ => {
        this.getCities();
      });
  }

}
