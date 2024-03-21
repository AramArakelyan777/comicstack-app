import "./Button.css"

export default function Button({ variant, children, ...rest }) {
    return (
        <button className={`button ${variant}`} {...rest}>
            {children}
        </button>
    )
}
