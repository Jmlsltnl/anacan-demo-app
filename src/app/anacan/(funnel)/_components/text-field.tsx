"use client";

import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState, type ReactNode } from "react";

export function TextField({
  id,
  label,
  labelHint,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  icon,
  password = false,
  error,
  hint,
  autoComplete,
  min,
  max,
  autoFocus,
}: {
  id: string;
  label: string;
  labelHint?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  icon?: ReactNode;
  password?: boolean;
  error?: string | null;
  hint?: string;
  autoComplete?: string;
  min?: string;
  max?: string;
  autoFocus?: boolean;
}) {
  const [show, setShow] = useState(false);
  const resolvedType = password ? (show ? "text" : "password") : type;

  return (
    <div className="f-field">
      <label className="f-label" htmlFor={id}>
        {label}
        {labelHint ? <small> · {labelHint}</small> : null}
      </label>
      <div className={`f-control${error ? " error" : ""}`}>
        {icon}
        <input
          id={id}
          className="f-input"
          type={resolvedType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          min={min}
          max={max}
          autoFocus={autoFocus}
          aria-invalid={Boolean(error)}
        />
        {password && (
          <button
            type="button"
            className="f-eye"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Şifrəni gizlət" : "Şifrəni göstər"}
          >
            {show ? <EyeOff size={17} strokeWidth={2} /> : <Eye size={17} strokeWidth={2} />}
          </button>
        )}
      </div>
      {error ? (
        <p className="f-error-text">
          <AlertCircle size={13} strokeWidth={2.4} /> {error}
        </p>
      ) : hint ? (
        <p className="f-hint">{hint}</p>
      ) : null}
    </div>
  );
}
