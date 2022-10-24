import {InputProps} from '../@types/interfaces';

const TextInput = ({style, onChange}: InputProps) => (
  <input type="text" className={`border-2 border-black border-solid ${style}`} onChange={onChange} />
);

export {TextInput};
