import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {NgxImageCompressService} from 'ngx-image-compress';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from './core/interceptors/token-interceptor.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    SharedModule
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    NgxImageCompressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
