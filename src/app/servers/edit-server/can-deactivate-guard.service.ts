import { Observable } from "rxjs";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanComponentDeactivate {  //define the interface of the 
    canDeactivate : () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

    canDeactivate(component : CanComponentDeactivate, 
        currentRoute : ActivatedRouteSnapshot, 
        currentState : RouterStateSnapshot, 
        nextState? : RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean { //this is an optional argument 
            return component.canDeactivate();
        }
}