import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from '../../../core/services/vehiculo.service';
import { Vehiculo } from '../../../core/models/vehiculo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';  // <-- IMPORTA ESTO

@Component({
  selector: 'app-vehiculo-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  templateUrl: './vehiculo-detail.component.html',
  styleUrls: ['./vehiculo-detail.component.scss'],
  providers: [VehiculoService],
})
export class VehiculoDetailComponent implements OnInit {
  vehiculo?: Vehiculo;
  isLoading = true;

  constructor(
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vehiculoService.findByPlaca(id).subscribe(
        (data) => {
          this.vehiculo = data;
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this.mostrarMensaje('No se encontró el vehículo', 'Cerrar');
          this.router.navigate(['/vehiculos']);
        }
      );
    }
  }

  mostrarMensaje(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, { duration: 3000 });
  }

  volver() {
    this.router.navigate(['/vehiculos']);
  }
}
