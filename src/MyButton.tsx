type Props = {
    className?: string;
    onClick?: any;
    title?: string;
    contentButton?: string;
}

export default function MyButton(props: Props) {
    return <button title={props.title || "buttonTitle"} className={`button-dark p-5 m-5 border-solid rounded ${props.className}`} onClick={props.onClick}>{props.contentButton}</button>
}
