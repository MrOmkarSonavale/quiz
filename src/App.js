import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Startscreen from "./components/Startscreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";

// import { type } from "@testing-library/user-event/dist/type";
const SECS_PER_QUESTION = 30;

const initialState = {
	questions: [],
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondRemaining: 10,
};

function reducer(state, action) {
	switch (action.type) {
		case "dataRecived":
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			};

		case 'dataFailed':
			return {
				...state,
				status: 'error'
			};

		case 'start':
			return {
				...state,
				status: 'active',
				secondRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case 'newAnswer':
			const question = state.questions.at(state.index);

			return {
				...state,
				answer: action.payload,
				points: action.payload === question.correctOption
					? state.points + question.points
					: state.points
			};
		case 'nextQuestion':
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};

		case 'finish':
			return {
				...state,
				status: "finished",
				highscore: state.points >
					state.highscore ? state.points : state.highscore
			}


		case 'restart':
			return {
				...initialState,
				questions: state.questions,
				status: 'ready'
			}

		case "tick":
			return {
				...state,
				secondRemaining: state.secondRemaining - 1,
				status: state.secondRemaining === 0 ? 'finished' : state.status,
			}

		default: throw new Error('action unknown');
	}
}

export default function App() {

	const [{ questions, status, index, answer, points, highscore, secondRemaining }, dispatch] = useReducer(reducer, initialState);

	const numberQuestion = questions.length;
	const maxPossiblePoints = questions.reduce((prev, curr) => (
		prev + curr.points
	), 0)

	useEffect(function () {
		fetch('https://serverv1-dzlr.onrender.com/questions')
			.then(res => res.json())
			.then(data => dispatch({ type: "dataRecived", payload: data }))
			.catch(err => dispatch({ type: 'dataFailed' }));
	}, [])


	return <div className="app">
		<Header />

		<Main>
			{
				status === 'loading' && <Loader />
			}
			{
				status === 'error' && <Error />
			}
			{
				status === 'ready' && <Startscreen
					numberQuestion={numberQuestion}
					dispatch={dispatch}
				/>
			}
			{
				status === 'active' && (
					<>

						<Progress
							index={index}
							numberQuestion={numberQuestion}
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}

						/>

						<Question
							questions={questions[index]}
							dispatch={dispatch}
							answer={answer}

						/>

						<footer>

							<Timer secondRemaining={secondRemaining} dispatch={dispatch} />

							<NextButton
								dispatch={dispatch}
								answer={answer}
								index={index}
								numberQuestion={numberQuestion}
							/>
						</footer>


					</>
				)
			}

			{
				status === 'finished' &&
				<FinishScreen
					points={points}
					maxPossiblePoints={maxPossiblePoints}
					highscore={highscore}
					dispatch={dispatch}
				/>
			}
		</Main>
	</div>;
}