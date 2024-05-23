import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers';
import { UserEffects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    declarations: [
        HeaderComponent,
        AppComponent,
        UserListComponent,
        UserDetailsComponent
    ],
    providers: [], bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        StoreModule.forRoot({ user: userReducer }),
        EffectsModule.forRoot([UserEffects]),
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        LoadingSpinnerComponent
    ]
})
export class AppModule { 
}
