import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from '../models/recipe';
import { SpinnerService } from '../services/spinner-service';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-recipe-modal',
  templateUrl: './edit-recipe-modal.component.html',
  styleUrls: ['./edit-recipe-modal.component.scss']

})
export class EditRecipeModalComponent implements OnInit{
  recipeForm: any;
  _dialogRef: MatDialogRef<EditRecipeModalComponent>;
  _spinnerService: SpinnerService;
  _apiService: ApiService;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Recipe, private fb: FormBuilder, spinnerservice: SpinnerService, 
  apiService: ApiService, dialogRef: MatDialogRef<EditRecipeModalComponent>, private snackBar: MatSnackBar
) {
    this._spinnerService = spinnerservice;
    this._apiService = apiService;
    this._dialogRef = dialogRef;
   }
  ngOnInit(): void {
    this.recipeForm = this.fb.group({
    recipeId: [this.data.recipeId, Validators.required],
    id: [this.data.id],
    name: [this.data.name, Validators.required],
    ingredients: this.fb.array(this.data.ingredients.map(ingredient => this.fb.control(ingredient, Validators.required))),
    steps: this.data.steps != null ? this.fb.array(this.data.steps.map(step => this.fb.control(step, Validators.required))) : this.fb.array([])
  });
   
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }
  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addStep() {
    this.steps.push(this.fb.control('', Validators.required));
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this._spinnerService.show();
      //editRecipe
      this._apiService.editRecipe(this.recipeForm.value).subscribe({
        next: (response: { Content: any; }) => {
          this.close();
        },
        error: (error: any) => {
          this.snackBar.open(error.message, 'Close');
        },
        complete: () => {
          this._spinnerService.hide();
        }
      });
    }
  }
  

    close() {
      this._dialogRef.close();
    }
  }
