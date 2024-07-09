import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EditRecipeModalComponent } from '../edit-recipe-modal/edit-recipe-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from '../services/spinner-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recipe } from '../models/recipe';
import { finalize } from 'rxjs';
import { AddRecipeModalComponent } from '../add-recipe-modal/add-recipe-modal.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Confirmation } from '../models/confirmation';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: any[] = [];

  
  public displayedColumns: string[] = ['name', 'actions'];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private apiService: ApiService, 
    private dialog: MatDialog, 
    private spinnerService: SpinnerService, 
    private snackBar: MatSnackBar
  ) { 
  }

  ngOnInit(): void {
   this.refresh();
  }

  refresh() {
    this.spinnerService.show();

    this.apiService.getRecipes()
    .pipe(finalize(() => this.spinnerService.hide()))
    .subscribe({
      next: (response: Recipe[]) => {
        this.recipes = response;
        this.dataSource.data = this.recipes;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (error: any) => {
        this.snackBar.open(error.message, 'Close');
      },
      complete: () => {
        this.spinnerService.hide();
      }
    });
  }

  addRecipe(){
    this.dialog.open(AddRecipeModalComponent, {
      minWidth: '700px',
    })
    .afterClosed().subscribe((createdRecipe:Recipe) => {
      if(createdRecipe){
        this.editRecipe(createdRecipe);
      }
  });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRecipe(recipe: Recipe) {
    this.dialog.open(EditRecipeModalComponent, {
      data: recipe,
      minWidth: '700px',
    })
    .afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  deleteRecipe(recipe: Recipe) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: new Confirmation({
        title: 'Delete Recipe',
      message: 'Are you sure you want to delete this recipe?'
      }),
      minWidth: '700px',
    })
    .afterClosed().subscribe((response: boolean) => {
      if (response) {
        this.apiService.deleteRecipe(recipe.id, recipe.recipeId).subscribe({
          next: () => {
            this.snackBar.open("Recipe deleted", 'Close');
            this.refresh();
          },
          error: (error: any) => {
            this.snackBar.open(error.message, 'Close');
          }
        });
      } else {
        this.refresh();
      }
    });
   
  }
}
