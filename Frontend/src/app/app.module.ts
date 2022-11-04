import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { GeneratorPasswordComponent } from './components/generator-password/generator-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    GeneratorPasswordComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
