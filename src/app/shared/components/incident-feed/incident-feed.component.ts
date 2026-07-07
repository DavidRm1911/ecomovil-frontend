import { Component, Input } from '@angular/core';
import { NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { IncidentAlert } from '../../../vehicles/model/incident-alert.entity';

@Component({
  selector: 'app-incident-feed',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, DatePipe],
  templateUrl: './incident-feed.component.html',
  styleUrl: './incident-feed.component.css'
})
export class IncidentFeedComponent {
  @Input() alerts: IncidentAlert[] = [];
  @Input() title = 'Centro de incidentes';
  @Input() emptyMessage = 'Sin alertas por ahora. Todo en orden.';

  severityClass(severity: IncidentAlert['severity']): string {
    switch (severity) {
      case 'critical': return 'border-red-200 bg-red-50 text-red-700';
      case 'warning': return 'border-amber-200 bg-amber-50 text-amber-700';
      default: return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  }
}
