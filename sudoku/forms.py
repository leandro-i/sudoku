from django import forms
import requests

class Sudoku(forms.Form):
    def crear_casillas(self, dificultad=None, board=None):
        # Obtener la lista de números de la api
        if board == None:
            r = requests.get(f'https://sugoku.herokuapp.com/board?difficulty={dificultad}')
            if r.status_code == 200:
                response = r.json()
                board = response['board']
                
        # Crear inputs del form
        letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
        for l, row in zip(letras, board):
            for i, x in enumerate(row):
                self.fields.update({
                    f'casilla_{l + str(i)}': forms.IntegerField(min_value=1, max_value=9, label='', widget=forms.NumberInput(attrs={
                        'type': 'number', 
                        'readonly': 'readonly', 
                        'class': 'casilla' if x != 0 else 'casilla vacio', 
                        'value': x if x != 0 else '', 
                        'onmousedown': 'event.preventDefault();' if x != 0 else ''}))
                })
        return board
    
    def crear_board(self, board, original=None):
        # Generar board a partir del guardado en las cookies
        letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
        for l, row_board, row_original in zip(letras, board, original):
            for i, x, y in zip(range(len(row_board)), row_board, row_original):
                self.fields.update({
                    f'casilla_{l + str(i)}': forms.IntegerField(min_value=1, max_value=9, label='', widget=forms.NumberInput(attrs={
                        'type': 'number', 
                        'readonly': 'readonly', 
                        'class': 'casilla vacio' if y == 0 else 'casilla', 
                        'value': x if x != 0 else '', 
                        'onmousedown': 'event.preventDefault();' if y != 0 else '',
                        }))
                })
        return board

