import "./Input.css"

export default function Input({ variant, ...rest }) {
    return <input className={`input ${variant}`} {...rest} />
}
