import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {Profile} from "../../model/profile";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() set profile(value: Profile) {
    this._profile = value;
    if (value) {
      this.profileForm.patchValue({
        name: value.fullName || '',
        email: value.email || '',
        phone: value.phoneNumber || '',
        ruc: value.ruc || ''
      });
    }
  }
  get profile(): Profile { return this._profile; }
  private _profile!: Profile;

  @Output() profileChange = new EventEmitter<any>();

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    ruc: new FormControl('', Validators.required)
  });

  constructor() {
    this._profile = new Profile({id: 1});
  }

  onSubmit() {
    this.profileChange.emit({
      fullName: this.profileForm.get('name')?.value ?? '',
      email: this.profileForm.get('email')?.value ?? '',
      phoneNumber: this.profileForm.get('phone')?.value ?? '',
      ruc: this.profileForm.get('ruc')?.value ?? '',
      planId: null
    });
  }
}
