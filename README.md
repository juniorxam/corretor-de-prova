# Corretor de Prova

Site responsivo para preencher 60 respostas e conferir a prova com pesos diferentes: questões 1 a 30 valem 1 ponto e questões 31 a 60 valem 2 pontos, totalizando 90 pontos.

## PDF da correção

Depois de preencher as respostas, clique em **Corrigir prova**. O resumo e a correção detalhada serão exibidos. Em seguida, clique em **Gerar PDF da correção** e escolha **Salvar como PDF** na janela de impressão do navegador. O documento inclui as respostas marcadas, o gabarito, os acertos, erros, brancos, pontuação e percentual.

## Gabarito

O gabarito usado foi transcrito da folha de conferência manuscrita enviada, inclusive considerando a questão 27 como incorreta. Ele é um gabarito de conferência e não substitui o gabarito oficial da FGV.

## Corretor Python

Também está disponível o arquivo `corrigir_prova.py`, que aceita 60 alternativas como argumentos:

```bash
python3 corrigir_prova.py B A B ... A
```
