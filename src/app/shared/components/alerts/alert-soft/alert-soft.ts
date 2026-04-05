import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
@Component({
  selector: 'shared-alert-soft',
  imports: [NgClass],
  templateUrl: './alert-soft.html',
})
export class AlertSoft {
  typeAlert = input.required<string>();
  messageAlert = input.required<string>();
}
