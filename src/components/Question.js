import Options from "./Options"

export default function Question({ questions, dispatch, answer }) {
	return (
		<div>
			<h4>{questions.question}</h4>
			<Options question={questions} dispatch={dispatch} answer={answer} />
		</div>
	)
}