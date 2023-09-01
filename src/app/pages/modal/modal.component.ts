import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() someData: string | undefined; // Input property to receive data from the parent component

  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close(); // Close the modal when the close button is clicked
  }
}
