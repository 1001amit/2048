const gridContainer = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');
let board = [];
let score = 0;

function initializeBoard() {
    board = [];
    for (let i = 0; i < 4; i++) {
        board[i] = [];
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    addNewTile();
    addNewTile();
    updateBoard();
}

function addNewTile() {
    let emptyTiles = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                emptyTiles.push({ x: i, y: j });
            }
        }
    }
    if (emptyTiles.length === 0) return;
    let { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[x][y] = Math.random() < 0.9 ? 2 : 4;
}

function updateBoard() {
    gridContainer.innerHTML = '';
    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = cell === 0 ? '' : cell;
            tile.style.backgroundColor = getTileColor(cell);
            gridContainer.appendChild(tile);
        });
    });
    scoreDisplay.textContent = `Score: ${score}`;
}

function getTileColor(value) {
    switch (value) {
        case 2: return '#eee4da';
        case 4: return '#ede0c8';
        case 8: return '#f2b179';
        case 16: return '#f59563';
        case 32: return '#f67c5f';
        case 64: return '#f65e3b';
        case 128: return '#edcf72';
        case 256: return '#edcc61';
        case 512: return '#edc850';
        case 1024: return '#edc53f';
        case 2048: return '#edc22e';
        default: return '#cdc1b4';
    }
}

function startNewGame() {
    score = 0;
    initializeBoard();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        moveTiles(event.key);
    }
});

function moveTiles(direction) {
    let moved = false;
    switch (direction) {
        case 'ArrowUp':
            for (let col = 0; col < 4; col++) {
                for (let row = 1; row < 4; row++) {
                    if (board[row][col] !== 0) {
                        let currentRow = row;
                        while (currentRow > 0 && board[currentRow - 1][col] === 0) {
                            currentRow--;
                        }
                        if (currentRow > 0 && board[currentRow - 1][col] === board[row][col]) {
                            board[currentRow - 1][col] *= 2;
                            score += board[currentRow - 1][col];
                            board[row][col] = 0;
                            moved = true;
                        } else if (currentRow !== row) {
                            board[currentRow][col] = board[row][col];
                            board[row][col] = 0;
                            moved = true;
                        }
                    }
                }
            }
            break;
        case 'ArrowDown':
            for (let col = 0; col < 4; col++) {
                for (let row = 2; row >= 0; row--) {
                    if (board[row][col] !== 0) {
                        let currentRow = row;
                        while (currentRow < 3 && board[currentRow + 1][col] === 0) {
                            currentRow++;
                        }
                        if (currentRow < 3 && board[currentRow + 1][col] === board[row][col]) {
                            board[currentRow + 1][col] *= 2;
                            score += board[currentRow + 1][col];
                            board[row][col] = 0;
                            moved = true;
                        } else if (currentRow !== row) {
                            board[currentRow][col] = board[row][col];
                            board[row][col] = 0;
                            moved = true;
                        }
                    }
                }
            }
            break;
        case 'ArrowLeft':
            for (let row = 0; row < 4; row++) {
                for (let col = 1; col < 4; col++) {
                    if (board[row][col] !== 0) {
                        let currentCol = col;
                        while (currentCol > 0 && board[row][currentCol - 1] === 0) {
                            currentCol--;
                        }
                        if (currentCol > 0 && board[row][currentCol - 1] === board[row][col]) {
                            board[row][currentCol - 1] *= 2;
                            score += board[row][currentCol - 1];
                            board[row][col] = 0;
                            moved = true;
                        } else if (currentCol !== col) {
                            board[row][currentCol] = board[row][col];
                            board[row][col] = 0;
                            moved = true;
                        }
                    }
                }
            }
            break;
        case 'ArrowRight':
            for (let row = 0; row < 4; row++) {
                for (let col = 2; col >= 0; col--) {
                    if (board[row][col] !== 0) {
                        let currentCol = col;
                        while (currentCol < 3 && board[row][currentCol + 1] === 0) {
                            currentCol++;
                        }
                        if (currentCol < 3 && board[row][currentCol + 1] === board[row][col]) {
                            board[row][currentCol + 1] *= 2;
                            score += board[row][currentCol + 1];
                            board[row][col] = 0;
                            moved = true;
                        } else if (currentCol !== col) {
                            board[row][currentCol] = board[row][col];
                            board[row][col] = 0;
                            moved = true;
                        }
                    }
                }
            }
            break;
    }

    if (moved) {
        addNewTile();
        updateBoard();
    }
}

initializeBoard();
