import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss'],
})
export class ErrorMsgComponent implements OnInit {
  @Input() someData: any; // Input property to receive data from the parent component
  @Input() screen: string | undefined; // Input property to receive data from the parent component
  excelType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  constructor(public activeModal: NgbActiveModal, public router: Router) {}

  ngOnInit(): void {
    console.log(this.someData);
  }
  closeModal() {
    this.activeModal.close(); // Close the modal when the close button is clicked
    // window.location.reload();

    location.reload();
  }

  public exportAsExcelFile(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.someData);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveAsExcelFile(excelBuffer, 'Error File');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: this.excelType,
    });
    saveAs(data, fileName + '_Report_' + new Date().getTime() + '.xlsx');
  }
}
