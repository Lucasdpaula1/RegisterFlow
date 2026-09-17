// src/components/forms/UserRegisterForm/AddressFields.tsx
import { Input } from '@/components/ui/Input';
import { maskCep } from '@/utils/masks';
import { useCepLookup, AddressData } from '@/hooks/useCepLookup';
import { ChangeEvent } from 'react';

interface AddressFieldsProps {
  address: AddressData & { number: string };
  onAddressChange: (address: AddressData & { number: string }) => void;
}

export function AddressFields({ address, onAddressChange }: AddressFieldsProps) {
  const { lookup, loading, error } = useCepLookup();

  async function handleCepChange(e: ChangeEvent<HTMLInputElement>) {
    const maskedCep = maskCep(e.target.value);
    onAddressChange({ ...address, zipCode: maskedCep });

    const result = await lookup(maskedCep);
    if (result) {
      onAddressChange({ ...address, ...result, zipCode: maskedCep });
    }
  }

  function updateField(field: keyof AddressData | 'number', value: string) {
    onAddressChange({ ...address, [field]: value });
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Input
        id="zipCode"
        label="CEP"
        value={address.zipCode}
        onChange={handleCepChange}
        placeholder="00000-000"
        error={error ?? undefined}
      />
      <Input
        id="street"
        label="Rua"
        value={address.street}
        onChange={(e) => updateField('street', e.target.value)}
        disabled={loading}
        className="sm:col-span-2"
      />
      <Input
        id="number"
        label="Número"
        value={address.number}
        onChange={(e) => updateField('number', e.target.value)}
      />
      <Input
        id="complement"
        label="Complemento"
        value={address.complement ?? ''}
        onChange={(e) => updateField('complement', e.target.value)}
      />
      <Input
        id="neighborhood"
        label="Bairro"
        value={address.neighborhood}
        onChange={(e) => updateField('neighborhood', e.target.value)}
        disabled={loading}
      />
      <Input
        id="city"
        label="Cidade"
        value={address.city}
        onChange={(e) => updateField('city', e.target.value)}
        disabled={loading}
      />
      <Input
        id="state"
        label="UF"
        value={address.state}
        onChange={(e) => updateField('state', e.target.value)}
        disabled={loading}
        maxLength={2}
      />
    </div>
  );
}