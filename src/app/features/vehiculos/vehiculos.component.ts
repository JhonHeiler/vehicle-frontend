import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../core/models/vehiculo.model';
import { VehiculoService } from '../../core/services/vehiculo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    HttpClientModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule       
  ],
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss'],
  providers: [VehiculoService],
})
export class VehiculosComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  isLoading = true;

  pageSize = 6;
  currentPage = 0;


  searchText: string = '';

  constructor(
    private vehiculoService: VehiculoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.vehiculoService.getAll().subscribe(
      (data) => {
        this.vehiculos = data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.mostrarMensaje('Error al cargar los vehículos', 'Cerrar');
      }
    );
  }


  get filteredVehiculos(): Vehiculo[] {
    return this.vehiculos.filter(v =>
      v.placa.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get paginatedVehiculos(): Vehiculo[] {
    const filtered = this.filteredVehiculos;
    const startIndex = this.currentPage * this.pageSize;
    return filtered.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }


  onSearchChange() {
    this.currentPage = 0;
  }

  eliminarVehiculo(id?: number) {
    if (!id) return;
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculoService.delete(id).subscribe(
          () => {
            this.vehiculos = this.vehiculos.filter((v) => v.id !== id);
            this.mostrarAlerta('Vehículo eliminado con éxito', 'success');
          },
          () => this.mostrarAlerta('Error al eliminar el vehículo', 'error')
        );
      }
    });
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

  mostrarMensaje(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, { duration: 3000 });
  }

  navegarA(ruta: string) {
    this.router.navigate([ruta]);
  }
}