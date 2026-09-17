// src/components/forms/UserRegisterForm/index.tsx
'use client';

import { useState } from 'react';
import { PersonalDataFields } from './PersonalDataFields';
import { AddressFields } from './AddressFields';
import { AddressData } from '@/hooks/useCepLookup';
import { api, ApiError } from '@/config/api';
import { unmask } from '@/utils/masks';

export function UserRegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState<AddressData & { number: string }>({
    zipCode: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    number: '',
    complement: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSuccess(false);

    try {
      await api.post('/users/register', {
        name,
        email,
        cpf: unmask(cpf),
        address: { ...address, zipCode: unmask(address.zipCode) },
      });
      setSuccess(true);
    } catch (err) {
      const error = err as ApiError;

      if (error.statusCode === 409) {
        setSubmitError('Não foi possível cadastrar este usuário. Verifique os dados e tente novamente.');
      } else if (error.statusCode === 400) {
        setSubmitError('Verifique os dados informados e tente novamente');
      } else if (!error.statusCode) {
        setSubmitError('Não foi possível conectar ao servidor');
      } else {
        setSubmitError('Não foi possível concluir o cadastro. Tente novamente em instantes.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl flex-col gap-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Dados pessoais</h2>
        <div className="mt-4">
          <PersonalDataFields
            name={name}
            email={email}
            cpf={cpf}
            onNameChange={setName}
            onEmailChange={setEmail}
            onCpfChange={setCpf}
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900">Endereço</h2>
        <div className="mt-4">
          <AddressFields address={address} onAddressChange={setAddress} />
        </div>
      </div>

      {submitError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {submitError}
        </p>
      )}

      {success && (
        <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Usuário cadastrado com sucesso.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
      >
        {submitting ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
}