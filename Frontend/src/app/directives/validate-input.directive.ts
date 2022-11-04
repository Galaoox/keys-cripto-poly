import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[validateInput]'
})
export class ValidateInputDirective implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  constructor(private control: NgControl, private elmenetRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    if (this.control.statusChanges?.subscribe) {
      this.subscription = this.control.statusChanges.subscribe((control) => {
        console.log("test", control);
        const classAdd = 'INVALID' === control ? 'is-invalid' : 'is-valid';
        const classRemove = 'INVALID' === control ? 'is-valid' : 'is-invalid';
        this.renderer.addClass(this.elmenetRef.nativeElement, classAdd);
        this.renderer.removeClass(this.elmenetRef.nativeElement, classRemove);
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
