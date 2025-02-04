import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EditEventData } from '../../../../shared/interfaces/calendar.interface';
import { inject } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})

export class PopUpComponent {

  public dialogRef = inject<MatDialogRef<PopUpComponent>>(MatDialogRef);
  public data = inject<EditEventData>(MAT_DIALOG_DATA); //Token de Angular que representa los datos enviados al abrir el modal

  
  onCancel(): void {
    this.dialogRef.close();
  }
}

/*FLUJO CODIGO 
1. Padre (CalendarComponent) envia datos al hijo al abrir el modal --> this.dialog.open()
2. Angular Material asocia este objeto al token MAT_DIALOG_DATA dentro del contexto hijo
3. El hijo, recibe los datos y los usa --> Si usuario edita campos, cambios se reflejan automáticamente en el objeto data gracias a [(ngModel)] -> two way data binding
4. Al cerrarse, hijo envia respuesta al padre 
5. Padre caprura valor devuelto -> envía respuesta a API
*/
