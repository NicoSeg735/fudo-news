import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  isDevMode
} from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideClientHydration } from '@angular/platform-browser'
import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http'
import { LucideAngularModule, Search, RotateCw, Link } from 'lucide-angular'
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor'
import { provideServiceWorker } from '@angular/service-worker'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([errorHandlerInterceptor])),
    importProvidersFrom(LucideAngularModule.pick({ Search, RotateCw, Link })),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
}
