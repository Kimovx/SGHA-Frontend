import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CameraService } from '../../../../../Services/camera.service';
import { AiImage, AiImagesResponse } from '../../../../Model View/AiImages';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-image-profile',
  standalone: true,
  imports: [
    SideNavComponent,
    NgbCarouselModule,
  ],
  templateUrl: './image-profile.component.html',
  styleUrl: './image-profile.component.css'
})
export class ImageProfileComponent implements OnInit {
  @ViewChild('imagePreview') imagePreviewModal: any;

  selectedImageUrl: string = '';
  imageId!: number;
  imageData: AiImage;
  isLoading: boolean;

  constructor(
    private cameraService: CameraService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.imageData = {} as AiImage;
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.getImageId();
    this.getImageById();
  }

  openImageModal(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
    this.modalService.open(this.imagePreviewModal, {
      centered: true,
      size: 'xl',
      backdropClass: 'bg-dark bg-opacity-75'
    });
  }
  
  getImageId() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.imageId = +data.get('image-id')!;
    })
  }

  async getImageById() {
    this.imageData = await firstValueFrom(this.cameraService.getDetectedImageById(this.imageId));
    console.log(this.imageData);
    this.isLoading = false;
  }
}
