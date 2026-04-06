import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

type TypeAlert = 'alert-success' | 'alert-error' | 'alert-warning' | 'alert-info' | 'default';

@Component({
  selector: 'alert',
  imports: [NgClass],
  templateUrl: './alert.html',
})
export class Alert {
  typeAlert = input.required<TypeAlert>();
  textAlert = input.required<string>();
}
