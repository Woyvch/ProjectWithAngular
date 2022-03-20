import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';

import { Claim } from '../interfaces/claim';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  public claims: Claim[] = [];

  constructor(
    private repository: RepositoryService,
  ) { }

  ngOnInit(): void {
    this.getClaims();
  }
  // fetch the claims from the Web API’s action
  public getClaims = () =>{
    this.repository.getData('api/cities/privacy')
    .subscribe(res => {
      this.claims = res as [];
    })
  }

}
