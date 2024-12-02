package com.times.times.controller;

import com.times.times.model.TimesModel;
import com.times.times.service.TimesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class TimesController {

    private final TimesService timesService;

    @Autowired
    public TimesController(TimesService timesService) {
        this.timesService = timesService;
    }

    // Endpoint para listar todos os times
    @GetMapping("/listar")
    public ResponseEntity<List<TimesModel>> getAllTimes() {
        return ResponseEntity.ok(timesService.getAllTimes());
    }

    // Endpoint para obter um time pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<TimesModel> getTimeById(@PathVariable Long id) {
        Optional<TimesModel> time = timesService.getTimeById(id);
        return time.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Endpoint para criar um novo time
    @PostMapping("/criar")
    public ResponseEntity<TimesModel> createTime(@RequestBody TimesModel timesModel) {
        // Aqui, a URL da imagem será salva no campo "logo"
        TimesModel createdTime = timesService.createTime(timesModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTime);
    }

    // Endpoint para atualizar um time existente
    @PutMapping("/{id}")
    public ResponseEntity<TimesModel> updateTime(@PathVariable Long id, @RequestBody TimesModel timesModel) {
        TimesModel updatedTime = timesService.updateTime(id, timesModel);
        return updatedTime != null ? ResponseEntity.ok(updatedTime)
                                   : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Endpoint para deletar um time
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTime(@PathVariable Long id) {
        return timesService.deleteTime(id) ? ResponseEntity.noContent().build()
                                           : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
