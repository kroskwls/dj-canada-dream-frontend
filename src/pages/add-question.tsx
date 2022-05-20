import { useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button } from '../component/button';
import { ADD_QUESTION_MUTATION } from '../graphql/mutations';
import { AddQuestionMutation, AddQuestionMutationVariables } from '../__generated__/AddQuestionMutation';

interface IFormProps {
	kr: string;
	en: string;
}

export const AddQuestion = () => {
	const history = useHistory();
	const [addQuestionMutation] = useMutation<
		AddQuestionMutation,
		AddQuestionMutationVariables
	>(ADD_QUESTION_MUTATION, {
		onCompleted: ({ addQuestion: { ok, error } }: AddQuestionMutation) => {
			if (ok) {
				window.alert('Creating is success!!');
				setFocus('kr');
				reset();
			} else {
				window.alert(error);
			}
		}
	});
	const { getValues, register, handleSubmit, formState: { isValid }, reset, setFocus } = useForm<IFormProps>({ mode: 'onChange' });
	const onSubmit = () => {
		if (!isValid) {
			console.log('잘못된 입력');
			return;
		}

		const { kr, en } = getValues();
		addQuestionMutation({
			variables: {
				input: { kr, en }
			}
		});
	};

	return (
		<div className='container flex flex-col items-center mt-10 md:mt-52'>
			<h1 className='text-2xl font-bold mb-3'>Add Question</h1>
			<form className='grid gap-3 w-full max-w-screen-sm' onSubmit={handleSubmit(onSubmit)}>
				<input
					className='input'
					{...register('kr', {
						required: true,
					})}
					placeholder='Korean'
				/>
				<input
					className='input'
					{...register('en', {
						required: true,
					})}
					placeholder='English'
				/>
				<Button type='submit' canClick={isValid} actionText={'Save'} />
			</form>
			<p className='mt-5 text-lime-600 hover:underline cursor-pointer' onClick={() => history.goBack()}>Go back &larr;</p>
		</div>
	);
}