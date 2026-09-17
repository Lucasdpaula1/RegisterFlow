// src/components/forms/UserRegisterForm/PersonalDataFields.tsx
import { Input } from '@/components/ui/Input';
import { maskCpf } from '@/utils/masks';
import { ChangeEvent } from 'react';

interface PersonalDataFieldsProps {
  name: string;
  email: string;
  cpf: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onCpfChange: (value: string) => void;
}

export function PersonalDataFields({
  name,
  email,
  cpf,
  onNameChange,
  onEmailChange,
  onCpfChange,
}: PersonalDataFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input
        id="name"
        label="Nome completo"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onNameChange(e.target.value)
        }
        placeholder="Lucas Silva"
      />
      <Input
        id="email"
        label="E-mail"
        type="email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onEmailChange(e.target.value)
        }
        placeholder="lucas@exemplo.com"
      />
      <Input
        id="cpf"
        label="CPF"
        value={cpf}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onCpfChange(maskCpf(e.target.value))
        }
        placeholder="000.000.000-00"
        className="sm:col-span-2"
      />
    </div>
  );
}