RegisterFlow — Documentação da Plataforma
Criada com o objetivo de estimular e consolidar conhecimentos de conexão entre serviços mediante um docker-compose configurado.

🏗️ Visão Geral e Arquitetura
A aplicação foi projetada em dois ambientes (dev e prod), diferenciando-se pela forma como a aplicação é construída, provisionada e monitorada.

O Papel do NGINX
Ambos os containers de serviço (Frontend e Backend) ficam escondidos atrás de um NGINX, que coordena e controla o fluxo interno da rede Docker. O host não consegue acessar o Frontend nem o Backend de forma direta, pois esses containers não expõem portas para o host (ports mapeadas com bind de IP externo), expondo-as apenas internamente na rede Docker onde o NGINX está conectado (atuando como único ponto de entrada, localhost:80).

Plaintext
                  INTERNET / HOST
                         │ (localhost:80)
                         ▼
                 ┌───────────────┐
                 │     NGINX     │
                 │ Reverse Proxy │
                 └───────┬───────┘
                         │ (Rede interna Docker)
        ┌────────────────┴────────────────┐
        ▼                                 ▼
   FRONTEND                          BACKEND
   (Next.js dev/build)            (NestJS)
        │                                 │
        ▼                                 ▼
    [Redis Cache]                     [RabbitMQ Fila]
    (Respostas CEP)                       │
                                          ▼
                                   WORKER (PHP)
                                   (Notificações / Boas-vindas)
💻 Ambiente de Desenvolvimento (Dev) e Hot Reload
No ambiente de desenvolvimento, a aplicação foi desenhada para funcionar no formato hot reload (refletir automaticamente as mudanças realizadas pelo desenvolvedor):

Volumes de Desenvolvimento: Foi necessário criar um bind/volume entre o container e o host do desenvolvedor. Quando um arquivo é modificado no host, ele reflete imediatamente dentro do container.

Frontend: Executado com comando de desenvolvimento (ex: next dev), que monitora a mudança de arquivos em tempo real.

Backend: Monitorado pelo ecossistema do NestJS, com revalidação/recompilação dinâmica de arquivos modificados.

Isolamento de Rede: Portas de front/back não expostas ao host, acessíveis estritamente via NGINX na rede Docker.

🔑 Camada de Escalabilidade e Resiliência (Redis, RabbitMQ, Worker)
A implementação de serviços específicos foi a camada chave para garantir escalabilidade e resiliência:

Redis: Responsável por registrar temporariamente o retorno do endpoint de CEP (GET /api/search/cep/{cep}), visando aumentar a velocidade de resposta entre o cliente e o servidor. Uma vez armazenado em memória RAM, o dado é servido instantaneamente em novas requisições para o mesmo CEP.

RabbitMQ: Serve como ponte assíncrona entre a aplicação Backend e um Worker, desacoplando o envio de notificações da requisição principal (POST /api/register). Isso otimiza a resposta imediata para o cliente. O Backend age como publisher publicando a mensagem da fila.

Worker (PHP): Desenvolvido em PHP com driver de conexão para o RabbitMQ na mesma rede Docker. O worker consome/escuta regularmente a fila e executa tarefas em segundo plano (especificamente o envio de e-mail de boas-vindas ao usuário recém-cadastrado).

📊 Observabilidade em Produção (Prometheus & Grafana)
O Grafana e o Prometheus foram desenhados para serem utilizados exclusivamente no ambiente de Produção, garantindo observabilidade completa da plataforma:

Gauge: Utilizado para monitorar métricas instantâneas/flutuantes, como o pico de usuários acessando a plataforma de forma simultânea.

Counter: Utilizado para monitorar métricas cumulativas, como a quantidade de vezes que determinado recurso/endpoint foi acessado na plataforma.

🔌 APIs Disponíveis
Método	Endpoint	Descrição
POST	/api/register	Criação de usuário (dispara evento de boas-vindas via RabbitMQ/Worker)
GET	/api/search/cep/{cep}	Busca de CEP via BFF com cache em Redis
GET	/api/users	Listagem de usuários
🚀 Como Executar o Projeto Localmente (Passo a Passo)
Copiar o arquivo de exemplo de ambiente:
Duplique/copie o arquivo env.dev.example (ou .env-dev-example, conforme a base do repositório) para a raiz do projeto.

Criar e preencher o arquivo de variáveis locais:
Crie o arquivo .env.dev na raiz do monolito e copie/ajuste o conteúdo correspondente do arquivo de exemplo.

Subir os containers do ambiente de desenvolvimento:
Execute o comando do Docker Compose na raiz do projeto:

Bash
docker compose -f docker-compose-dev.yml up -d --build
URL de Acesso:
A aplicação ficará disponível em:
👉 `