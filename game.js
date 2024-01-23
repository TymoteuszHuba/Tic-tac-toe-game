// ----------- to do -----------------
// gameOver flag which will inform us about end game, after fires set also points to winner
// move which control (true, false) who whill make a move X or O
// we must create array contains three win number combinations
// we need also an epty array to catch another array of tree data-value numbers. If that combination will be the same like winning array then end game

const gameboard = (() => {
	const gameBtn = document.querySelectorAll('.game__btn');
	const gameBtns = document.querySelector('.game__btns');
	const main = document.querySelector('.main');
	const playerText = document.querySelector('.player__second');
	const squares = document.querySelectorAll('.square');

	const gameOver = false;
	let move = true;
	const circle = 'O';
	const cross = 'X';

	const showGame = () => {
		main.style.visibility = 'visible';
		main.style.opacity = '1';
		gameBtns.style.display = 'none';
	};

	const playWithUser = () => {
		playerText.childNodes[3].style.display = 'none';
	};

	const playWithComp = () => {
		playerText.childNodes[1].style.display = 'none';
	};

	const choosePlayer = (e) => {
		if (e.target.id === 'play-with-user') {
		} else if (e.target.id === 'play-with-comp') {
		}
	};

	const setVal = (square) => {
		console.log(square.innerText);
		if (square.innerText === '') {
			console.log('EMPTY!');
			square.innerText = cross;
		} else if (square.innerText !== '') {
			return;
		}
	};

	const moveToggle = () => {
		move = !move;
		console.log(move);
	};

	squares.forEach((square) => {
		square.addEventListener('click', () => {
			moveToggle();
			setVal(square);
		});
	});

	gameBtn.forEach((btn) => {
		btn.addEventListener('click', (event) => {
			if (event.target.id === 'play-with-user') {
				showGame();
				playWithUser();
			} else if (event.target.id === 'play-with-comp') {
				showGame();
				playWithComp();
			} else if (event.target.id === 'restart__btn') {
				console.log('NOTHIG YET');
			}
		});
	});
})();
