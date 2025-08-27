package com.panchakarma.panchakarma_management.Controller;

import com.panchakarma.panchakarma_management.*;
import com.panchakarma.panchakarma_management.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final UserService userService;

    public AppointmentController(AppointmentService appointmentService, UserService userService){
        this.appointmentService = appointmentService;
        this.userService = userService;
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody Appointment appointment) {
        Appointment saved = appointmentService.book(appointment);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUserAppointments(@PathVariable String username) {
        Optional<User> userOpt = userService.findByUsername(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        List<Appointment> appointments = appointmentService.getUserAppointments(userOpt.get());
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAppointment(@RequestBody Appointment appointment) {
        Appointment updated = appointmentService.update(appointment);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id) {
        appointmentService.cancel(id);
        return ResponseEntity.ok("Appointment cancelled");
    }
}
