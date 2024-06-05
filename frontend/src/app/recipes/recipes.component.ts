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

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: any[] = [];

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  public content: string | undefined;
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

  uploadFile(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.apiService.uploadRecipe(formData).subscribe(response => {
      this.content = this.getFormattedContent(response.Content);
    });
  }

  getFormattedContent(content: string): string {
    return content.replace(/\n/g, '<br>');
  }

  editRecipe(recipe: any) {
    this.dialog.open(EditRecipeModalComponent, {
      data: recipe,
      minWidth: '700px',
    })
    .afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  deleteRecipe(recipe: any) {
    this.apiService.deleteRecipe(recipe.recipeId).subscribe(response => {
      this.refresh();
    });
  }
}
