
export interface AddressEntity {
  id: string;
  zipCode: string;
  street: string;
  complement: string | null; // <- reflete o schema.prisma (String?)
  neighborhood: string;
  city: string;
  state: string;
  number: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}