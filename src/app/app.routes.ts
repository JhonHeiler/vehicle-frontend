import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { VehiculosComponent } from './features/vehiculos/vehiculos.component';
import { VehiculoFormComponent } from './features/vehiculos/vehiculo-form/vehiculo-form.component';
import { VehiculoDetailComponent } from './features/vehiculos/vehiculo-detail/vehiculo-detail.component';
import { ChatComponent } from './features/chat/chat.component'; // Importa el componente

export const routes: Routes = [
  { path: '', redirectTo: 'vehiculos', pathMatch: 'full' },
  { path: 'vehiculos', component: VehiculosComponent },
  { path: 'vehiculos/nuevo', component: VehiculoFormComponent },
  { path: 'vehiculos/editar/:id', component: VehiculoFormComponent },
  { path: 'vehiculos/detalle/:id', component: VehiculoDetailComponent },
  { path: 'chat', component: ChatComponent }, // Nueva ruta agregada
  { path: '**', redirectTo: 'vehiculos' } // Redirigir rutas incorrectas
];

export const appRouting = provideRouter(routes);
