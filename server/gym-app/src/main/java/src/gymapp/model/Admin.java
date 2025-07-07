package src.gymapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@DiscriminatorValue("ADMIN")
public class Admin extends User {
    @Column(nullable = false)
    @org.hibernate.annotations.ColumnDefault("false")
    private Boolean super_admin = false;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }
    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Trainer> addedTrainers = new ArrayList<>();

}
