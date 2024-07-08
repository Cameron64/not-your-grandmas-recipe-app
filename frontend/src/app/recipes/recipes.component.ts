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
      this.refresh();
      this.editRecipe(createdRecipe);
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
    this.apiService.deleteRecipe(recipe.recipeId).subscribe(response => {
      this.refresh();
    });
  }
}
