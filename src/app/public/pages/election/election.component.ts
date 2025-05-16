import { Component } from '@angular/core';
import {RatingModule} from "primeng/rating";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-election',
  standalone: true,
  imports: [
    RatingModule,
    TranslateModule,
    RouterLink,
    MatButton,
  ],
  templateUrl: './election.component.html',
  styleUrl: './election.component.css'
})
export class ElectionComponent {

}
