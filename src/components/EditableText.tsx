import { useEffect, useRef, useState } from "preact/hooks";

interface EditableTextProps {
    className: string;
    initialValue: string;
}

export function EditableText({ className, initialValue }: EditableTextProps) {
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const inputHandler = (e: InputEvent) => {
        const target = e.target as HTMLInputElement;
        setValue(target.value);
    };

    const keyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            setIsEditing(false);
        }
    };

    return (
        <div className={className}>
            {isEditing ? (
                <input
                    className="editable_input"
                    ref={inputRef}
                    type="text"
                    value={value}
                    onInput={inputHandler}
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={keyDown}
                />
            ) : (
                <p style={{ margin: 0 }} onDblClick={() => setIsEditing(true)}>
                    {value.trim() === "" ? initialValue : value}
                </p>
            )}
        </div>
    );
}
