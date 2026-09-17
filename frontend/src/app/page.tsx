// src/app/page.tsx
import { Button } from '@/components/ui/Button';
import { FlowLine } from '@/components/ui/FlowLine';

export default function WelcomePage() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-slate-50 lg:grid-cols-[3fr_2fr]">
      <div className="flex flex-col justify-center px-8 py-16 sm:px-16 lg:px-20">
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Bem-vindo à plataforma RegisterFlow
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Cadastre novos usuários e acompanhe quem já faz parte da sua base,
            tudo em um só lugar.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/register" variant="primary">
              Criar usuário
            </Button>
            <Button href="/users" variant="secondary">
              Listar usuários
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden items-center justify-center bg-teal-50/40 lg:flex">
        <div className="h-[70%] w-[60%]">
          <FlowLine />
        </div>
      </div>
    </main>
  );
}