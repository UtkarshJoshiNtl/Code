package com.panchakarma.panchakarma_management.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.panchakarma.panchakarma_management.Appointment;
import com.panchakarma.panchakarma_management.User;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Custom query to find all appointments for a specific user
    List<Appointment> findByUser(User user);
}
