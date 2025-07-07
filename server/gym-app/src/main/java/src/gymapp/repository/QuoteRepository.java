package src.gymapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import src.gymapp.model.Quote;

import java.util.Optional;

public interface QuoteRepository extends JpaRepository<Quote,Long> {
    Optional<Quote> findQuoteByText(String quote);
}
