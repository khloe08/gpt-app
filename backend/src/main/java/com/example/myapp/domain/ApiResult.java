package com.example.myapp.domain;


import lombok.*;

@Getter
@NoArgsConstructor
@ToString
public class ApiResult{
    private String status;
    private String message;
    private ApiExceptionEntity exception;

    @Builder
    public ApiResult(String status, String message, ApiExceptionEntity exception) {
        this.status = status;
        this.message = message;
        this.exception = exception;
    }
}