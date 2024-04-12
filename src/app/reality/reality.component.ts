import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { MapsComponent } from '../shared/components/maps/maps.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeftLong,
  faEnvelope,
  faPhone,
  faShare,
  faStar,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SwiperContainer } from 'swiper/element';

export interface RealityIcons {
  user: IconDefinition;
  email: IconDefinition;
  phone: IconDefinition;
  back: IconDefinition;
  star: IconDefinition;
  share: IconDefinition;
}
@Component({
  selector: 'app-reality',
  standalone: true,
  imports: [CommonModule, MapsComponent, FontAwesomeModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './reality.component.html',
  styleUrl: './reality.component.scss',
})
export class RealityComponent {
  @ViewChild('swiper') swiperEl!: ElementRef<SwiperContainer>;
  testStar = false;
  private router = inject(Router);
  public icons: RealityIcons = {
    user: faUser,
    email: faEnvelope,
    phone: faPhone,
    back: faArrowLeftLong,
    star: faStar,
    share: faShare,
  };
  public navigateToSearch(): void {
    this.router.navigate(['/hledej/byty/query']);
  }
}
