import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NewCity } from '../interfaces/newCity.model';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  public cityForm: FormGroup;

  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.cityForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  public validateControl = (controlName: string) => {
    return this.cityForm.controls[controlName].invalid && this.cityForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.cityForm.controls[controlName].hasError(errorName)
  }

  public addCity = (detailsFormValue: any) => {
    const formValues = { ...detailsFormValue };
    const newCity : NewCity = {
      name: formValues.name,
      description: formValues.description,
    }
    this.cityService.addCity(newCity)
      .subscribe(_ => {
        console.log("Successful registration");
        this.router.navigate(["/cities"]);
      },
      error => {
        console.log(error);
      }
      );
  }

}
