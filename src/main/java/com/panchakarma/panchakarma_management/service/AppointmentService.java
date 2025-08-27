package com.panchakarma.panchakarma_management.service;

import com.panchakarma.panchakarma_management.Appointment;
import com.panchakarma.panchakarma_management.User;
import com.panchakarma.panchakarma_management.Repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final TwilioSMSService twilioSMSService;

    public AppointmentService(AppointmentRepository appointmentRepository, TwilioSMSService twilioSMSService){
        this.appointmentRepository = appointmentRepository;
        this.twilioSMSService = twilioSMSService;
    }
    
    public Appointment book(Appointment appointment) {
        appointment.setStatus("Scheduled");
        Appointment savedAppointment = appointmentRepository.save(appointment);
        String phone = appointment.getUser().getPhone();
        if (phone != null && !phone.isEmpty()) {
            String message = "Dear " + appointment.getUser().getUsername() + 
                             ", your Panchakarma appointment for " + 
                             appointment.getTreatment().getName() + 
                             " is scheduled on " + appointment.getAppointmentDate() + 
                             ". Thank you!";
            twilioSMSService.sendSMS(phone, message);
        }
        return savedAppointment;
    }

    public List<Appointment> getUserAppointments(User user) {
        return appointmentRepository.findByUser(user);
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public Appointment update(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public void cancel(Long id) {
        appointmentRepository.deleteById(id);
    }
}
