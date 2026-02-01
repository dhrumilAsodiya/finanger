package com.finanger.finanger_backend.ledger.dto;

import com.finanger.finanger_backend.ledger.TransactionType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequest(
        @NotBlank(message = "Description is required")
        String description,

        @NotNull(message = "Amount is required")
        @DecimalMin(value = "0.01", message = "Amount must be positive")
        BigDecimal amount,

        @NotNull(message = "Type is required")
        TransactionType type, // INCOME or EXPENSE

        @NotBlank(message = "Category is required")
        String category,

        @NotNull(message = "Date is required")
        LocalDate date
) {}