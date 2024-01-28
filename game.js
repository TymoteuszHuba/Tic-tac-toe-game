// ----------- to do -----------------
// gameOver flag which will inform us about end game, after fires set also points to winner
// move which control (true, false) who whill make a move X or O
// we must create array contains three win number combinations
// we need also an epty array to catch another array of tree data-value numbers. If that combination will be the same like winning array then end game

const game = (() => {
	const btns = document.querySelectorAll('.game__btn');
	const main = document.querySelector('.main');
	const gameStart = document.querySelector('.game__setup');
	const squares = document.querySelectorAll('.square');
	const playerText = document.querySelectorAll('.player__text');
	const winnerArray = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	let playerOne;
	let playerTwo;
	let currentPlayer;

	const showGame = () => {
		playerText[0].style.color = 'var(--orange)';
		main.style.visibility = 'visible';
		main.style.opacity = '1';
		gameStart.style.display = 'none';
	};

	// factory function
	const createPlayer = (inputId, playerId, defaultName, marker) => {
		const input = document.getElementById(inputId);
		const player = document.getElementById(playerId);

		if (input && player) {
			const playerName = input.value || defaultName;
			player.innerText = `${playerName} (${marker})`;

			const movesArray = [];

			return {name: playerName, marker: marker, movesArray};
		}
	};

	const moveControl = () => {
		const switchPlayer = () => {
			currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
		};

		const updateColor = () => {
			const currentPlayerText =
				currentPlayer === playerOne ? playerText[0] : playerText[2];

			currentPlayerText.style.color = 'var(--orange)';

			const otherPlayerText =
				currentPlayer === playerOne ? playerText[2] : playerText[0];

			otherPlayerText.style.color = 'white';
		};

		const updateSquare = (square) => {
			console.log('test');
			square.innerText = currentPlayer.marker;
			// square.dataset.value = currentPlayer.marker;

			currentPlayer.movesArray.push(parseInt(square.dataset.value));

			checkWinner();

			switchPlayer();
			updateColor();
		};

		const checkWinner = () => {
			const currentMoves = currentPlayer.movesArray;

			for (const combination of winnerArray) {
				if (combination.every((move) => currentMoves.includes(move))) {
					for (const move of combination) {
						const winningSquare = squares[move];
						winningSquare.style.color = 'var(--orange)';
					}
					const winner = currentPlayer.name;
					setTimeout(() => {
						alert(`${winner} WINS!!!`);
						return;
					}, 200);
				}
			}

			if (playerOne.movesArray.length + playerTwo.movesArray.length === 9) {
				alert("IT's A DRAW!");
			}
		};

		return {updateSquare};
	};

	const moveGame = () => {
		const moveController = moveControl();
		squares.forEach((square) => {
			square.addEventListener('click', () => {
				if (square.innerText === '') {
					moveController.updateSquare(square);
					console.log(square.dataset.value);
					console.log(playerOne);
					console.log(playerTwo);
				} else {
					return;
				}
			});
		});
	};

	const playWithUser = () => {
		playerOne = createPlayer('player-one-input', 'player-one', 'Player 1', 'X');

		playerTwo = createPlayer('player-two-input', 'player-two', 'Player 2', 'O');

		currentPlayer = playerOne;
		moveGame();
	};

	const playWithComp = () => {
		playerOne = createPlayer('player-one-input', 'player-one', 'Player 1', 'X');

		comp = createPlayer('player-two-input', 'player-two', 'Computer', 'O');
	};

	const initGame = () => {
		btns.forEach((btn) => {
			btn.addEventListener('click', (event) => {
				showGame();
				if (event.target.id === 'play-with-user') {
					playWithUser();
				} else if (event.target.id === 'play-with-comp') {
					playWithComp();
				} else if (event.target.id === 'restart__btn') {
					location.reload();
				}
			});
		});
	};

	initGame();
})();
