import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
@Component({
  selector: 'app-money-header',
  templateUrl: './money-header.component.html',
  styleUrl: './money-header.component.css',
})
export class MoneyHeaderComponent implements OnInit {
  title: string = '';
  breadcrumb: string[] = [];

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.title$.subscribe((title) => (this.title = title));
    this.headerService.breadcrumb$.subscribe(
      (breadcrumb) => (this.breadcrumb = breadcrumb)
    );
  }
}
