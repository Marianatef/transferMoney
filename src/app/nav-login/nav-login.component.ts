import { Component, ElementRef, HostListener, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-login',
  templateUrl: './nav-login.component.html',
  styleUrls: ['./nav-login.component.css']
})
export class NavLoginComponent implements OnInit {
  @ViewChild('dropdown', { static: true }) dropdown!: ElementRef;

  userName: string = 'Marian Atef';
  userInitials: string = 'MA';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    this.authService.getUserDetails().subscribe({
      next: (user: { username: string; }) => {
        this.setUser(user.username); // Assuming the API response includes a 'username' field
      },
      error: (err: any) => {
        console.error('Error fetching user details', err);
      }
    });
  }

  setUser(name: string): void {
    this.userName = name;
    this.userInitials = name ? name.substring(0, 2).toUpperCase() : '';
  }

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.dropdown.nativeElement.classList.toggle('active');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.dropdown.nativeElement.contains(event.target)) {
      this.dropdown.nativeElement.classList.remove('active');
    }
  }
}
