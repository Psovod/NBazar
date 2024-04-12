import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.scss',
})
export class WatchListComponent {
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
  ngOnInit(): void {
    this.loading$.next(true);
    setTimeout(() => {
      this.loading$.next(false);
    }, 2000);
  }
}
