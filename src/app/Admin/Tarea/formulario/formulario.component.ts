import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../Service/Usuario/usuario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  usuarioForm: FormGroup;
  personas: any[] = [];

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.usuarioForm = this.fb.group({
      nombre: ['Derek Martin', Validators.required],
      email: ['xderekmartin14x@hotmail.com', [Validators.required, Validators.email]],
      telefono: ['0986746913'],
      imagen: ['https://example.com/imagen.jpg'],
      fecha_nacimiento: ['1990-05-15'],
      comentario: ['Opcional']
    });
  }

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

  onSubmit() {
    if (this.usuarioForm.valid) {
      const usuarioData = this.usuarioForm.value;

      this.usuarioService.create(usuarioData).subscribe(
        response => {
          console.log('Usuario creado correctamente:', response);
          this.obtenerPersonas(); // Actualizar la lista de personas después de crear una nueva
        },
        error => {
          console.error('Error al crear usuario:', error);
        }
      );
    } else {
      console.error('Formulario inválido. Revise los campos.');
    }
  }
}
