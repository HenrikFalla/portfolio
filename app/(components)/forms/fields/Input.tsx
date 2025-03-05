interface InputValues {
	placeholder?: string;
	name: string;
	label?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	type?: string;
}
export default function Input({ type = 'text', ...props }: InputValues) {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (props.onChange) {
			props.onChange(e);
		}
	}
	return (
		<>
			{props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
			<input
				type={type}
				placeholder={props.placeholder ? props.placeholder : ''}
				name={props.name}
				id={props.name}
				onChange={handleChange}
				value={props.value}
			/>
		</>
	);
}
