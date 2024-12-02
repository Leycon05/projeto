package com.times.times.service;

import com.times.times.model.TimesModel;
import com.times.times.repository.TimesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TimesService {

    private final TimesRepository timesRepository;

    @Autowired
    public TimesService(TimesRepository timesRepository) {
        this.timesRepository = timesRepository;
    }

    
    public List<TimesModel> getAllTimes() {
        return timesRepository.findAll();
    }

   
    public Optional<TimesModel> getTimeById(Long id) {
        return timesRepository.findById(id);
    }

  
    public TimesModel createTime(TimesModel timesModel) {
        return timesRepository.save(timesModel);
    }


    public TimesModel updateTime(Long id, TimesModel timesModel) {
        if (timesRepository.existsById(id)) {
            timesModel.setId(id);
            return timesRepository.save(timesModel);
        }
        return null;
    }


    public boolean deleteTime(Long id) {
        if (timesRepository.existsById(id)) {
            timesRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
