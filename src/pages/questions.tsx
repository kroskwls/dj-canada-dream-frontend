import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../component/button';
import { EDIT_QUESTION_MUTATION } from '../graphql/mutations';
import { ALL_QUESTIONS_QUERY } from '../graphql/queries';
import { AllQuestionsQuery, AllQuestionsQuery_allQuestions_questions } from '../__generated__/AllQuestionsQuery';
import { EditQuestionMutation, EditQuestionMutationVariables } from '../__generated__/EditQuestionMutation';
// @ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

interface IFormProps {
	answer: string;
}

const shuffle = (array: any[]) => {
	const shuffledArray = [...array];
	shuffledArray.sort(() => Math.random() - 0.5);
	return shuffledArray;
};

export const Questions = () => {
	const [isFinish, setIsFinish] = useState(false);
	const [showHint, setShowHint] = useState(false);
	const [fail, setFail] = useState(0);
	const [current, setCurrent] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	const [markingResult, setMarkingResult] = useState<boolean | null>(null);
	const [questions, setQuestions] = useState<AllQuestionsQuery_allQuestions_questions[]>([]);
	const [failQuestions, setFailQuestions] = useState<AllQuestionsQuery_allQuestions_questions[]>([]);
	const { data, error } = useQuery<AllQuestionsQuery>(ALL_QUESTIONS_QUERY, { fetchPolicy: 'network-only' });
	const init = (array: any) => {
		setCurrent(0);
		setTotalCount(array.length);
		setQuestions(shuffle(array));
		setIsFinish(false);
		setMarkingResult(null);
		setShowHint(false);
		resetForm();
		setFail(0);
		setFailQuestions([]);
	};
	useEffect(() => {
		if (data?.allQuestions.questions
			&& data?.allQuestions.questions?.length > 0
		) {
			init(data.allQuestions.questions);
		}
	}, [data]);
	const { getValues, register, handleSubmit, watch, reset: resetForm, formState: { isValid } } = useForm<IFormProps>({ mode: 'onChange' });
	const onClickHintButton = () => {
		if (!showHint) {
			setFail(cur => cur + 3);
			setShowHint(true);
		}
	};
	const onClickReset = () => {
		const ok = window.confirm('Do you want to reset current process?');
		if (ok) {
			init(questions);
		}
	};
	const onSubmit = () => {
		if (!isValid) {
			return;
		}

		if (markingResult) {
			onNext();
		} else {
			onMarking();
		}
	};
	const onMarking = () => {
		const { en: correctAnswer } = questions[current];
		const { answer: inputAnswer } = getValues();
		const input = inputAnswer.toLowerCase().replace(/[.]/g, '');
		const answer = correctAnswer.toLowerCase().replace(/[.]/g, '');
		if (input === answer) {
			// 정답
			onClickSpeech();
			setMarkingResult(true);
		} else {
			// 오답
			setMarkingResult(false);
			setFail(cur => cur + 1);
		}
	};
	const [editQuestionMutation] = useMutation<
		EditQuestionMutation, EditQuestionMutationVariables
	>(EDIT_QUESTION_MUTATION);
	const onNext = () => {
		// 마지막 문제인 경우
		if (current + 1 === questions.length) {
			setIsFinish(true);
		}
		// fail count save
		questions[current].failCount += (fail === 0 ? -1 : fail);
		if (questions[current].failCount >= 0) {
			editQuestionMutation({
				variables: {
					input: {
						id: questions[current].id,
						failCount: questions[current].failCount
					}
				}
			});
		}
		if (fail > 0) {
			setFailQuestions(cur => [...cur, questions[current]]);
		}
		// 상태 변수들 초기화
		setMarkingResult(null);
		setShowHint(false);
		resetForm();
		setFail(0);
		// 진행 +1
		setCurrent(cur => cur + 1);
	};
	const onClickInitAllQuestions = () => {
		init(data?.allQuestions.questions);
	};
	const onClickInitLatestQuestions = () => {
		const qs = data?.allQuestions.questions;
		if (!qs) {
			return;
		}

		let maxDate = 0;
		for (const q of qs) {
			const cur = new Date(q.createdAt).getTime();
			if (maxDate < cur) {
				maxDate = cur;
			}
		}
		const dateString = new Date(maxDate).toDateString();
		const latestQuestions = qs.filter(q => new Date(q.createdAt).toString().includes(dateString));
		init(latestQuestions);
	};
	const onClickInitRestryFailQuestions = () => {
		init(failQuestions);
	};
	const { speak, voices } = useSpeechSynthesis();
	const onClickSpeech = () => {
		const voice = voices.find((v: any) => v.lang === 'en-US' && v.name === 'Google US English');
		speak({
			text: questions[current].en,
			voice: voice,
			rate: 0.9,
			pitch: 1
		});
	};

	return (
		<>
			{!data ? (
				<div className='w-full h-screen justify-center font-bold text-3xl items-center flex'>
					{error?.message ? error?.message : 'Loading...'}
				</div>
			) : (
				<div className='container'>
					<div className='flex justify-end'>
						<Link to='/add-question' className='px-8 btn-lime w-full text-center'>Create New Question &rarr;</Link>
					</div>
					<hr className='my-5' />
					<div className='mb-5 grid grid-cols-2 gap-3'>
						<button className='px-5 btn-gray' onClick={onClickInitAllQuestions}>
							All Questions
						</button>
						<button className='px-5 btn-lime' onClick={onClickInitLatestQuestions}>
							Latest Questions
						</button>
					</div>
					<form className='p-5 border' onSubmit={handleSubmit(onSubmit)}>
						<h1 className='text-3xl font-semibold mb-5 text-center mt-5'>Question</h1>
						{!isFinish && (
							<>
								{/* 상황판 */}
								<div className='grid grid-cols-3 py-3'>
									<h4 className='text-left'>Fail: {fail}</h4>
									<h4 className='text-center'>Total Fail: {questions[current] ? questions[current].failCount : 0}</h4>
									<h4 className='text-right'>{current} / {totalCount}</h4>
								</div>
								{/* 문제 입/출력창 */}
								<div className='text-xl select-none'>
									{!isFinish && (
										<div className='p-3 flex justify-between items-center'>
											<h3>{questions[current]?.kr}</h3>
											{(showHint || markingResult) && <FontAwesomeIcon className='hover:cursor-pointer' icon={faVolumeHigh} onClick={onClickSpeech} />}
										</div>
									)}
									{showHint && (
										<h3 className='p-3 w-full mb-3'>
											{questions[current]?.en.split('').map((w, i) => {
												let className = '';
												if (showHint && watch('answer')) {
													const answer = watch('answer')[i]?.toLowerCase();
													className = answer === w.toLowerCase() ? 'text-gray-900' : 'text-red-500 underline';
												}
												return (
													<span key={i} className={className}>{w}</span>
												);
											})}
										</h3>
									)}
									<input
										className='input w-full text-xl'
										placeholder={questions.length === 0 ? 'No question' : 'Enter the answer'}
										{...register('answer', { required: true })}
										disabled={questions.length === 0}
									/>
								</div>
							</>
						)}
						<div className='p-3 text-center text-lg font-semibold'>
							{markingResult !== null && (
								markingResult
									? <span className='text-green-500'>Correct answer.</span>
									: <span className='text-red-500'>Wrong answer.</span>
							)}
							{isFinish && (
								<div>
									<span className='text-green-500'>All questions solved!</span>
									{failQuestions.length > 0 &&
										<h3 className='text-red-500'>{`${failQuestions.length} fail questions.`}</h3>
									}
								</div>
							)}
						</div>
						{isFinish && failQuestions.length > 0 &&
							<button type='button' className={`btn-gray w-full mb-5`} onClick={onClickInitRestryFailQuestions}>Retry Fail Questions</button>
						}
						{/* 버튼 */}
						<div className='flex justify-between'>
							<button type='button' className={`btn-gray w-1/3 mr-3 ${questions.length === 0 && 'btn-disable'}`} onClick={onClickReset}>Reset</button>
							<Button type='button' className={`w-1/3 mr-3 ${(isFinish || questions.length === 0) && 'btn-disable'}`} canClick={!showHint} actionText={'Hint'} onClick={onClickHintButton} />
							<button type='submit' className={`btn-lime w-1/3 ${(!isValid || isFinish || questions.length === 0) && 'btn-disable'}`}>{!markingResult ? 'Marking' : 'Next'}</button>
						</div>
					</form>
				</div>
			)
			}
		</>
	);
}