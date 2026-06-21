// CO3: React component model - props as configuration contract
import { useState, type ChangeEvent } from 'react';

interface Props {
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ placeholder = 'Search...', onChange }: Props) {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="position-relative">
      <label htmlFor="site-search" className="visually-hidden">
        {placeholder}
      </label>
      <input
        id="site-search"
        type="search"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        aria-label={placeholder}
      />
    </div>
  );
}
