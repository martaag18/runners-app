import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

// Definimos una interfaz para los datos que se enviarán al modal
export interface EditEventData {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-pop-up',

  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})

export class PopUpComponent {
  // Inyectamos el servicio de diálogo y los datos que se pasan al abrir el modal.
  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditEventData
  ) {}

  
  onCancel(): void {
    this.dialogRef.close();
  }
}
