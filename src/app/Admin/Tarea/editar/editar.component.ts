import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../Service/Usuario/usuario.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  personaForm: FormGroup;
  usuarioId: number = 0;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.personaForm = this.fb.group({
      nombre: [''],
      email: [''],
      telefono: [''],
      imagen: [''],
      fecha_nacimiento: [''],
      comentario: ['']
    });
  }

  ngOnInit(): void {
    // Asegúrate de que estás obteniendo el ID de la URL correctamente
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.usuarioId = +idParam; // Convierte el parámetro a número
        this.cargarUsuario();
      }
    });
  }

  cargarUsuario(): void {
    this.usuarioService.getById(this.usuarioId).subscribe(usuario => {
      // Formatea la fecha de nacimiento a YYYY-MM-DD
      if (usuario.fecha_nacimiento) {
        usuario.fecha_nacimiento = new Date(usuario.fecha_nacimiento).toISOString().split('T')[0];
      }
      this.personaForm.patchValue(usuario);
    }, error => {
      console.error('Error al obtener usuario:', error);
    });
  }

  onSubmit(): void {
    if (this.personaForm.valid) {
      this.usuarioService.update(this.usuarioId, this.personaForm.value).subscribe(() => {
        this.router.navigate(['/tabla']);
      }, error => {
        console.error('Error al actualizar usuario:', error);
      });
    }
  }
}
