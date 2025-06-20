import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  setNotification(title: string): void {
    const isHidden = document.visibilityState === 'hidden';

    if (isHidden) {
      const audio = new Audio('../../../../../assets/Voices/noti.mp3');
      audio.play();
      
      let isOriginal = true;
      const originalTitle = document.title;
      const interval = setInterval(() => {
        document.title = isOriginal ? title : originalTitle;
        isOriginal = !isOriginal;
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        document.title = originalTitle;
      }, 6000);
    }
  }
}
