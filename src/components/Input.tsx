import { InputProps } from "../@types/interfaces";

const TextInput = ({ style, onChange, id }: InputProps) => (
  <input id={id} type="text" className={`p-1 border-2 border-gray border-solid ${style}`} onChange={onChange} />
);

export { TextInput };
