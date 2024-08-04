import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private titleSource = new BehaviorSubject<string>('Amount');
  private breadcrumbSource = new BehaviorSubject<string[]>([
    'Home',
    'About Us',
    'Amount',
  ]);

  title$ = this.titleSource.asObservable();
  breadcrumb$ = this.breadcrumbSource.asObservable();

  updateTitle(title: string) {
    this.titleSource.next(title);
  }

  updateBreadcrumb(breadcrumb: string[]) {
    this.breadcrumbSource.next(breadcrumb);
  }
}
