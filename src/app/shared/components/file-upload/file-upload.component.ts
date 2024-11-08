import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RealityCreateOptions } from '../../../reality/reality-create/types';
import { ImagePathPipe } from '../../pipes/image-path.pipe';

@Component({
  selector: 'custom-file-upload',
  standalone: true,
  imports: [FontAwesomeModule, ImagePathPipe],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  public deleteIcon: IconDefinition = faTrash;
  public files: Array<string> = [];
  private removedFiles: Array<string> = [];
  @Input() public item!: RealityCreateOptions;
  @Output() public onImageChange: EventEmitter<Array<string>> = new EventEmitter();
  @Output() public onImageRemove: EventEmitter<Array<string>> = new EventEmitter();
  ngOnInit(): void {
    if (this.item.value) {
      this.files = this.item.value as Array<string>;
    }
  }
  public containsBlobUrl(image: string): boolean {
    return image.startsWith('blob:');
  }
  public addFile(file: File) {
    if (file.type.match('image.*')) {
      this.files.push(URL.createObjectURL(file));
      this.item.value = this.files;
      this.onImageChange.emit(this.files);
    }
  }
  public removeImage(index: number) {
    if (this.files[index].startsWith('blob:')) {
      URL.revokeObjectURL(this.files[index]);
    } else {
      this.removedFiles.push(this.files[index]);
      this.onImageRemove.emit(this.removedFiles);
    }
    this.files.splice(index, 1);
  }
  public selectImages(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files ? Array.from(target.files) : [];
    for (const file of files) {
      this.addFile(file);
    }
  }
  public dropHandler(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files ? Array.from(event.dataTransfer.files) : [];
    for (const file of files) {
      this.addFile(file);
    }
  }
}
