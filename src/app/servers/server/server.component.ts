import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService, 
    private route : ActivatedRoute,
    private router : Router
    ) { }

  ngOnInit() {

//  RIGHT NOW WE USE THE RESOLVER
    this.route.data.subscribe(
      (data : Data) => {
        this.server = data['server']; //this name has to match the name we used there ! 
      }
    )

    // this.server = this.serversService.getServer(+this.route.snapshot.params['id']); //this will be a string 
    // this.route.params.subscribe(
    //   (params : Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // )
  }

  goToEdit() {
    this.router.navigate(['edit'], {relativeTo : this.route, queryParamsHandling : 'preserve'}); //set the relative route 
  }

}
