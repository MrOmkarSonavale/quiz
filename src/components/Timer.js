import { type } from "@testing-library/user-event/dist/type"
import { useEffect } from "react"

function Timer({ secondRemaining, dispatch }) {
	const min = Math.floor(secondRemaining / 60);
	const sec = secondRemaining % 60;

	useEffect(function () {
		const id = setInterval(function () {
			dispatch({ type: "tick" })
		}, 1000)

		return () => clearInterval(id);
	}, [dispatch])


	return (
		<div className="timer">
			{min < 10 && "0"}
			{min}:
			{sec < 10 && "0"}
			{sec}

		</div>
	)
}

export default Timer;
