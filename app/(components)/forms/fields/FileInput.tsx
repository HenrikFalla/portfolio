import { ChangeEvent } from 'react';

interface InputValues {
	name: string;
	label?: string;
	onChange?: (e: HTMLInputEvent) => void;
	accept?: string;
	multiple: boolean;
}
interface HTMLInputEvent extends ChangeEvent<HTMLInputElement> {
	target: HTMLInputElement & EventTarget;
}
export default function FileInput(props: InputValues) {
	function handleChange(e: HTMLInputEvent) {
		if (props.onChange) {
			props.onChange(e);
		}
	}
	return (
		<>
			{props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
			<input
				type='file'
				name={props.name}
				id={props.name}
				onChange={handleChange}
				accept={props.accept ? props.accept : '*'}
				multiple={props.multiple}
			/>
		</>
	);
}
