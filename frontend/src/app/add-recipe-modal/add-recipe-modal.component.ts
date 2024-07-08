import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpinnerService } from '../services/spinner-service';
import { ApiService } from '../api.service';
import { Recipe } from '../models/recipe';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-recipe-modal',
  templateUrl: './add-recipe-modal.component.html',
  styleUrls: ['./add-recipe-modal.component.scss']
})
export class AddRecipeModalComponent {
  _dialogRef: MatDialogRef<AddRecipeModalComponent>;
  _spinnerService: SpinnerService;
  _apiService: ApiService;


  public content: Recipe | undefined;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Recipe,
  spinnerservice: SpinnerService, apiService: ApiService, dialogRef: MatDialogRef<AddRecipeModalComponent>,
  private snackBar: MatSnackBar
) {
    this._spinnerService = spinnerservice;
    this._apiService = apiService;
    this._dialogRef = dialogRef;
   }

   uploadFile(file: File) {
    this._spinnerService.show();
    const formData = new FormData();
    formData.append('file', file);

    this._apiService.uploadRecipe(formData).subscribe({
      next: (response: Recipe) => {
        this._dialogRef.close(response)
      },
      error: (error: any) => {
        this.snackBar.open(error.message, 'Close');
      },
      complete: () => {
        this._spinnerService.hide();
      }
    });
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.uploadFile(files[0]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.uploadFile(file);
    }
  }

}
