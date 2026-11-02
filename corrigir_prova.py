#!/usr/bin/env python3
"""Corrige a prova de 60 questões.

Questões 1–30 valem 1 ponto; questões 31–60 valem 2 pontos.
Uso:
  python3 corrigir_prova.py
  python3 corrigir_prova.py "B A B ..."
"""

import sys

# Gabarito de conferência transcrito da folha manuscrita enviada.
# Questões marcadas em REVISAO merecem conferência com o gabarito oficial da FGV.
GABARITO = {
    1:'B',    2:'A',    3:'B',    4:'C',    5:'D',    6:'C',    7:'C',    8:'C',    9:'C',    10:'B',
    11:'C',    12:'D',    13:'B',    14:'B',    15:'C',    16:'A',    17:'A',    18:'D',    19:'C',    20:'C',
    21:'A',    22:'A',    23:'D',    24:'D',    25:'C',    26:'D',    27:'C',    28:'C',    29:'D',    30:'A',
    31:'C',    32:'A',    33:'B',    34:'C',    35:'D',    36:'A',    37:'A',    38:'A',    39:'D',    40:'D',
    41:'B',    42:'A',    43:'D',    44:'B',    45:'B',    46:'A',    47:'A',    48:'B',    49:'D',    50:'C',
    51:'B',    52:'B',    53:'D',    54:'C',    55:'A',    56:'A',    57:'D',    58:'C',    59:'D',    60:'A',

}

# Gabarito de conferência transcrito da folha manuscrita enviada.
REVISAO = set()


def ler_respostas():
    if len(sys.argv) > 1:
        bruto = " ".join(sys.argv[1:])
    else:
        print("Digite as respostas das questões 1 a 60, separadas por espaço.")
        print("Você também pode usar '-' para uma questão em branco.")
        bruto = input("Respostas: ")

    # Aceita tanto "A B C" quanto "1-A 2-B" e letras coladas.
    tokens = bruto.upper().replace(',', ' ').split()
    respostas = {}
    for token in tokens:
        if '-' in token and len(token) >= 3 and token[0].isdigit():
            numero, letra = token.split('-', 1)
            if numero.isdigit():
                respostas[int(numero)] = letra[-1]
        else:
            respostas.setdefault('_sequencia', []).append(token[-1])

    if '_sequencia' in respostas:
        seq = respostas.pop('_sequencia')
        for i, letra in enumerate(seq[:60], start=1):
            respostas[i] = letra
    return respostas


def corrigir(respostas):
    pontos = 0
    maximo = 0
    acertos = 0
    erros = 0
    branco = 0

    print("\nCORREÇÃO\n" + "=" * 72)
    print(f"{'Q':>3}  {'Sua':>4}  {'Gab.':>5}  {'Peso':>4}  Situação")
    print("-" * 72)

    for q in range(1, 61):
        peso = 1 if q <= 30 else 2
        maximo += peso
        sua = respostas.get(q, '-').upper()
        correta = GABARITO[q]
        if sua == '-':
            situacao = 'EM BRANCO'
            branco += 1
        elif sua not in {'A', 'B', 'C', 'D'}:
            situacao = 'RESPOSTA INVÁLIDA'
            erros += 1
        elif sua == correta:
            situacao = 'CERTO'
            pontos += peso
            acertos += 1
        else:
            situacao = 'ERRADO'
            erros += 1
        aviso = '  [revisar gabarito]' if q in REVISAO else ''
        print(f"{q:>3}  {sua:>4}  {correta:>5}  {peso:>4}  {situacao}{aviso}")

    percentual = 100 * pontos / maximo
    print("-" * 72)
    print(f"Acertos: {acertos}/60 | Erros: {erros} | Em branco: {branco}")
    print(f"Pontuação: {pontos}/{maximo} pontos")
    print(f"Percentual ponderado: {percentual:.2f}%")
    print("\nPesos: questões 1–30 = 1 ponto; questões 31–60 = 2 pontos.")
    if REVISAO:
        print("Atenção: este é um gabarito de conferência, não o gabarito oficial da FGV.")


if __name__ == '__main__':
    try:
        corrigir(ler_respostas())
    except (EOFError, KeyboardInterrupt):
        print("\nOperação cancelada.")
