import { Component, HostListener } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  settings: Settings;

  constructor(public readonly appSettings: AppSettings) {
    this.settings = appSettings;
  }

  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if(this.eRef.nativeElement.contains(event.target)) {
  //     this.text = "clicked inside";
  //   } else {
  //     this.text = "clicked outside";
  //   }
  // }

  // (function() {
  //   var hidden = "hidden";
  
  //   // Standards:
  //   if (hidden in document)
  //     document.addEventListener("visibilitychange", onchange);
  //   else if ((hidden = "mozHidden") in document)
  //     document.addEventListener("mozvisibilitychange", onchange);
  //   else if ((hidden = "webkitHidden") in document)
  //     document.addEventListener("webkitvisibilitychange", onchange);
  //   else if ((hidden = "msHidden") in document)
  //     document.addEventListener("msvisibilitychange", onchange);
  //   // IE 9 and lower:
  //   else if ("onfocusin" in document)
  //     document.onfocusin = document.onfocusout = onchange;
  //   // All others:
  //   else
  //     window.onpageshow = window.onpagehide
  //     = window.onfocus = window.onblur = onchange;
  
  //   function onchange (evt) {
  //     var v = "visible", h = "hidden",
  //         evtMap = {
  //           focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
  //         };
  
  //     evt = evt || window.event;
  //     if (evt.type in evtMap)
  //       document.body.className = evtMap[evt.type];
  //     else
  //       document.body.className = this[hidden] ? "hidden" : "visible";
  //   }
  
  //   // set the initial state (but only if browser supports the Page Visibility API)
  //   if( document[hidden] !== undefined )
  //     onchange({type: document[hidden] ? "blur" : "focus"});
  // })();
}
