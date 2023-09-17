export default function InputLabel({ forInput, value, className, children }) {
    return (
        <label
            htmlFor={forInput}
            className={
                `block text-sky-500 font-medium text-sm text-gray-700 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
