import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RealityFilterList } from './types';
import { Router } from '@angular/router';
import { REAL_ESTATE } from '../shared/constants';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private route: Router) {}
  public realityFilterList: Array<RealityFilterList> = REAL_ESTATE.map(
    (item) => ({
      name: item.name,
      icon: item.icon,
    })
  );

  public navigateToFilter(filter: RealityFilterList): void {
    this.route.navigate([`hledej/${filter.name}`]);
  }
}
