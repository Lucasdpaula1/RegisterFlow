'use client';

import { useState, useEffect } from 'react';

export interface AddressResponseDto {
  id: string;
  zipCode: string;
  street: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  number: string;
}

export interface UserWithAddressResponseDto {
  id: string;
  email: string;
  cpf: string;
  name: string;
  address?: AddressResponseDto | null;
}

export default function UsersList() {
  const [users, setUsers] = useState<UserWithAddressResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users'); // Substitua pela sua URL da API

        if (!response.ok) {
          throw new Error('Erro ao carregar a lista de usuários.');
        }

        const data: UserWithAddressResponseDto[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro inesperado ao buscar dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const formatCpf = (cpf: string) => {
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatZipCode = (zipCode: string) => {
    const cleaned = zipCode.replace(/\D/g, '');
    return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm animate-pulse flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0" />
              <div className="space-y-2">
                <div className="h-5 bg-slate-200 rounded w-40" />
                <div className="h-4 bg-slate-200 rounded w-56" />
                <div className="h-3 bg-slate-200 rounded w-28" />
              </div>
            </div>
            <div className="w-full md:w-64 space-y-2 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 pt-4 md:pt-0">
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl inline-block text-sm font-medium">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Usuários e Endereços</h1>
        <p className="text-sm text-slate-500 mt-1">
          Listagem detalhada de cadastros e dados de localização.
        </p>
      </header>

      {users.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl">
          <p className="text-slate-500 font-medium">Nenhum usuário encontrado.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row justify-between gap-6"
            >
              {/* Informações Pessoais */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm border border-indigo-100 flex-shrink-0">
                  {getInitials(user.name)}
                </div>

                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">
                    {user.name}
                  </h2>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-600">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {user.email}
                    </span>
                    <span>•</span>
                    <span className="font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                      CPF: {formatCpf(user.cpf)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Informações de Endereço */}
              <div className="md:w-80 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
                {user.address ? (
                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {user.address.city} - {user.address.state}
                      </span>

                      <span className="text-xs font-mono font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        CEP {formatZipCode(user.address.zipCode)}
                      </span>
                    </div>

                    <p className="text-slate-800 font-medium text-xs leading-relaxed">
                      {user.address.street}, nº {user.address.number}
                      {user.address.complement && ` (${user.address.complement})`}
                    </p>

                    <p className="text-xs text-slate-500">
                      Bairro: <span className="text-slate-700">{user.address.neighborhood}</span>
                    </p>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 italic">
                    Endereço não cadastrado.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}