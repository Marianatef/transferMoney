import { Component } from '@angular/core';
import { HeaderService } from '../../services/header.service';
@Component({
  selector: 'app-no-profile',
  templateUrl: './no-profile.component.html',
  styleUrl: './no-profile.component.css',
})
export class NoProfileComponent {
  constructor(private headerService: HeaderService) {}
  ngOnInit() {
    this.headerService.updateTitle('My Account');
    this.headerService.updateBreadcrumb(['Home', 'My Account']);
  }
}
