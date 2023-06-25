import { useEffect, useState, useMemo, FC } from 'react'
import Card from './Card'
import './App.css'

const possibles = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

const App: FC = (): JSX.Element => {

	const [game, setGame] = useState<number[]>([])
	const [opened, setOpened] = useState<opened>([-1, -1])
	const [finished, setFinished] = useState<number[]>([])
	const [moves, setMoves] = useState<number>(0)

	useEffect(() => {
		startGame();
	}, [])

	const startGame = () => {
		const numbers = [ ...possibles, ...possibles ];
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
		return finished.length >= possibles.length;
	}, [finished])

	return (
		<>
			<h2>Memo TS</h2>
			<div className="cards">
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
		</>
	)
}

export default App
