package com.panchakarma.panchakarma_management.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.panchakarma.panchakarma_management.Treatment;

@Repository
public interface TreatmentRepository extends JpaRepository<Treatment, Long> {
}
