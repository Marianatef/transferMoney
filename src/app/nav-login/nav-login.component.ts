import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-login',
  templateUrl: './nav-login.component.html',
  styleUrls: ['./nav-login.component.css'],
})
export class NavLoginComponent implements OnInit {
  @ViewChild('dropdown', { static: true }) dropdown!: ElementRef;

  userName: string = '';
  userInitials: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {} // Inject AuthService and Router

  ngOnInit() {
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    this.userService.getUserDetails().subscribe({
      next: (user: { username: string }) => {
        this.setUser(user.username);
        this.errorMessage = '';
      },
      error: (err: any) => {
        console.error('Error fetching user details', err);
        this.userName = 'Guest';
        this.userInitials = 'GU';
        this.errorMessage =
          'Failed to fetch user details. Please try again later.';
      },
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

  logout(): void {
    this.authService.logout(); // Clear authentication token
    this.router.navigate(['/home']); // Redirect to home page or login page
  }
}
