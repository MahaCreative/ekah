export default function InputError({ message, className = "" }) {
    return message ? (
        <p className={"text-[8pt] text-red-600 " + className}>{message}</p>
    ) : null;
}
