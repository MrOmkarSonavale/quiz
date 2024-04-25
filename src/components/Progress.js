function Progress({ index, numberQuestion, points, maxPossiblePoints, answer }) {
	return (
		<header className="progress">
			<progress
				max={numberQuestion}
				value={index + Number(answer !== null)}

			/>



			<p>
				Question <strong>{index + 1}</strong> / {numberQuestion}
			</p>

			<p>
				<strong>{points}</strong> / {maxPossiblePoints}
			</p>
		</header>
	)
}

export default Progress;
