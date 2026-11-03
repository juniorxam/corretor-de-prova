# Plano — Corretor de Prova

## Produto
Site responsivo, sem login e sem banco de dados, para selecionar cargo/especialidade e prova, inserir respostas de 60 questões e corrigir a prova no navegador.

## Dados e regras
- `gabaritos.js` contém os 61 blocos cargo/prova transcritos do PDF enviado, com 60 respostas por bloco.
- Questões 1 a 30 valem 1 ponto e questões 31 a 60 valem 2 pontos, totalizando 90 pontos.
- Cargos de nível médio usam a divisão Português (1–10), Matemática (11–17), Informática (18–24), História/Geografia (25–30), SUS (31–35) e Específicos (36–60).
- Cargos de nível superior usam Português (1–10), Matemática (11–18), História/Geografia (19–24), SUS (25–30) e Específicos (31–60).

## Design
- **Movimento:** painel de estudos com visual editorial limpo e detalhes de caderno de prova.
- **Princípios:** leitura rápida, feedback imediato, hierarquia clara e acessibilidade.
- **Paleta:** azul-marinho para confiança, creme para reduzir fadiga visual e verde/vermelho somente para feedback.
- **Layout:** seleção de cargo/prova acima da coluna principal de entrada e resumo lateral que se reorganiza no celular.
- **Assinaturas:** faixa de progresso, cartões de pontuação e tabela de resultados com estados visuais.
- **Interação:** respostas digitadas ou coladas; corrigir mostra o resultado sem recarregar a página.
- **Tipografia:** sistema sans-serif com títulos fortes e números destacados.

## Estrutura
- `index.html`: interface, seletores e campos de entrada.
- `styles.css`: layout responsivo e estados visuais.
- `gabaritos.js`: dados dos cargos, provas e respostas.
- `app.js`: seleção, validação, cálculo ponderado e renderização.
- `manus-routes.json`: manifesto da rota principal.
