import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'; // Corrected import
import { provideClientHydration } from '@angular/platform-browser';
import { authInterceptor } from './Interceptors/Auth';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-center',
        toastClass: 'dark-glass-toaster',
        maxOpened: 1,
        autoDismiss: true,
      })
    ),
    importProvidersFrom(BrowserAnimationsModule)
  ]
};


