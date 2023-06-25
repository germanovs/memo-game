import { useMemo, FC } from 'react'

const Card: FC<CardProps> = ({ value, index, openCard, opened, finished }): JSX.Element => {

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

export default Card