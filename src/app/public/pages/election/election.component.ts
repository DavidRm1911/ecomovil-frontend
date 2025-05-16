import { Component } from '@angular/core';
import {HeaderAcquirerComponent} from "../../components/header-acquirer/header-acquirer.component";
import {MatCardActions, MatCardImage} from "@angular/material/card";
import {RatingModule} from "primeng/rating";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf, UpperCasePipe} from "@angular/common";
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-election',
  standalone: true,
  imports: [
    HeaderAcquirerComponent,
    MatCardImage,
    RatingModule,
    TranslateModule,
    UpperCasePipe,
    MatMenu,
    MatMenuItem,
    RouterLink,
    MatButton,
    MatCardActions,
    NgIf
  ],
  templateUrl: './election.component.html',
  styleUrl: './election.component.css'
})
export class ElectionComponent {

}
