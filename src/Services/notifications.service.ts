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

  askNotificationPermission() {
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('🔔 Notification permission granted!');
        } else if (permission === 'denied') {
          console.log('❌ Notification permission denied.');
        }
      });
    } else if (Notification.permission === 'granted') {
      console.log('✅ Notification permission already granted.');
    } else {
      console.log('❌ Notification already denied.');
    }
  } else {
    console.warn('⚠️ Browser does not support notifications.');
  }
}
}
