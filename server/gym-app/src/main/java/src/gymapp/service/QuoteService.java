package src.gymapp.service;

import src.gymapp.model.Quote;

public interface QuoteService {
    public Quote addQuote( Quote quote);
    public String deleteQuote( Long id);

}
