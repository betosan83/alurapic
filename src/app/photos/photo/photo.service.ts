import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Photo } from './photo';
import { PhotoComment } from './photo-comment';
import { pipe, of, throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API = 'http://localhost:3000';

@Injectable({providedIn: 'root'})
export class PhotoService {

    
    constructor(private http: HttpClient) {}

    listFromUser(userName: string) {
        return this.http.get<Photo[]>(API + '/' + userName + '/photos');
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams()
            .append('page', page.toString());
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos', { params });
    }

    upload(description: string, allowComments: boolean, file: File) {
        //Quando existe um arquivo para ser enviado, necessário utilizar formData.
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);
        console.log(formData);
        return this.http.post(API + '/photos/upload', formData, {
            observe: 'events',
            reportProgress: true
        });
    }

    findById(photoId: number) {
        return this.http.get<Photo>(API + '/photos/' + photoId);
    }

    getComments(photoId: number) {
        return this.http.get<PhotoComment[]>(API + '/photos/' +photoId + '/comments');
    }

    addComment(photoId: number, commentText: string) {
        return this.http.post(API + '/photos/' + photoId + '/comments', {
            commentText: commentText
        });
    }

    removePhoto(photoId: number) {
        return this.http.delete(API + '/photos/' + photoId);
    }

    like(photoId: number) {
        return this.http.post(API + '/photos/' + photoId + '/like', {}, { observe: 'response' })
            .pipe(map(res => true))
            .pipe(catchError(err => {
                return err.status == '304' ? of(false) : throwError(err);
            }));
    }
}

