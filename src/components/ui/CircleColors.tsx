interface IProps {
    color: string;
}

const CircleColors = ({ color }: IProps) => {
    return <span className="w-5 h-5 rounded-full block cursor-pointer" style={{backgroundColor: color}}></span>
}

export default CircleColors;