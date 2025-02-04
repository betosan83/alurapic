import { ErrorHandler } from '@angular/core';
import * as StackTrace from 'stacktrace-js';

export class GlobalErrorHandler implements ErrorHandler {
    
    handleError(error: any): void {
        StackTrace
            .fromError(error)
            .then(stackFrames => {
                const stackAsString = stackFrames
                    .map(sf => sf.toString())
                    .join('\n');
                console.log(stackAsString);
            });
    }
    
}