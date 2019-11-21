/*import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { CommonDataService } from '../service/common-data.service';
import { ItemService } from '../service/item.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-imageUpload',
  templateUrl: './imageUpload.component.html',
  styleUrls: ['./imageUpload.component.css']
})
export class ImageUploadComponent implements OnInit {

  uploadForm: FormGroup;

  public uploader:FileUploader = new FileUploader({
    isHTML5: true
  });
  title: string = 'Angular File Upload';
  constructor(private fb: FormBuilder, private http: HttpClient, 
    private itemService: ItemService, private toastr: ToastrService ) { }

  uploadSubmit(){
        for (let i = 0; i < this.uploader.queue.length; i++) {
          let fileItem = this.uploader.queue[i]._file;
          if(fileItem.size > 10000000){
            alert("Each File should be less than 10 MB of size.");
            return;
          }
        }
        for (let j = 0; j < this.uploader.queue.length; j++) {
          let data = new FormData();
          let fileItem = this.uploader.queue[j]._file;
          console.log(fileItem.name);
          data.append('file', fileItem);
          data.append('fileSeq', 'seq'+j);
          data.append( 'dataType', this.uploadForm.controls.type.value);
          this.itemService.upload(data).subscribe(data => {
            this.toastr.success('Image uploading!' + j + ' Completed', 'Image Uploading...',{
              timeOut: 2000
            });
          });
            
        }
        this.uploader.clearQueue();
  }



  

  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null],
      type:  [null, Validators.compose([Validators.required])]
    });
  }

}*/


import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ItemService } from '../service/item.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Image, Item } from 'src/models/request-criteria/itemRetrieve-criteria';
 
@Component({
  selector: 'app-imageUpload',
  templateUrl: './imageUpload.component.html',
  styleUrls: ['./imageUpload.component.css']
})
 
export class ImageUploadComponent implements OnInit {
 
  fileData: File = null;
  fileDataList: File[] =[];
  previewUrl_1:any = null;
  previewUrl_2:any = null;
  previewUrl_3:any = null;
  previewUrl_4:any = null;
  previewUrl_5:any = null;
  imageUploadCount: number[] = [1];
  currentImageUploadCount: number = 1;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  itemId: string = null;
  constructor(private http: HttpClient, private itemService: ItemService, 
    private toastr: ToastrService,  private route: ActivatedRoute) { }
   
  ngOnInit() {
    this.itemId = this.route.snapshot.url[1].path
    const k = this.imageUploadCount;
    var kk;
  }
   
  fileProgress(fileInput: any, number: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.preview(number);
  }
 
  preview(number: any) {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    this.fileDataList.push(this.fileData);
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      if(number == 1) {
        this.previewUrl_1 = reader.result; 
      }
      else if(number == 2) {
        this.previewUrl_2 = reader.result; 
      }
      else if(number == 3) {
        this.previewUrl_3 = reader.result; 
      }
      else if(number == 4) {
        this.previewUrl_4 = reader.result; 
      }
      else if(number == 5) {
        this.previewUrl_5 = reader.result; 
      }
    }
  }
   
  onSubmit(imageCount: number) {
      const formData = new FormData();
      formData.append('file', this.fileData);
    //  formData.append('file',this.fileDataList.);
      var mainImageUrl = false;
      if(imageCount == 1){
        mainImageUrl = true;
      }
    
      this.itemService.upload(formData, this.itemId, mainImageUrl).subscribe(data => {
        this.imageUploadCount.push(imageCount + 1);
        this.currentImageUploadCount = imageCount + 1;
        this.ngOnInit();
        this.toastr.success('Image uploading!' +  + ' Completed', 'Image Uploading...',{
          timeOut: 2000
        });
      });
  
  }
}

