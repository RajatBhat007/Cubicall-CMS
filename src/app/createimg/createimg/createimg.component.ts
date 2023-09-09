import { Component } from '@angular/core';

@Component({
  selector: 'app-createimg',
  templateUrl: './createimg.component.html',
  styleUrls: ['./createimg.component.scss']
})
export class CreateimgComponent {
  selectedDropdownValue = '';
  selectedImageSrc: string = 'assets/images/Group 8579.jpg'; 
  activeIndexTab: any
  isEditMode: boolean = true;
  selectedFile: File | null = null;
  selectedFileURL: any = null;
  base64String: string | null = null;
  selectedFileName: string = '';
  editedImageData: string | null = null;
  EditMode = false;
  answerOption=[{
    "option":'Option 1'
  },
  
  {
    "option":'Option 2'
  },
  {
    "option":'Option 3'
  },
  {
    "option":'Option 4'
  },

  
  ]

  
  updateSelectedValue(value:any){
    this.selectedDropdownValue=value

  }

  selectOption(index:any){
    this.activeIndexTab=index
  }
  logout() {
   
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
      // Set the selected file name
      this.selectedFileName = selectedFile.name;
  
      // Read and set the selected image source
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageSrc = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    } else {
      this.selectedFileName = ''; // Clear the file name if no file is selected
      this.selectedImageSrc = 'assets/images/Group 8579.jpg'; // Reset the image source
    }
  }
  


  
}


