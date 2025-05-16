import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  @Input() message: string = '';
  visible: boolean = false;

  show() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, 3000);
  }
}
