import { memo, type InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    id: string;
}

const Input = ({name, id, ...rest}: IProps) => {
    return (
        <input type="text" className="p-2 outline-0 border-2 rounded-md w-full my-2 border-indigo-300 focus:border-indigo-600" name={name} id={id} {...rest}/>
    )
}

export default memo(Input);