import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareaRoutingModule } from './tarea-routing.module';
import { FormularioComponent } from './formulario/formulario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaComponent } from './tabla/tabla.component';
import { HttpClientModule, HttpClient, HttpClientXsrfModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { EditarComponent } from './editar/editar.component';

@NgModule({
  declarations: [
    FormularioComponent,
    TablaComponent,
    MenuComponent,
    EditarComponent,
  ],
  imports: [
    CommonModule,
    TareaRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ]

})
export class TareaModule { }
