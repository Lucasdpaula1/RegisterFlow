// src/hooks/useCepLookup.ts
import { useState } from 'react';
import { api } from '@/config/api';
import { unmask } from '@/utils/masks';

export interface AddressData {
  zipCode: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
}

export function useCepLookup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function lookup(cep: string): Promise<AddressData | null> {
    const sanitized = unmask(cep);
    if (sanitized.length !== 8) return null;

    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get<AddressData>(
        `/address/search/cep/${sanitized}`,
      );
      return data;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { lookup, loading, error };
}