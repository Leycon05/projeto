package com.times.times.repository;

import com.times.times.model.TimesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimesRepository extends JpaRepository<TimesModel, Long> {
   
}
