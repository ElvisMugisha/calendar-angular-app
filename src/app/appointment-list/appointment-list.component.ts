import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Appointment } from '../appointment.model';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.appointments$.subscribe((appointments) => {
      this.appointments = appointments;
    });
  }

  deleteAppointment(appointment: Appointment) {
    // Here, you can handle the logic to delete the appointment from the calendar
    this.appointmentService.deleteAppointment(appointment);
  }

  drop(event: CdkDragDrop<string[]>) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    if (previousIndex !== currentIndex) {
      this.appointmentService.moveAppointment(previousIndex, currentIndex);
    }
  }
}
