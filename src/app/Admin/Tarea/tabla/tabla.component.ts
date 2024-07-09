import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from '../Service/Usuario/usuario.service';
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent {
  personas: any[] = [];
  constructor(
  private usuarioService: UsuarioService) {}
  ngOnInit() {
    this.obtenerPersonas();
  }

  obtenerPersonas() {
    this.usuarioService.getAll().subscribe(
      data => {
        this.personas = data;
      },
      error => {
        console.error('Error al obtener personas', error);
      }
    );
  }
  eliminarPersona(id: number) {
    if (confirm('¿Está seguro de que desea eliminar esta persona?')) {
      this.usuarioService.delete(id).subscribe(
        () => {
          this.personas = this.personas.filter(persona => persona.id !== id);
        },
        error => {
          console.error('Error al eliminar persona', error);
        }
      );
    }
  }

 

}
