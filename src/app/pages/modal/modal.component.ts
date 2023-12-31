import { Component, Input, OnInit } from '@angular/core';
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

  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {
    console.log(this.screen);

    if (this.screen == 'Setup') {
      this.variableName = 'case2';
    }
  }

  closeModal() {
    this.activeModal.close(); // Close the modal when the close button is clicked
  }
}
