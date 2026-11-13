import React from "react";

interface CheckboxProps {
    id: string;
    label: string;
    checked: boolean | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    id,
    label,
    checked,
    onChange,
    disabled = false,
}) => {
    return (
        <div className="checkbox">
            <input
                type="checkbox"
                name={id}
                id={id}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="checkbox__input"
            />
            <label className="checkbox__label" htmlFor={id}>
                {label}
            </label>
        </div>
    );
};
