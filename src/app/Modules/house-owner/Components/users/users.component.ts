import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../../../../../Services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    SideNavComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[];
  isLoading: boolean;

  constructor(
    private usersService: UsersService
  ) {
    this.users = [];
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.getUsersByHouseId();
  }

  async getUsersByHouseId(): Promise<void>{
    this.isLoading = true;
    this.users = await firstValueFrom(this.usersService.getUsersByHouseId(1));
    this.isLoading = false;
  }

}
