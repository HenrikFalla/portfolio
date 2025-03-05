'use client';
interface InputValues {
	placeholder: string;
	name: string;
	label?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	value: string;
	type: string;
}
export default function TextAreaInput(props: InputValues) {
	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		if (props.onChange) {
			props.onChange(e);
		}
	}
	return (
		<>
			{props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
			<textarea
				placeholder={props.placeholder}
				name={props.name}
				id={props.name}
				value={props.value}
				onChange={handleChange}
			></textarea>
		</>
	);
}
