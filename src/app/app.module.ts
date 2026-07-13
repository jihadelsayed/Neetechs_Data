import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { JwtInterceptor } from './authorization/Jwt-interceptor.interceptor';
import { AuthGuard } from './authorization/services/auth.guard';
import { NotAuthGuard } from './authorization/services/not-auth.guard';
import { HeaderComponent } from './header/header.component';
import { LoginMenuComponent } from './header/login-menu/login-menu.component';
import { AsideContentComponent } from './header/menu/menu-content/sub-menu/sub-menu-content/aside/aside-content/aside-content.component';
import { AsideComponent } from './header/menu/menu-content/sub-menu/sub-menu-content/aside/aside.component';
import { SubMenuContentComponent } from './header/menu/menu-content/sub-menu/sub-menu-content/sub-menu-content.component';
import { SubMenuComponent } from './header/menu/menu-content/sub-menu/sub-menu.component';
import { MenuContentComponent } from './header/menu/menu-content/menu-content.component';
import { MenuComponent } from './header/menu/menu.component';
import { UserMenuComponent } from './header/user-menu/user-menu.component';
import { UserNotificationsMenuComponent } from './header/user-notifications-menu/user-notifications-menu.component';
import { HomeComponent } from './home/home.component';
import { LanguageInterceptorInterceptor } from './language-interceptor.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { SelectionLoaderModule } from './spinner/selection-loader/selection-loader.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    LoginMenuComponent,
    UserMenuComponent,
    UserNotificationsMenuComponent,
    MenuComponent,
    AsideComponent,
    AsideContentComponent,
    MenuContentComponent,
    SubMenuComponent,
    SubMenuContentComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    SelectionLoaderModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptorInterceptor, multi: true },
    NotAuthGuard,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
