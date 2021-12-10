from django.shortcuts import render

def list_board(lista_numeros):
    """Generar board (matriz) a partir de lista.

    Args:
        lista_numeros (list): Lista de 1 dimensión con todos los números del board.

    Returns:
        matriz: Devuelve el board representado en una matriz de dos dimensiones.
    """
    board = []
    for i, x in enumerate(lista_numeros):
        if i % 9 == 0:
            board.append([])
        board[-1].append(int(x) if x != '' else 0)
    return board

def comprobar(board):
    """Comprobar si el Sudoku está resuelto.

    Args:
        board (matrix): Matriz de dos dimensiones que representa el puzzle. Ej.: [[0,0,0,0,0,0,8,0,0],[0,0,4,0,0,8,0,0,9],[0,7,0,0,0,0,0,0,5],[0,1,0,0,7,5,0,0,8],[0,5,6,0,9,1,3,0,0],[7,8,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0],[0,0,0,9,3,0,0,1,0],[0,0,5,7,0,0,4,0,3]]

    Returns:
        bool: Si está resuelto correctamente, retorna True. Sino False.
    """
    regions = (set(), set(), set(), set(), set(), set(), set(), set(), set())
    
    for i, row in enumerate(board):
        if len(set(row)) != 9:
            return False
        
        regions[i//3*3].update(row[:3])
        regions[i//3*3+1].update(row[3:6])
        regions[i//3*3+2].update(row[6:])
    
    for column in zip(*board):
        if len(set(column)) != 9:
            return False
    
    for region in regions:
        if len(region) != 9:
            return False
    
    return True

# Create your views here.
