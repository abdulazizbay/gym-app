package src.gymapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import src.gymapp.model.Quote;
import src.gymapp.service.QuoteService;

@RestController
@RequestMapping("api/quote")
public class QuoteController {

    @Autowired
    public QuoteService quoteService;

    @PostMapping("/add")
    public ResponseEntity<Quote> addQuote(@RequestBody Quote quote){
        try {
            Quote savedQuote  =  quoteService.addQuote(quote);
            return new ResponseEntity<>(savedQuote, HttpStatus.CREATED);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteQuote(@PathVariable Long id) {
        String message = quoteService.deleteQuote(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
