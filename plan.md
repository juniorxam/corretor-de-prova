# Plano — Corretor de Prova

## Produto
Site responsivo, sem login e sem banco de dados, para inserir respostas de 60 questões e corrigir a prova no navegador.

## Design
- **Movimento:** painel de estudos com visual editorial limpo e detalhes de caderno de prova.
- **Princípios:** leitura rápida, feedback imediato, hierarquia clara e acessibilidade.
- **Paleta:** azul-marinho para confiança, creme para reduzir fadiga visual e verde/vermelho somente para feedback.
- **Layout:** coluna principal com entrada e resumo lateral que se reorganiza no celular.
- **Assinaturas:** faixa de progresso, cartões de pontuação e tabela de resultados com estados visuais.
- **Interação:** respostas digitadas ou coladas; corrigir mostra o resultado sem recarregar a página.
- **Tipografia:** sistema sans-serif com títulos fortes e números destacados.

## Estrutura
- `index.html`: interface e campos de entrada.
- `styles.css`: layout responsivo e estados visuais.
- `app.js`: gabarito, validação, cálculo ponderado e renderização.
- `manus-routes.json`: manifesto da rota principal.
