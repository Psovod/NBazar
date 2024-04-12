import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModalService } from '../shared/modal/modal.service';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { RealityCreateComponent } from '../reality/reality-create/reality-create/reality-create.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  providers: [ModalService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  constructor(private modalService: ModalService) {}
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public realityList: any[] = [
    {
      name: 'Byt 2+1',
      price: 1000000,
      location: 'Praha',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Byt 2+1',
      price: 1000000,
      location: 'Praha',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Byt 2+1',
      price: 1000000,
      location: 'Praha',
      image: 'https://via.placeholder.com/150',
    },
  ];
  public modalEdit(realityList: any): void {
    this.modalService
      .open(ModalComponent, 'Editace ', 'MOdal')
      .subscribe((res) => {
        console.log(res);
      });
  }
  public createReality() {
    this.modalService
      .open(RealityCreateComponent, 'Editace ', 'Create')
      .subscribe((res) => {
        console.log(res);
      });
  }
  ngOnInit(): void {
    this.loading$.next(true);
    setTimeout(() => {
      this.loading$.next(false);
    }, 200);
  }
}
