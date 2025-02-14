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
import { HttpClientModule } from '@angular/common/http';  // <-- IMPORTA ESTO
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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
    MatPaginatorModule 
  ],
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss'],
  providers: [VehiculoService],
})
export class VehiculosComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  isLoading = true; // Para mostrar spinner de carga

  // Propiedades para la paginación
  pageSize = 6;
  currentPage = 0;

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

  // Getter para obtener los vehículos de la página actual
  get paginatedVehiculos(): Vehiculo[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.vehiculos.slice(startIndex, startIndex + this.pageSize);
  }

  // Método que se dispara al cambiar de página
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  eliminarVehiculo(id?: number) {
    if (!id) return;

    if (confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
      this.vehiculoService.delete(id).subscribe(
        () => {
          this.vehiculos = this.vehiculos.filter((v) => v.id !== id);
          this.mostrarMensaje('Vehículo eliminado con éxito', 'Cerrar');
        },
        () => this.mostrarMensaje('Error al eliminar el vehículo', 'Cerrar')
      );
    }
  }

  mostrarMensaje(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, { duration: 3000 });
  }

  navegarA(ruta: string) {
    this.router.navigate([ruta]);
  }
}
