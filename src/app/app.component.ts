import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonDataService } from './service/common-data.service';
import { Router } from '@angular/router';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'click-UI';
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  //userType: string;

  //@Output() sidenavClose = new EventEmitter();

  constructor(private commonDataService: CommonDataService,
    private router: Router, private idle: Idle, private keepalive: Keepalive, 
    private ngxService: NgxUiLoaderService){

      // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(3600);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'});
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.resetSessionStorage();
    });
    idle.onIdleStart.subscribe(() => {
   //   alert('Seems you are idle.Your session going to close in 10 seconds')
      this.idleState = 'You\'ve gone idle!'});
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'});

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();

    }
    reset() {
      this.idle.watch();
      this.idleState = 'Started.';
      this.timedOut = false;
    }

    resetSessionStorage() {
      const loginId = sessionStorage.getItem('loginId');
      if(loginId != null){
        alert('Your session going to close as there is no activity.');
        this.ngxService.start();
        sessionStorage.clear();
        window.location.href="/home";
      }
    }

}
