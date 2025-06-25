package src.gymapp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import src.gymapp.model.Quote;
import src.gymapp.model.Trainer;
import src.gymapp.service.QuoteService;
import src.gymapp.service.TrainerService;

import java.util.List;

@RestController
@RequestMapping("api/trainer")
public class TrainerController {

    @Autowired
    public TrainerService trainerService;

    @PostMapping("/add")
    public ResponseEntity<Trainer> addTrainer(@RequestBody Trainer trainer){
        try {
            Trainer savedTrainer  =  trainerService.addTrainer(trainer);
            return new ResponseEntity<>(savedTrainer, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while saving trainer", e);
        }
    }

    @GetMapping("/getAllTrainers")
    public ResponseEntity<List<Trainer>> getAllTrainers() {
        try {
            List<Trainer> allTrainers = trainerService.getAllTrainers();
            return new ResponseEntity<>(allTrainers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while getting all trainers", e);
        }
    }

}
