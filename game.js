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

			return {name: playerName, marker: marker};
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
			if (square.innerText === '') {
				console.log('test');
				square.innerText = currentPlayer.marker;
				square.dataset.value = currentPlayer.marker;
				switchPlayer();
				updateColor();
			}
		};

		return {updateSquare};
	};

	const moveGame = () => {
		const moveController = moveControl();
		squares.forEach((square) => {
			square.addEventListener('click', () => {
				moveController.updateSquare(square);
				console.log(square.dataset.value);
			});
		});
	};

	const playWithUser = () => {
		playerOne = createPlayer('player-one-input', 'player-one', 'Player 1', 'X');

		playerTwo = createPlayer('player-two-input', 'player-two', 'Player 2', 'O');

		console.log(playerOne);
		console.log(playerTwo);

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