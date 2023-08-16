def min_max(board, player):

    def get_zerosum_val(game_board, player, current_turn):
        # Makes duplicate board for minmax algo
        board = game_board.copy()

        return(None)




    # Makes duplicate board for minmax algo
    game_board = board.copy()
    
    # test value to throw error
    empty_positions = get_empty_positions(game_board)
    best_position=[0, empty_positions[0]]

    best_position = get_zerosum_val(game_board, player, player)




    board_write(board, player, best_position[1])

    print_board(board)
    





def get_board_status(game_board):
    # Check rows, columns, and diagonals
    for i in range(3):
        # Check rows
        if game_board[i][0] == game_board[i][1] == game_board[i][2] and game_board[i][0] is not None:
            return game_board[i][0]
        # Check columns
        if game_board[0][i] == game_board[1][i] == game_board[2][i] and game_board[0][i] is not None:
            return game_board[0][i]

    # Check diagonals
    if game_board[0][0] == game_board[1][1] == game_board[2][2] and game_board[0][0] is not None:
        return game_board[0][0]
    if game_board[0][2] == game_board[1][1] == game_board[2][0] and game_board[0][2] is not None:
        return game_board[0][2]

    # Check for tie (no None values left on the board)
    if all(cell is not None for row in game_board for cell in row):
        return 'tie'

    # If none of the above conditions are met, the game is still ongoing
    return None

def get_empty_positions(game_board):
    empty_positions = []
    for x in range(3):
        for y in range(3):
            if game_board[x][y] is None:
                empty_positions.append((x, y))
    return empty_positions

def print_board(board):
    print('*********************************')
    for i in range(3):
        for j in range(3):
            if board[i][j] == 'x':
                print(' X ', end='')
            elif board[i][j] == 'o':
                print(' O ', end='')
            else:
                print('   ', end='')
            
            if j != 2:
                print('|', end='')
        print()
        
        if i != 2:
            print('---------')

def board_write(board, player, position):
    board[position[0]][position[1]] = player


board = [[None, None, None], [None, None, None], [None, None, None]]

print_board(board)

board_write(board, 'o', get_empty_positions(board)[0])

print_board(board)

min_max(board, 'x')

board_write(board, 'o', get_empty_positions(board)[0])

print_board(board)

min_max(board, 'x')

board_write(board, 'o', get_empty_positions(board)[0])

print_board(board)

min_max(board, 'x')

board_write(board, 'o', get_empty_positions(board)[0])

print_board(board)

min_max(board, 'x')

board_write(board, 'o', get_empty_positions(board)[0])

print_board(board)
