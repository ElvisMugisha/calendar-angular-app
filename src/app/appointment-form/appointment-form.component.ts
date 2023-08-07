import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { Moment } from 'moment';
import { Appointment } from '../appointment.model';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: [''],
      time: [''],
    });
  }

  addAppointment() {
    if (this.appointmentForm.valid) {
      // Here, you can handle the logic to add the appointment to your calendar
      const titleControl = this.appointmentForm.get('title');
      const dateControl = this.appointmentForm.get('date');
      const timeControl = this.appointmentForm.get('time');

      if (titleControl && dateControl) {
        const title = titleControl.value as string;
        const dateMoment = dateControl.value as Moment;
        const time = timeControl?.value as string;

        const date = dateMoment.format('YYYY-MM-DD'); // Convert Moment to string

        const appointment: Appointment = { title, date, time };

        this.appointmentService.addAppointment(appointment);
        this.appointmentForm.reset();
      }
    }
  }
}
