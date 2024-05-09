import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RealityFilterList } from './types';
import { Router } from '@angular/router';
import { REAL_ESTATE } from '../shared/constants';
import { ApiService } from '../shared/api/api.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private route = inject(Router);
  private api = inject(ApiService);
  public realityCount: number = 0;
  public realityFilterList: Array<RealityFilterList> = REAL_ESTATE.map((item) => ({
    name: item.name,
    icon: item.icon,
  }));
  public navigateToFilter(filter: RealityFilterList): void {
    this.route.navigate([`hledej/${filter.name}`]);
  }
  ngOnInit(): void {
    this.api
      .get<number>('count')
      .pipe(take(1))
      .subscribe((count) => {
        this.realityCount = count;
      });
  }
}
