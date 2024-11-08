import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from './types';

@Component({
  selector: 'custom-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Output() public onPageChange: EventEmitter<Pagination> = new EventEmitter<Pagination>();
  @Input() public pagination!: Pagination;

  public paginationIcons = {
    first: faAngleDoubleLeft,
    prev: faAngleLeft,
    next: faAngleRight,
    last: faAngleDoubleRight,
  };
  get pages() {
    return new Array(this.pagination.lastPage).fill(0).map((_, i) => i + 1);
  }
  set currentPage(page: number) {
    this.pagination.currentPage = page;
  }
  set itemsPerPage(items: number) {
    this.pagination.itemsPerPage = items;
  }
  onItemsPerPageChange() {
    this.pagination.currentPage = 1;
    this.onPageChange.emit(this.pagination);
  }
  handlePageChange(page: number) {
    this.pagination.currentPage = page;
    this.onPageChange.emit(this.pagination);
  }
}
