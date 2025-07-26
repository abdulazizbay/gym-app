package src.gymapp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    private final TrainerService trainerService;

    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }


    @PostMapping
    public ResponseEntity<?> addTrainer(@RequestBody Trainer trainer) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can add trainers");
        }

        trainerService.addTrainer(trainer);
        return ResponseEntity.ok("Trainer added successfully");
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
