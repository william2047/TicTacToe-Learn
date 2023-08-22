from min_max import *


"""
Tic Tac Toe Min Max Algorithm:
find_best_move(arr, char) -> tuple

board in the following formate [['x', 'o', None], [None, None, None], [None, None, None]]
where the positions 'x', 'o', None can be either of the other values

for example 
board = [[None, None, None], [None, None, None], [None, None, None]]
"""
def get_optimal_position(board):
    def is_winner(board, player):
        for i in range(3):
            if all([cell == player for cell in board[i]]):  # Check rows
                return True
            if all([board[j][i] == player for j in range(3)]):  # Check columns
                return True
        if board[0][0] == board[1][1] == board[2][2] == player:  # Check main diagonal
            return True
        if board[0][2] == board[1][1] == board[2][0] == player:  # Check other diagonal
            return True
        return False

    def minimax(board, depth, is_maximizing):
        if is_winner(board, 'x'):
            return -10 + depth
        if is_winner(board, 'o'):
            return 10 - depth
        if all(cell in ['x', 'o'] for row in board for cell in row):
            return 0

        if is_maximizing:
            max_eval = float('-inf')
            for i in range(3):
                for j in range(3):
                    if board[i][j] is None:
                        board[i][j] = 'o'
                        eval = minimax(board, depth + 1, False)
                        board[i][j] = None
                        max_eval = max(max_eval, eval)
            return max_eval
        else:
            min_eval = float('inf')
            for i in range(3):
                for j in range(3):
                    if board[i][j] is None:
                        board[i][j] = 'x'
                        eval = minimax(board, depth + 1, True)
                        board[i][j] = None
                        min_eval = min(min_eval, eval)
            return min_eval

    best_score = float('-inf')
    best_move = None

    for i in range(3):
        for j in range(3):
            if board[i][j] is None:
                board[i][j] = 'o'
                score = minimax(board, 0, False)
                board[i][j] = None
                if score > best_score:
                    best_score = score
                    best_move = [i, j]

    return best_move

print(get_optimal_position())