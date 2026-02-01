package com.finanger.finanger_backend.ledger;

import com.finanger.finanger_backend.ledger.dto.TransactionRequest;
import com.finanger.finanger_backend.ledger.dto.TransactionResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;
@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    private final TransactionService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionResponse createTransaction(
            @RequestBody @Valid TransactionRequest request,
            @AuthenticationPrincipal Jwt jwt // <--- 1. Inject the Token
    ) {
        // 2. Extract the User ID from the Token (The "sub" claim)
        String userId = jwt.getSubject();

        return service.createTransaction(request, userId);
    }

    @GetMapping
    public List<TransactionResponse> getAllTransactions(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject(); // <--- Get real user ID
        return service.getAllTransactions(userId);
    }

    @GetMapping("/stats")
    public com.finanger.finanger_backend.ledger.dto.DashboardStats getStats(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject(); // <--- Get real user ID
        return service.getDashboardStats(userId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Returns 204 No Content on success
    public void deleteTransaction(
            @PathVariable java.util.UUID id,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        service.deleteTransaction(id, userId);
    }
}