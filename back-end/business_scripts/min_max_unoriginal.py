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
    def min_max(board, is_maximizing, depth):
        # Base cases
        status = get_board_status(board)
        if status == 'x':
            return 10 - depth, None
        elif status == 'o':
            return -10 + depth, None
        elif status == 'tie':
            return 0, None

        # If this is the maximizing player's move (player 'x')
        if is_maximizing:
            max_eval = -float('inf')
            best_move = None
            for position in get_empty_positions(board):
                board_write(board, 'x', position)
                eval, _ = min_max(board, False, depth + 1)
                board_write(board, None, position)  # Undo the move
                if eval > max_eval:
                    max_eval = eval
                    best_move = position
            return max_eval, best_move

        # If this is the minimizing player's move (player 'o')
        else:
            min_eval = float('inf')
            best_move = None
            for position in get_empty_positions(board):
                board_write(board, 'o', position)
                eval, _ = min_max(board, True, depth + 1)
                board_write(board, None, position)  # Undo the move
                if eval < min_eval:
                    min_eval = eval
                    best_move = position
            return min_eval, best_move

    return min_max(board, True, 0)[1]