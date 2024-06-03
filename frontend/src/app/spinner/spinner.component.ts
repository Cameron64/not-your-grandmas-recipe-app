import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner-service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isSpinnerVisible: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.isSpinnerVisible = this.spinnerService.spinner$;
  }

  ngOnInit(): void {}
}
