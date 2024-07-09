import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { TablaComponent } from '../Tarea/tabla/tabla.component'
import { EditarComponent } from './editar/editar.component';
{EditarComponent}
const routes: Routes = [
  { path: 'formulario', component: FormularioComponent },
  { path: 'tabla', component: TablaComponent },
  { path: 'editar/:id', component: EditarComponent },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareaRoutingModule { }
