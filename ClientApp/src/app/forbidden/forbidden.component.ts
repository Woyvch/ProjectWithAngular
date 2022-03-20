import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {

  private returnUrl: string = '';

  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // fetch the returnUrl from the ActivatedRoute class
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public navigateToLogin = () => {
    // navigate to the Login page with the query parameter.
    this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: this.returnUrl }});
  }

}
