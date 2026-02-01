package com.finanger.finanger_backend.ledger.dto;

import java.math.BigDecimal;

public record DashboardStats(
        BigDecimal totalBalance,
        BigDecimal totalIncome,
        BigDecimal totalExpense
) {}