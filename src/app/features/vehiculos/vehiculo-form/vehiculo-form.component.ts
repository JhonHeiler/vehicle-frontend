import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VehiculoService } from '../../../core/services/vehiculo.service';
import { Vehiculo } from '../../../core/models/vehiculo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-vehiculo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // ✅ Importación necesaria para el formGroup
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  templateUrl: './vehiculo-form.component.html',
  styleUrls: ['./vehiculo-form.component.scss'],
  providers: [VehiculoService],
})
export class VehiculoFormComponent implements OnInit {
  vehiculoForm!: FormGroup;
  isEditMode = false;
  isLoading = false;
  vehiculoId!:number;
  // Al usar "placa" como identificador, no se convierte a número
  vehiculoPlaca!: string;

  constructor(
    private fb: FormBuilder,
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Inicialización del formulario
    this.vehiculoForm = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern('^[A-Z0-9-]+$')]],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      serie: ['', Validators.required],
      color: ['', Validators.required]
    });

    // Si hay un parámetro 'id' en la URL, se asume que es para editar
    this.route.paramMap.subscribe(params => {
      const placa = params.get('id');
      if (!placa) return;

      this.isEditMode = true;
      this.vehiculoPlaca = placa;
      this.cargarVehiculo(placa);
    });
  }

  cargarVehiculo(placa: string) {
    this.isLoading = true;
    this.vehiculoService.findByPlaca(placa).subscribe(
      (data: Vehiculo) => {
        this.vehiculoForm.patchValue(data);
        this.vehiculoId = data.id ?? 0; // Asigna 0 si data.id es undefined
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.mostrarMensaje('Error al cargar el vehículo', 'Cerrar');
      }
    );
  }
  

  guardarVehiculo() {
    if (this.vehiculoForm.invalid) {
      this.mostrarMensaje('Complete todos los campos correctamente', 'Cerrar');
      return;
    }

    const vehiculo: Vehiculo = { ...this.vehiculoForm.value };
    this.isLoading = true;

    // Si está en modo edición se actualiza el vehículo
    if (this.isEditMode) {
      // Usamos la placa precargada o la del formulario
      this.vehiculoService.update(this.vehiculoId, vehiculo).subscribe(
        () => {
          this.mostrarMensaje('Vehículo actualizado correctamente', 'Cerrar');
          this.router.navigate(['/vehiculos']);
        },
        () => {
          this.mostrarMensaje('Error al actualizar el vehículo', 'Cerrar');
        }
      );
      return;
    }

    // Si no está en modo edición se crea un vehículo nuevo
    this.vehiculoService.create(vehiculo).subscribe(
      () => {
        this.mostrarMensaje('Vehículo registrado correctamente', 'Cerrar');
        this.router.navigate(['/vehiculos']);
      },
      () => this.mostrarMensaje('Error al registrar el vehículo', 'Cerrar')
    );
  }

  mostrarMensaje(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, { duration: 3000 });
    this.isLoading = false;
  }

  cancelar() {
    this.router.navigate(['/vehiculos']);
  }
}
