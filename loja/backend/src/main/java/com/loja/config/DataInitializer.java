package com.loja.config;

import com.loja.model.Produto;
import com.loja.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Cadastra (ou corrige) os produtos de exemplo a cada inicializacao.
 * A chave de cada produto e o arquivo da foto, entao rodar varias vezes
 * nao duplica nada e atualiza nome/descricao/preco de quem ja existe.
 * Fotos: backend/src/main/resources/static/uploads
 */
@Configuration
public class DataInitializer {

    // arquivo da foto, nome, descricao, preco, time, categoria, tamanhos
    private static final String[][] PRODUTOS = {
            {"camisa1.jpeg", "Camisa Santos II 2026/27", "Camisa listrada preta e branca do Santos. Tecido leve e confortável.", "349.90", "Santos", "Camisas", "P,M,G,GG"},
            {"camisa2.jpeg", "Camisa Santos I 2026/27", "Camisa branca do Santos com escudo bordado. Design moderno.", "449.90", "Santos", "Camisas", "P,M,G,GG"},
            {"camisa3.jpeg", "Camisa Santos II 2025", "Camisa listrada do Santos com detalhes em dourado.", "299.90", "Santos", "Camisas", "M,G,GG"},
            {"camisa4.jpeg", "Camisa Santos I 2025", "Camisa branca clássica do Santos com tecnologia dry-fit.", "299.90", "Santos", "Camisas", "P,M,G,GG"},
            {"camisa5.jpeg", "Camisa Corinthians II 2026/27", "Camisa preta com listras finas brancas do Corinthians.", "349.90", "Corinthians", "Camisas", "M,G,GG"},
            {"camisa6.jpeg", "Camisa Corinthians I 2026/27", "Camisa branca do Corinthians com detalhes em preto.", "349.90", "Corinthians", "Camisas", "P,M,G,GG"},
            {"camisa7.jpeg", "Camisa Palmeiras I 2026/27", "Camisa verde do Palmeiras. Design moderno e elegante.", "399.90", "Palmeiras", "Camisas", "P,M,G,GG"},
            {"camisa8.jpeg", "Camisa Palmeiras II 2026/27", "Camisa branca do Palmeiras com detalhes em verde.", "399.90", "Palmeiras", "Camisas", "P,M,G,GG"},
            {"camisa9.jpeg", "Camisa São Paulo I 2026/27", "Camisa tricolor listrada do São Paulo em vermelho, preto e branco.", "379.90", "São Paulo", "Camisas", "P,M,G,GG"},
            {"camisa10.jpeg", "Camisa São Paulo II 2026/27", "Camisa branca do São Paulo com o escudo tricolor.", "379.90", "São Paulo", "Camisas", "P,M,G,GG"},
            {"camisa11.jpeg", "Camisa Bayern de Munique 2026/27", "Camisa vermelha do Bayern de Munique com listras sutis.", "429.90", "Bayern de Munique", "Camisas", "P,M,G,GG"},
            {"camisa12.jpeg", "Camisa Lyon II 2026/27", "Camisa branca do Olympique Lyonnais com faixa azul e vermelha.", "399.90", "Lyon", "Camisas", "M,G,GG"},
            {"camisa13.jpeg", "Camisa Real Madrid I 2026/27", "Camisa branca do Real Madrid com detalhes em dourado.", "499.90", "Real Madrid", "Camisas", "P,M,G,GG"},
            {"shorts1.jpeg", "Shorts São Paulo I 2026/27", "Shorts branco do São Paulo com escudo e detalhes tricolores.", "179.90", "São Paulo", "Shorts", "P,M,G,GG"},
            {"shorts2.jpeg", "Shorts Corinthians 2026/27", "Shorts preto do Corinthians. Leve e confortável.", "179.90", "Corinthians", "Shorts", "P,M,G,GG"},
            {"shorts3.jpg", "Shorts Arsenal 2026/27", "Shorts branco do Arsenal com detalhes em azul e vermelho.", "189.90", "Arsenal", "Shorts", "P,M,G,GG"},
            {"shorts4.jpg", "Shorts Napoli 2026/27", "Shorts branco do Napoli com detalhes em azul.", "189.90", "Napoli", "Shorts", "P,M,G,GG"},
            {"shorts5.jpg", "Shorts Alemanha 2026", "Shorts preto da seleção da Alemanha.", "189.90", "Alemanha", "Shorts", "P,M,G,GG"},
            {"shorts6.jpg", "Shorts Chelsea 2026/27", "Shorts preto do Chelsea com detalhes coloridos.", "189.90", "Chelsea", "Shorts", "P,M,G,GG"},
    };

    @Bean
    CommandLineRunner initProdutos(ProdutoRepository produtoRepository,
                                   @Value("${loja.url-publica}") String urlPublica) {
        String baseImagens = urlPublica.replaceAll("/+$", "") + "/uploads/";
        return args -> {
            for (String[] d : PRODUTOS) {
                String imagem = baseImagens + d[0];
                Produto p = produtoRepository.findByImagem(imagem).orElseGet(Produto::new);
                p.setImagem(imagem);
                p.setNome(d[1]);
                p.setDescricao(d[2]);
                p.setPreco(Double.valueOf(d[3]));
                p.setTime(d[4]);
                p.setCategoria(d[5]);
                p.setTamanhos(d[6]);
                p.setAtivo(true);
                produtoRepository.save(p);
            }
        };
    }
}
