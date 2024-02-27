import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, TuiErrorModule, TuiLabelModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapperModule } from "./wrapper/wrapper.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TuiValidatorModule } from "@taiga-ui/cdk";
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputPhoneModule } from "@taiga-ui/kit";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      BrowserAnimationsModule,
      TuiRootModule,
      TuiDialogModule,
      TuiAlertModule,
      WrapperModule,
      HttpClientModule,
      TuiValidatorModule,
      TuiFieldErrorPipeModule,
      TuiErrorModule,
      TuiLabelModule,
      TuiInputModule,
      TuiInputPhoneModule,

],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
