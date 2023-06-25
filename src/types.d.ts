type opened = [number, number];

interface CardProps {
	value: number,
	index: number,
	openCard: (index: number) => void, 
	opened: opened, 
	finished: number[]
}