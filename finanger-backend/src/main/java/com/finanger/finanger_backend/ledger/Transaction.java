package com.finanger.finanger_backend.ledger;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "transactions") // Maps to a table named 'transactions' in Postgres
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Automatically generates a unique String ID
    private UUID id;

    // We will hook this up to Clerk later. For now, we store the String ID.
    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, precision = 19, scale = 2) // scale=2 means 2 decimal places (e.g., 10.50)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING) // Stores "INCOME" as a string in DB, not a number (0)
    @Column(nullable = false)
    private TransactionType type;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private LocalDate date;

    // Audit fields (Good for tracking when data was touched)
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
