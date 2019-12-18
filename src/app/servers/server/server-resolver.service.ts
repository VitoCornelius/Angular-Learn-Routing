import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";
import { Injectable } from "@angular/core";

interface Server {
    id : number,
    name: string,
    status : string
}

//resolver is loading some things before the component is rendered 
@Injectable()
export class ServerResolver implements Resolve<Server> {
    constructor(private ss : ServersService) {}
    //this will do the loading of the data in advance 
    resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<Server> | Promise<Server> | Server {
        return this.ss.getServer(+route.params['id']);
    }
}