import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, LOCALE_ID, ViewChild, inject } from '@angular/core';
import { MapsComponent } from '../shared/components/maps/maps.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeftLong,
  faEnvelope,
  faGavel,
  faPhone,
  faShare,
  faSpinner,
  faStar,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgOptimizedImage, registerLocaleData } from '@angular/common';
import localeCs from '@angular/common/locales/cs';
import { SwiperContainer } from 'swiper/element';
import { ApiService } from '../shared/api/api.service';
import { Subject, take } from 'rxjs';
import { MapsService } from '../shared/components/maps/services/maps.service';
import { RealityLocationPipe } from '../search/search-result/pipes/reality-location.pipe';
import { RealityNamePipe } from './pipes/reality-name.pipe';
import { Reality } from '../shared/reality-list/types';
import { FavoriteRealityPipe } from './pipes/favorite-reality.pipe';
import { UserService } from '../shared/auth/user.service';
import { ImagePathPipe } from '../shared/pipes/image-path.pipe';
import { EnergyColorCodePipe } from './pipes/energy-color-code.pipe';
import { SwiperConfig } from './config/swiper-config';
import { SnackbarService } from '../shared/components/snackbar/services/snackbar.service';
import { ModalService } from '../shared/modal/modal.service';
import { ConfirmComponent } from '../shared/components/confirm-delete/confirm.component';
import { DelimiterPipe } from './pipes/delimiter.pipe';

export interface RealityIcons {
  user: IconDefinition;
  email: IconDefinition;
  phone: IconDefinition;
  back: IconDefinition;
  star: IconDefinition;
  share: IconDefinition;
  loading: IconDefinition;
  report: IconDefinition;
}
export interface WatchedRealityMessage {
  message: 'Nesleduji' | 'Sleduji';
}
@Component({
  selector: 'app-reality',
  standalone: true,
  imports: [
    CommonModule,
    MapsComponent,
    FontAwesomeModule,
    NgOptimizedImage,
    RealityLocationPipe,
    RealityNamePipe,
    FavoriteRealityPipe,
    ImagePathPipe,
    EnergyColorCodePipe,
    DelimiterPipe,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'cs-CZ' }, ModalService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './reality.component.html',
  styleUrl: './reality.component.scss',
})
export class RealityComponent {
  constructor() {
    registerLocaleData(localeCs);
  }
  @ViewChild('swiper') swiperEl!: ElementRef<SwiperContainer>;
  public reality$: Subject<Reality> = new Subject<Reality>();
  public onWatchedChange: boolean = false;
  private api = inject(ApiService);
  private snackbar = inject(SnackbarService);
  private modal = inject(ModalService);
  private user = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public maps = inject(MapsService);
  public showShareModal = false;
  public shareLinkValue = window.location.href;
  public icons: RealityIcons = {
    user: faUser,
    email: faEnvelope,
    phone: faPhone,
    back: faArrowLeftLong,
    star: faStar,
    share: faShare,
    loading: faSpinner,
    report: faGavel,
  };

  public test = ['price', 'ownership_type', 'floor', 'area', 'building_material', 'condition', 'furniture'];
  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const uuid = params['uuid'];
      this.loadReality(uuid);
    });
  }

  ngAfterViewChecked(): void {
    this.reality$.subscribe((reality) => {
      setTimeout(() => {
        const swiperInstance = this.swiperEl.nativeElement as SwiperContainer;
        Object.assign(swiperInstance, SwiperConfig);
        swiperInstance.initialize();
      }, 1);
    });
  }
  public report(uuid: string): void {
    this.modal
      .open<ConfirmComponent, boolean>(ConfirmComponent, 'Opravdu chcete nahlásit realitu?', {
        input: uuid,
        message: 'nahlásit',
      })
      .subscribe((response) => {
        if (response)
          this.api
            .post<{ message: string }>('user/report', { uuid })
            .pipe(take(1))
            .subscribe({
              next: (response) => {
                this.snackbar.open(response.message, 'bg-green-500', 3000);
              },
            });
      });
  }
  public shareLink(): void {
    this.showShareModal = !this.showShareModal;
  }
  public toggleFavorite(uuid: string): void {
    this.api
      .post<WatchedRealityMessage>('user/favorite', { uuid })
      .pipe(take(1))
      .subscribe({
        next: async (watched) => {
          await this.user.get();
          this.onWatchedChange = !this.onWatchedChange;
        },
        error: (err) => {
          throw new Error(err);
        },
      });
  }
  public navigateToSearch(): void {
    this.router.navigate(['/hledej/byty/query']);
  }
  private loadReality(uuid: string): void {
    this.api
      .get<Reality>(`estate/${uuid}`)
      .pipe(take(1))
      .subscribe({
        next: (reality) => {
          this.reality$.next(reality);
          this.maps.list = [reality];
          this.maps.selected = reality;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
