import type { ReactNode } from "react";

interface IProps {
    className: string;
    children: ReactNode;
}

const Buttons = ({className, children}: IProps) => {
    return (
        <button className={`${className} w-full p-2 rounded-md text-white cursor-pointer`}> {children} </button>
    )
}

export default Buttons;