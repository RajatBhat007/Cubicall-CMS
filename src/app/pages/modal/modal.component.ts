import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() someData: string | undefined; // Input property to receive data from the parent component
  @Input() screen: string | undefined; // Input property to receive data from the parent component
  variableName: string = 'case1';

  constructor(public activeModal: NgbActiveModal, public router: Router) {}
  ngOnInit(): void {
    console.log(this.screen);

    if (this.screen == 'Setup') {
      this.variableName = 'case2';
    } else if (this.screen == 'function') {
      this.variableName = 'case4';
    } else if (this.screen == 'user') {
      this.variableName = 'case4';
    } else if (this.screen == 'GameTheme') {
      this.variableName = 'case5';
    }
  }
  closeModalAddvendor() {
    this.activeModal.close(); // Close the modal when the close button is clicked
    window.location.reload();
  }
  closeModal() {
    this.activeModal.close(); // Close the modal when the close button is clicked
    // window.location.reload();

    // location.reload();
  }

  navigatetoSetHierarchy() {
    localStorage.setItem('tab', 'setHierarchy');
    this.activeModal.close(); // Close the modal when the close button is clicked
    window.location.reload();
    // this.router.navigate(['home/setup'], { queryParams: { subtab: 1 } });

    // this.router.navigateByUrl('home/setup')
  }

  closeModalRefresh() {
    this.activeModal.close(); // Close the modal when the close button is clicked
    window.location.reload();
  }
}
