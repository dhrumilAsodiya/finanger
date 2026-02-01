package com.finanger.finanger_backend.ledger.dto;

import com.finanger.finanger_backend.ledger.TransactionType;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record TransactionResponse(
        UUID id,
        String description,
        BigDecimal amount,
        TransactionType type,
        String category,
        LocalDate date,
        String createdAt
) {}