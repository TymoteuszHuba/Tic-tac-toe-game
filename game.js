// IIFE function to keep code encapsulated
const game = (() => {
	const btns = document.querySelectorAll('.game__btn');
	const main = document.querySelector('.main');
	const gameStart = document.querySelector('.game__setup');
	const playerText = document.querySelectorAll('.player__text');
	const inputs = document.querySelectorAll('.player__input');
	const squares = document.querySelectorAll('.square');
	const tie = document.querySelector('#tie-result');
	const winningArray = [
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
	let tieScore = 0;

	const showGame = () => {
		playerText[0].style.color = 'var(--orange)';
		main.style.visibility = 'visible';
		main.style.opacity = '1';
		gameStart.style.display = 'none';
	};

	// factory function
	const createPlayer = (inputId, playerId, defautName, marker, scoreId) => {
		const input = document.getElementById(inputId);
		const player = document.getElementById(playerId);
		const scoreElement = document.getElementById(scoreId);
		let score = 0;

		if (input && player) {
			const playerName = input.value || defautName;
			player.innerText = `${playerName} (${marker})`;

			const movesArray = [];
			const playerObject = {
				name: playerName,
				marker: marker,
				movesArray: movesArray,
				score: score,
				updateScore: function () {
					score++;
					scoreElement.innerText = score;
				},
			};
			return playerObject;
		}
	};

	const controlGame = () => {
		const switchPlayer = () => {
			currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
		};

		const colorChange = () => {
			if (currentPlayer === playerTwo) {
				playerText[0].style.color = 'var(--orange)';
				playerText[2].style.color = 'var(--white)';
			} else if (currentPlayer === playerOne) {
				playerText[2].style.color = 'var(--orange)';
				playerText[0].style.color = 'var(--white)';
			}
		};

		const setValue = (val) => {
			val.innerText = currentPlayer.marker;
			currentPlayer.movesArray.push(parseInt(val.dataset.value));
		};

		const tieCheck = () => {
			tieScore++;
			tie.innerText = tieScore;
		};

		const checkWinner = () => {
			const currentMoves = currentPlayer.movesArray;

			for (const combination of winningArray) {
				const isWinningCombination = combination.every((move) =>
					currentMoves.includes(move)
				);

				if (isWinningCombination) {
					for (const move of combination) {
						const winningSquare = squares[move];
						winningSquare.style.color = 'var(--orange)';
					}

					const winner = currentPlayer.name;

					setTimeout(() => {
						alert(`THE WINNER IS: ${winner}!!`);
						currentPlayer.updateScore();
						claerBoard();
					}, 300);

					return;
				}
			}

			if (playerOne.movesArray.length + playerTwo.movesArray.length === 9) {
				setTimeout(() => {
					alert("IT's A DRAW!");
					tieCheck();
					claerBoard();
				}, 300);
			}
		};

		const claerBoard = () => {
			squares.forEach((square) => {
				square.innerText = '';
				square.style.color = 'var(--white)';
			});
			playerOne.movesArray = [];
			playerTwo.movesArray = [];
		};

		const updateSquare = (square) => {
			switchPlayer();
			setValue(square);
			colorChange();
			checkWinner();
			console.log(currentPlayer);
		};

		return {updateSquare};
	};

	const moveGame = () => {
		const gameController = controlGame();
		squares.forEach((square) => {
			square.addEventListener('click', () => {
				if (square.innerText === '') {
					gameController.updateSquare(square);
					console.log(square.dataset.value);
				} else {
					return;
				}
			});
		});
	};

	const playWithUser = () => {
		playerOne = createPlayer(
			'player-one-input',
			'player-one',
			'Player 1',
			'X',
			'first-result'
		);

		playerTwo = createPlayer(
			'player-two-input',
			'player-two',
			'Player 2',
			'O',
			'second-result'
		);

		showGame();
		moveGame();
		console.log(playerOne);
		console.log(playerTwo);
	};

	const playWithComp = () => {
		showGame();

		playerOne = createPlayer('player-one-input', 'player-one', 'Player 1', 'X');
		comp = createPlayer('player-two-input', 'player-two', 'Computer', 'O');
	};

	const restartGame = () => {
		location.reload();
		inputs.forEach((input) => {
			input.value = '';
		});
	};
	const initGame = () => {
		btns.forEach((btn) => {
			btn.addEventListener('click', (event) => {
				if (event.target.id === 'play-with-user') {
					playWithUser();
				} else if (event.target.id === 'play-with-comp') {
					playWithComp();
				} else if (event.target.id === 'restart__btn') {
					console.log('TO DO');
					restartGame();
				}
			});
		});
	};

	initGame();
})();
