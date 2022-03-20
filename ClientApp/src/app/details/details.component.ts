import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { City } from '../interfaces/city.model';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  /* Route parameters */
  cityId = this.route.snapshot.paramMap.get('id'); // user.id

  public detailsForm: FormGroup;

  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.detailsForm = this.formBuilder.group({
      id: new FormControl(this.cityId),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  public validateControl = (controlName: string) => {
    return this.detailsForm.controls[controlName].invalid && this.detailsForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.detailsForm.controls[controlName].hasError(errorName)
  }

  public updateCity = (detailsFormValue: any) => {
    const formValues = { ...detailsFormValue };
    const city : City = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
    }
    this.cityService.updateCity(city)
      .subscribe(_ => {
        console.log("City updated");
        this.router.navigate(["/cities"]);
      },
      error => {
        console.log(error);
      }
    );
  }
  
}
