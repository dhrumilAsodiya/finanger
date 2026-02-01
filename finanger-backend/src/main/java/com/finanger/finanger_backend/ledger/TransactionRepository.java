package com.finanger.finanger_backend.ledger;

import com.finanger.finanger_backend.ledger.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

    // Spring automatically generates the SQL for this method name!
    // "SELECT * FROM transactions WHERE user_id = ?"
    List<Transaction> findAllByUserId(String userId);

    // 1. Sum of all INCOME for a user
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.userId = :userId AND t.type = 'INCOME'")
    BigDecimal sumIncome(String userId);

    // 2. Sum of all EXPENSE for a user
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.userId = :userId AND t.type = 'EXPENSE'")
    BigDecimal sumExpense(String userId);
}