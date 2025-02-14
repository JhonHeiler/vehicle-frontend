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
import { MatPaginatorModule } from '@angular/material/paginator'; // Importa el módulo del paginator
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Importación necesaria para el formGroup
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatPaginatorModule  // Agregado para soportar <mat-paginator>
  ],
  templateUrl: './vehiculo-form.component.html',
  styleUrls: ['./vehiculo-form.component.scss'],
  providers: [VehiculoService],
})
export class VehiculoFormComponent implements OnInit {
  vehiculoForm!: FormGroup;
  isEditMode = false;
  isLoading = false;
  vehiculoId!: number;
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
        this.mostrarAlerta('Error al cargar el vehículo', 'error');
      }
    );
  }

  guardarVehiculo() {
    if (this.vehiculoForm.invalid) {
      this.mostrarAlerta('Complete todos los campos correctamente', 'error');
      return;
    }

    const vehiculo: Vehiculo = { ...this.vehiculoForm.value };
    this.isLoading = true;

    if (this.isEditMode) {
      this.vehiculoService.update(this.vehiculoId, vehiculo).subscribe(
        () => {
          this.mostrarAlerta('Vehículo actualizado correctamente', 'success').then(() => {
            this.router.navigate(['/vehiculos']);
          });
        },
        () => {
          this.isLoading = false;
          this.mostrarAlerta('Error al actualizar el vehículo', 'error');
        }
      );
      return;
    }

    this.vehiculoService.create(vehiculo).subscribe(
      () => {
        this.mostrarAlerta('Vehículo registrado correctamente', 'success').then(() => {
          this.router.navigate(['/vehiculos']);
        });
      },
      () => {
        this.isLoading = false;
        this.mostrarAlerta('Error al registrar el vehículo', 'error');
      }
    );
  }

  mostrarAlerta(mensaje: string, icon: 'success' | 'error') {
    return Swal.fire({
      icon: icon,
      title: mensaje,
      showConfirmButton: false,
      timer: 1500,
      position: 'top-end'
    });
  }

  cancelar() {
    this.router.navigate(['/vehiculos']);
  }
}
