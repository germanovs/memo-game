import { useEffect, useState, useMemo } from 'react'
import './App.css'

type opened =  [ number, number ];
type game = number[];

function App() {

	const [game, setGame] = useState<game>([])
	const [opened, setOpened] = useState<opened>([-1, -1])
	const [finished, setFinished] = useState<number[]>([])
	const [ moves, setMoves ] = useState<number>(0)
	
	useEffect(() => {
		startGame();
	}, [])

	const startGame = () => {
		const numbers = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6 ];
		const shuffled = numbers.sort(() => Math.random() - 0.5);
		setOpened([-1, -1]);
		setFinished([]);
		setMoves(0);
		setTimeout(() => {
			setGame(shuffled);
		}, 500);
	}

	const openCard = (index: number) => {

		if (opened.includes(index) || gameIsFinished) {
			return;
		}

		setOpened((opened: opened) => {
			let next: opened = [...opened];
			if (opened[0] === -1 && opened[1] === -1) {
				next = [index, -1];
			} else if (opened[0] !== -1 && opened[1] === -1) {
				next = [opened[0], index];
			} else {
				next = [index, -1];
			}
			return next;
		})
		setMoves(moves => moves + 1);
	}

	useEffect(() => {
		if (opened[0] !== -1 && opened[1] !== -1) {
			if (game[opened[0]] === game[opened[1]]) {
				setFinished((finished: number[]) => {
					let next = [...finished, game[opened[0]]];
					return next;
				})
			}
		}
	}, [opened])

	const gameIsFinished = useMemo(() => {
		return finished.length === 6;
	}, [finished])

	return (
		<div className="d-flex flex-column align-items-center">
			<h2>Memo TS</h2>
			<div className="w-50 d-flex flex-wrap justify-content-center align-items-center">
				{
					game.map((card, index) => {
						return <Card
							key={index}
							index={index}
							value={card}
							openCard={openCard}
							opened={opened}
							finished={finished}
							/>
					})
				}
			</div>
			{
			gameIsFinished 
			? <div>Game is finished in {moves} moves!</div>
			: <div>Moves: {moves} </div>
			}
		<button onClick={() => startGame()}>Restart</button>
		</div>
	)
}

function Card({ value, index, openCard, opened, finished }: { value: number, index: number, openCard: (index: number) => void, opened: opened, finished: number[] })
{
	console.log(opened);
	
	const className = useMemo(() => {
		let className = 'card';
		if (finished.includes(value)) {
			className += ' finished';
		}
		if (opened.includes(index)) {
			className += ' opened';
		}
		return className;
	}, [opened, finished, value, index])

	return <>
		<div className="card-wrapper">
			<div className={className} onClick={() => openCard(index)}>
				<div className="card-front">
					?
				</div>
				{value}
			</div>
		</div>
	</>
}

export default App
