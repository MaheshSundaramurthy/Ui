import { NgModule } from '@angular/core';
import {Http, RequestOptions, HttpModule} from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppState } from '../../../app.service';
import { LogoutComponent } from './logout.component';

export const DS_JWT_TOKEN_NAME = 'token';

export function authHttpServiceFactory(appState: AppState, http: Http, options: RequestOptions) {
    // @todo There is a bug in angular2-jwt causing it to ignore the custom configurations below making them effectively pointless.
    // @todo ... so for the time being we are mimicking default configs until the bug is resloved.
    return new AuthHttp(new AuthConfig({
        tokenName: DS_JWT_TOKEN_NAME,
        tokenGetter: (() => localStorage.getItem(DS_JWT_TOKEN_NAME)),
        globalHeaders: [{'Content-Type':'application/json'}],
    }), http, options);
}

@NgModule({
    imports: [
        HttpModule
    ],
    declarations: [
        LogoutComponent
    ],
    providers: [
        // Providers have been adopted by the shared.module for static exporting
    ]
})
export class DsAuthModule {

    constructor(protected appState: AppState) {
        appState.set('jwtTokenName', DS_JWT_TOKEN_NAME);
    }
}