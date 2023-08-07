import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointmentsSubject: BehaviorSubject<Appointment[]> =
    new BehaviorSubject<Appointment[]>([]);
  public appointments$: Observable<Appointment[]> =
    this.appointmentsSubject.asObservable();

  constructor() {}

  getAppointments(): Appointment[] {
    return this.appointmentsSubject.getValue();
  }

  addAppointment(appointment: Appointment) {
    const appointments = this.getAppointments();
    appointments.push(appointment);
    this.appointmentsSubject.next(appointments);
  }

  deleteAppointment(appointment: Appointment) {
    const appointments = this.getAppointments();
    const index = appointments.findIndex((a) => a.date === appointment.date);
    if (index > -1) {
      appointments.splice(index, 1);
      this.appointmentsSubject.next(appointments);
    }
  }

  moveAppointment(sourceIndex: number, targetIndex: number) {
    const appointments = this.getAppointments();
    const [appointment] = appointments.splice(sourceIndex, 1);
    appointments.splice(targetIndex, 0, appointment);
    this.appointmentsSubject.next(appointments);
  }
}
