import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

@Directive({
    //Esta diretiva será utilizada como um atributo, por isso os colchetes.
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective { 

    @Input() brightness = '70%';

    constructor(private el: ElementRef, private renderer: Renderer) {

    }

    @HostListener('mouseover')
    darkenOn() {
        this.renderer.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff() {
        this.renderer.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }

}