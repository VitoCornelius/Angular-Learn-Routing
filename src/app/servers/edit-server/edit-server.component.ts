import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {CanComponentDeactivate} from './can-deactivate-guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService, 
    private activatedRoute : ActivatedRoute, 
    private router : Router) { }

  ngOnInit() {

    console.log(this.activatedRoute.snapshot.params);
    console.log(this.activatedRoute.snapshot.queryParams); //this will not be reactive 
    console.log(this.activatedRoute.snapshot.fragment);

    //we can also subscrie to the observable , unsubscrive will be eecuted by angular ! 
    this.allowEdit= this.activatedRoute.snapshot.params['allowEdit'] === '1' ? true : false;
    this.activatedRoute.queryParams.subscribe(
      (params : Params) => {
        this.allowEdit = params['allowEdit'] === '1' ? true : false;
      }
    )
    const id = +this.activatedRoute.snapshot.params['id'];
    this.server = this.serversService.getServer(id);


    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.activatedRoute}); //naviagate away 
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit){
      return true;
    }

    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved ){
      //if one if the 2 was changed and the changes were not saved 
      return confirm("Do you want to discard the changes?");
    } else {
      return true;
    }
  }

}
