package src.gymapp.service.impl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.gymapp.model.Quote;
import src.gymapp.model.UserDto;
import src.gymapp.repository.QuoteRepository;
import src.gymapp.repository.UserRepository;
import src.gymapp.service.QuoteService;

import java.util.Optional;

@Service
public class QuoteServiceImpl implements QuoteService {
    @Autowired
    public QuoteRepository quoteRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    @Override
    public Quote addQuote(Quote quote) {
        Optional<Quote> textExist = quoteRepository.findQuoteByText(quote.getText());
        if (textExist.isPresent()) {
            throw new RuntimeException("Quote text already exists");
        }

        Long userId = quote.getUser().getId();
        Optional<UserDto> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Quote newQuote = new Quote();
        newQuote.setText(quote.getText());
        newQuote.setUser(user.get());

        return quoteRepository.save(newQuote);
    }

    @Transactional
    @Override
    public String deleteQuote(Long id){
        Optional<Quote> QuoteIdExist = quoteRepository.findById(id);
        if (QuoteIdExist.isEmpty()) {
            throw new RuntimeException("Quote id not found");
        }
        quoteRepository.delete(QuoteIdExist.get());
        return "Quote has been deleted";
    }
}
