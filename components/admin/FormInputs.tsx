'use client';

import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

// Base Input
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        {label} {props.required && <span className="text-neutral-400">*</span>}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900 placeholder:text-neutral-400 ${
          error ? 'border-neutral-900' : ''
        } ${className}`}
      />
      {error && <p className="text-neutral-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

// Textarea
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        {label} {props.required && <span className="text-neutral-400">*</span>}
      </label>
      <textarea
        {...props}
        className={`w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900 placeholder:text-neutral-400 resize-none ${
          error ? 'border-neutral-900' : ''
        } ${className}`}
      />
      {error && <p className="text-neutral-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

// Select
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        {label} {props.required && <span className="text-neutral-400">*</span>}
      </label>
      <select
        {...props}
        className={`w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900 ${
          error ? 'border-neutral-900' : ''
        } ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-neutral-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

// Checkbox
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          {...props}
          className={`peer sr-only ${className}`}
        />
        <div className="w-5 h-5 border-2 border-neutral-300 rounded peer-checked:bg-neutral-900 peer-checked:border-neutral-900 transition-colors" />
        <svg
          className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
        {label}
      </span>
    </label>
  );
}

// Dynamic List Input (for features, scope, etc.)
export interface ListInputProps {
  label: string;
  items: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
  placeholder?: string;
  addLabel?: string;
}

export function ListInput({
  label,
  items,
  onAdd,
  onRemove,
  onChange,
  placeholder = 'Enter item',
  addLabel = '+ Add Item',
}: ListInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => onChange(index, e.target.value)}
              className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-neutral-900 placeholder:text-neutral-400"
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="mt-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
      >
        {addLabel}
      </button>
    </div>
  );
}

// Form Actions (Submit/Cancel buttons)
interface FormActionsProps {
  submitLabel?: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export function FormActions({ submitLabel = 'Save', isSubmitting = false, onCancel }: FormActionsProps) {
  return (
    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-neutral-200">
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-neutral-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Saving...
          </span>
        ) : (
          submitLabel
        )}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
