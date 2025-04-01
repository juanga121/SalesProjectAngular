import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  public groupErrorsByProperty(errors: any[]): { [key: string]: string[] } {
    const groupedErrors: { [key: string]: string[] } = {};

    errors.forEach((error) => {
      if (!groupedErrors[error.propertyName]) {
        groupedErrors[error.propertyName] = [];
      }
      groupedErrors[error.propertyName].push(error.errorMessage);
    });

    return groupedErrors;
  }
}
