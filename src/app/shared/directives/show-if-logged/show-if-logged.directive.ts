import { Directive, Input, Renderer, ElementRef, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {
    
    
    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userservice: UserService
        ) {}
        
    ngOnInit(): void {
       !this.userservice.isLogged()
        && this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
    }
        
    }