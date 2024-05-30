import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: any = [];

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  public content: string | undefined;
  constructor(private apiService: ApiService) { }

  uploadFile(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.apiService.uploadRecipe(formData).subscribe(response => {
      this.content = this.getFormattedContent(response.Content);
    });
  }

  ngOnInit(): void {
    // this.apiService.getRecipes().subscribe(response => {
    //   console.log(response);
    // });
  }

  getFormattedContent(content: string): string {
    return content.replace(/\n/g, '<br>');
  }
  
}
