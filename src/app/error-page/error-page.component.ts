import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  errorMessage : string;

  constructor(private activeRoute : ActivatedRoute) { }

  ngOnInit() {
    this.errorMessage = this.activeRoute.snapshot.data['message']; //gettting the static 'data' first way
    
    this.activeRoute.data.subscribe( //second way 
      (data : Data) => {
        this.errorMessage = data['message'];
      }
    )
  }

}
