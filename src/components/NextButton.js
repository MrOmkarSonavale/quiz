function NextButton({ dispatch, answer, index, numberQuestion }) {
	if (answer === null) return null;

	if (index < numberQuestion - 1)
		return (
			<button className="btn btn-ui"
				onClick={() => dispatch({ type: 'nextQuestion' })}
			>Next</button>
		)


	if (index === numberQuestion - 1)
		return (
			<button className="btn btn-ui"
				onClick={() => dispatch({ type: 'finish' })}
			>Finish</button>
		)
}

export default NextButton
