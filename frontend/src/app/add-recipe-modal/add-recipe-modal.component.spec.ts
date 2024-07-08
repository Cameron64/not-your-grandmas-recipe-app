import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeModalComponent } from './add-recipe-modal.component';

describe('AddRecipeModalComponent', () => {
  let component: AddRecipeModalComponent;
  let fixture: ComponentFixture<AddRecipeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecipeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRecipeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
