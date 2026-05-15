import {ApplicationConfig, APP_INITIALIZER, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, provideHttpClient, withInterceptors} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {authenticationInterceptor} from "./auth/services/authentication.interceptor";
import {DOCUMENT} from "@angular/common";
import {inject} from "@angular/core";
import {environment} from "../environments/environment";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

function bootstrapGoogleMaps(doc: Document): () => void {
  return () => {
    const key = environment.googleMapsKey;
    const c = 'google', l = 'importLibrary', q = '__ib__';
    const win = doc.defaultView as any;
    const b = win[c] || (win[c] = {});
    const d = b.maps || (b.maps = {});
    const r = new Set<string>();
    const e = new URLSearchParams();
    let h: Promise<void>;
    const u = () => h || (h = new Promise<void>(async (resolve, reject) => {
      const a = doc.createElement('script');
      e.set('libraries', [...r].join(','));
      e.set('v', 'weekly');
      e.set('key', key);
      e.set('callback', `${c}.maps.${q}`);
      a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
      (d as any)[q] = resolve;
      a.onerror = () => reject(new Error('Google Maps JavaScript API could not load.'));
      a.nonce = (doc.querySelector('script[nonce]') as HTMLScriptElement)?.nonce || '';
      doc.head.append(a);
    }));
    if (d[l]) {
      console.warn('Google Maps only loads once.');
    } else {
      (d as any)[l] = (f: string, ...n: string[]) => { r.add(f); return u().then(() => (d as any)[l](f, ...n)); };
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const doc = inject(DOCUMENT);
        return bootstrapGoogleMaps(doc);
      },
      multi: true
    },
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        defaultLanguage: 'en',
        useDefaultLang: true
      })
    )
  ]
};
