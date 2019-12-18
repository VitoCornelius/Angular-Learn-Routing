import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  //store the subscription 
  paramsSubscription : Subscription;

  constructor(private activeRoute : ActivatedRoute) { } //we get access to the currentl loaded route 

  ngOnInit() {
    this.user = {
      id : this.activeRoute.snapshot.params['id'], //access to the properties of the route parameters 
      name : this.activeRoute.snapshot.params['name']
    };
    //params is an observable -> we have to take the observable pattern here - if the component is reloaded within the component
    this.paramsSubscription = this.activeRoute.params //in order to update the page
      .subscribe(
        (params : Params) => {
          this.user.id = params.id;
          this.user.name = params.name;
        }  
      );
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe(); //we do not have to do this in theory 
  }
}
