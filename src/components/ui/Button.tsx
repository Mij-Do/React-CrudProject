import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className: string;
    children: ReactNode;
}

const Buttons = ({className, children, ...rest}: IProps) => {
    return (
        <button className={`${className} outline-0 w-full p-2 rounded-md text-white cursor-pointer`} {...rest}> {children} </button>
    )
}

export default Buttons;