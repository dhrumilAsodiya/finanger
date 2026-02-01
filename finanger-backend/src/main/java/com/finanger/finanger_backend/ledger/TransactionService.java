package com.finanger.finanger_backend.ledger;

import com.finanger.finanger_backend.ledger.dto.TransactionRequest;
import com.finanger.finanger_backend.ledger.dto.TransactionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor // Lombok generates a constructor for "repository" automatically
public class TransactionService {

    private final TransactionRepository repository;

    // 1. Create a new Transaction
    public TransactionResponse createTransaction(TransactionRequest request, String userId) {
        // Convert DTO to Entity
        Transaction transaction = Transaction.builder()
                .userId(userId)
                .description(request.description())
                .amount(request.amount())
                .type(request.type())
                .category(request.category())
                .date(request.date())
                .build();

        // Save to DB
        Transaction savedTransaction = repository.save(transaction);

        // Convert back to Response DTO
        return mapToResponse(savedTransaction);
    }

    // 2. Get all Transactions for a specific user
    public List<TransactionResponse> getAllTransactions(String userId) {
        List<Transaction> transactions = repository.findAllByUserId(userId);

        return transactions.stream()
                .map(this::mapToResponse)
                .toList(); // Java 16+ syntax
    }

    // Helper method to convert Entity -> Response DTO
    private TransactionResponse mapToResponse(Transaction t) {
        return new TransactionResponse(
                t.getId(),
                t.getDescription(),
                t.getAmount(),
                t.getType(),
                t.getCategory(),
                t.getDate(),
                t.getCreatedAt().toString()
        );
    }

    public com.finanger.finanger_backend.ledger.dto.DashboardStats getDashboardStats(String userId) {
        // Fetch sums from DB (might be null if no data exists)
        BigDecimal totalIncome = repository.sumIncome(userId);
        BigDecimal totalExpense = repository.sumExpense(userId);

        // Handle Nulls (If no transactions, treat as 0)
        if (totalIncome == null) totalIncome = BigDecimal.ZERO;
        if (totalExpense == null) totalExpense = BigDecimal.ZERO;

        // Calculate Balance: Income - Expense
        BigDecimal totalBalance = totalIncome.subtract(totalExpense);

        return new com.finanger.finanger_backend.ledger.dto.DashboardStats(
                totalBalance,
                totalIncome,
                totalExpense
        );
    }

    // 3. Delete a transaction (Securely)
    public void deleteTransaction(java.util.UUID id, String userId) {
        Transaction transaction = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        // Security Check: Does this belong to the logged-in user?
        if (!transaction.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized: You do not own this transaction");
        }

        repository.delete(transaction);
    }
}