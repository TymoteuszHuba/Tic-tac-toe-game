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

		return {switchPlayer, setValue, colorChange, checkWinner};
	};

	const updateSquare = (square) => {
		const gameController = controlGame();
		gameController.switchPlayer();
		gameController.setValue(square);
		gameController.colorChange();
		gameController.checkWinner();
		// makeComputerMove(square);
		console.log(currentPlayer);
	};

	const makeComputerMove = (sq) => {
		const emptySquares = Array.from(squares).filter(
			(sq) => sq.innerText === ''
		);

		if (emptySquares.length > 0) {
			console.log('PLAYER 2');
			let randomIndex;
			let selectedSquare;
			do {
				randomIndex = Math.floor(Math.random() * emptySquares.length);
				selectedSquare = emptySquares[randomIndex];
			} while (
				(playerOne.movesArray.includes(selectedSquare.dataset.value) ||
					playerTwo.movesArray.includes(selectedSquare.dataset.value) ||
					selectedSquare === sq) &&
				emptySquares.length > 1
			);

			// const selectedSquare = emptySquares[randomIndex];
			console.log('randomIndex: ' + randomIndex);
			// console.log('electedSquare: ' * selectedSquare);
			console.log(playerOne.movesArray);
			updateSquare(sq);
			setTimeout(() => {
				updateSquare(selectedSquare);
			}, 300);
		}

		// updateSquare(selectedSquare);
	};

	const moveGame = (e) => {
		console.log(e.target);

		squares.forEach((square) => {
			square.addEventListener('click', () => {
				if (square.innerText === '') {
					if (e.target.id === 'play-with-user') {
						updateSquare(square);
						console.log(e.target.id);
					} else if (e.target.id === 'play-with-comp') {
						makeComputerMove(square);
						// updateSquare(square);
					}
				} else {
					return;
				}
			});
		});
	};

	const playWith = (e) => {
		if (e.target.id === 'play-with-user') {
			console.log('Start playing with user!');
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
			moveGame(e);
			console.log(playerOne);
			console.log(playerTwo);
		} else if (e.target.id === 'play-with-comp') {
			console.log('Start playing with computer!');
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
				'Computer',
				'O',
				'second-result'
			);

			showGame();
			moveGame(e);
			console.log(playerOne);
			console.log(playerTwo);
		} else if (e.target.id === 'restart__btn') {
			restartGame();
		}
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
				playWith(event);
			});
		});
	};

	initGame();
})();
