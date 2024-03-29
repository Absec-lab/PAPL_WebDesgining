import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PortalModule } from './portal/portal.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button"
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PortalModule,
    HttpClientModule,
    NgxUiLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    RippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
