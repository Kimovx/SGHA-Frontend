import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(
    private http: HttpClient,
  ) { }

  uploadImage(houseId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`https://greeensync-001-site1.jtempurl.com/api/Camera/${houseId}/upload`, formData);
  }

  getMedia(houseId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://greeensync-001-site1.jtempurl.com/api/Camera/${houseId}/media`);
  }
}
