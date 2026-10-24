package com.loja.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class RedefinirSenhaDTO {

    @NotBlank(message = "Informe o email")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Informe a nova senha")
    @Pattern(regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}",
             message = "A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial (@$!%*?&)")
    private String novaSenha;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNovaSenha() {
        return novaSenha;
    }

    public void setNovaSenha(String novaSenha) {
        this.novaSenha = novaSenha;
    }
}
