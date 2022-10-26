import { InputProps } from "../@types/interfaces";

const TextInput = ({ id, style, onChange, value }: InputProps) => (
  <input id={id} type="text" className={`p-1 border-2 border-gray border-solid ${style}`} onChange={onChange} value={value} />
);

export { TextInput };
