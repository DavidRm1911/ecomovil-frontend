/**
 * IncidentAlert entity
 * @class IncidentAlert
 * @description
 * Represents a single event in the real-time incident feed. Alerts are
 * derived client-side from telemetry deltas (fall/impact, overspeed,
 * geofence breach, panic button) reported by the vehicle's IoT device
 * (GPS Ublox NEO-6M, MPU6050, Hall speed sensor and the physical panic
 * button), so the feed still works even before the backend persists a
 * dedicated alerts table.
 */
export type IncidentType = 'IMPACT' | 'OVERSPEED' | 'GEOFENCE' | 'PANIC' | 'CONNECTION';

export type IncidentSeverity = 'critical' | 'warning' | 'info';

export class IncidentAlert {
  id: string;
  vehicleId: number;
  vehicleName: string;
  type: IncidentType;
  severity: IncidentSeverity;
  message: string;
  timestamp: Date;

  constructor(alert: {
    id?: string;
    vehicleId: number;
    vehicleName?: string;
    type: IncidentType;
    severity?: IncidentSeverity;
    message: string;
    timestamp?: Date;
  }) {
    this.id = alert.id ?? `${alert.vehicleId}-${alert.type}-${Date.now()}`;
    this.vehicleId = alert.vehicleId;
    this.vehicleName = alert.vehicleName ?? '';
    this.type = alert.type;
    this.severity = alert.severity ?? 'warning';
    this.message = alert.message;
    this.timestamp = alert.timestamp ?? new Date();
  }

  get icon(): string {
    switch (this.type) {
      case 'IMPACT': return '💥';
      case 'OVERSPEED': return '⚡';
      case 'GEOFENCE': return '📍';
      case 'PANIC': return '🆘';
      case 'CONNECTION': return '📡';
    }
  }
}
