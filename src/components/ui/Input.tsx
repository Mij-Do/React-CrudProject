import { forwardRef, memo, type InputHTMLAttributes, type Ref } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    id: string;
}

const Input = forwardRef(({name, id, ...rest}: IProps, ref: Ref<HTMLInputElement>) => {
    return (
        <input ref={ref} type="text" className="p-2 outline-0 border-2 rounded-md w-full my-2 border-indigo-300 focus:border-indigo-600" name={name} id={id} {...rest}/>
    )
});

export default memo(Input);