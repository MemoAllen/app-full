import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeMX from '@angular/common/locales/es-MX';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './_service/cliente.service';
import { RouterModule,Route, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './clientes/form/form.component';
import {FormsModule} from '@angular/forms';
import localeES from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
registerLocaleData(localeMX, 'es');
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

registerLocaleData(localeMX, 'es');
const routes:Routes=[
  {path:'',redirectTo:'/clientes', pathMatch: 'full'},
  {path:'directivas', component: DirectivaComponent},
  {path:'clientes',component:ClientesComponent},
  {path:'clientes/formulario', component:FormComponent},
  {path:'clientes/formulario/:id', component:FormComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [ClienteService, {provide: LOCALE_ID, useValue:'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
