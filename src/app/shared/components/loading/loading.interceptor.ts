import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor{
    
    intercept(req: HttpRequest<any>, next: HttpHandler): 
        Observable<HttpSentEvent | 
        HttpHeaderResponse | 
        HttpProgressEvent | 
        HttpResponse<any> | 
        HttpUserEvent<any>> {
            return next.handle(req)
                .pipe(tap(event => {
                    if(event instanceof HttpResponse) {
                        this.loadingService.stop();
                    } else {
                        this.loadingService.start();
                    }
                }))
    }

    constructor(private loadingService: LoadingService) {

    }
}