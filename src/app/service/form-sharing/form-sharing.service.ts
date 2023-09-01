import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormSharingService {
  private formDataSubject = new BehaviorSubject<any>({});
  formData$ = this.formDataSubject.asObservable();
  constructor() {}

  setFormData(data: any) {
    this.formDataSubject.next(data);
  }

  submitForm(data: any) {
    // Add your form submission logic here
    console.log('Submitting form with data:', data);
  }
}
