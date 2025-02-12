import { Component } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { ChatRequest, ChatResponse } from '../../core/models/chat.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
    providers: [ChatService],
  
})
export class ChatComponent {
  chatForm: FormGroup;
  respuesta?: ChatResponse;
  isLoading = false;

  constructor(private chatService: ChatService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.chatForm = this.fb.group({
      consulta: ['', Validators.required],
      placa: ['', [Validators.required, Validators.pattern('^[A-Z0-9-]+$')]]
    });
  }

  enviarConsulta() {
    if (this.chatForm.invalid) {
      this.mostrarMensaje('Complete los campos correctamente', 'Cerrar');
      return;
    }

    this.isLoading = true;
    const chatRequest: ChatRequest = this.chatForm.value;

    this.chatService.enviarConsulta(chatRequest).subscribe(
      (resp) => {
        this.respuesta = resp;
        this.isLoading = false;
      },
      () => {
        this.mostrarMensaje('Error al obtener respuesta', 'Cerrar');
        this.isLoading = false;
      }
    );
  }

  mostrarMensaje(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, { duration: 3000 });
  }
}
