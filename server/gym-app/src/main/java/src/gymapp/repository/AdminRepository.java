package src.gymapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import src.gymapp.model.Admin;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Long> {
    Optional<Admin> findByUsername(String username);
    @Query("SELECT COUNT(a) FROM Admin a WHERE a.super_admin = true")
    int numberOfSuperAdmin();


}
