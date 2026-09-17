// src/hooks/useMaskedField.ts
import { useState, ChangeEvent } from 'react';

type MaskFn = (value: string) => string;

export function useMaskedField(maskFn: MaskFn, initialValue = '') {
  const [value, setValue] = useState(initialValue);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(maskFn(event.target.value));
  }

  return { value, onChange, setValue };
}