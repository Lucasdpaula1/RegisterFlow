# RegisterFlow
Monolito — Frontend + Backend

Aplicação monolítica composta por frontend, backend e serviços de infraestrutura, disponibilizados através de um NGINX que atua como ponto único de entrada da aplicação.

🏗️ Arquitetura

A aplicação utiliza uma arquitetura em que o navegador se comunica exclusivamente com o NGINX.

O NGINX é responsável por receber as requisições e encaminhá-las internamente para os serviços correspondentes, ocultando a existência do frontend e do backend para o cliente.

                    ┌─────────────────┐
                    │    Navegador    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │      NGINX      │
                    │  Reverse Proxy  │
                    └───────┬─────────┘
                            │
               ┌────────────┴────────────┐
               │                         │
               ▼                         ▼
       ┌───────────────┐         ┌───────────────┐
       │    Frontend   │         │    Backend    │
       └───────────────┘         └───────┬───────┘
                                         │
                              ┌──────────┴──────────┐
                              │                     │
                              ▼                     ▼
                       ┌─────────────┐       ┌─────────────┐
                       │    Redis    │       │  RabbitMQ   │
                       └─────────────┘       └─────────────┘
                                         
                                         ▼
                                  ┌─────────────┐
                                  │   Banco de  │
                                  │    dados    │
                                  └─────────────┘

Fluxo de requisições

O navegador não acessa diretamente o frontend ou o backend.

Todas as requisições são direcionadas ao NGINX, que decide internamente para qual serviço cada requisição deve ser encaminhada.

Isso permite que a aplicação seja exposta através de um único ponto de entrada.

⚙️ Tecnologias e serviços

A aplicação é composta pelos seguintes serviços:

NGINX — ponto de entrada da aplicação e responsável pelo encaminhamento das requisições.

Frontend — aplicação de interface do usuário.

Backend — API responsável pelas regras e operações da aplicação.

Banco de dados — persistência dos dados da aplicação.

Redis — serviço de armazenamento em memória/cache.

RabbitMQ — serviço de mensageria.

Docker / Docker Compose — gerenciamento dos serviços e ambientes.

🌎 Ambientes

A aplicação possui dois ambientes:

Development (dev)

Production (prod)

Cada ambiente possui seu próprio arquivo de Docker Compose:

docker-compose-dev.yml
docker-compose-prod.yml


O ambiente de desenvolvimento possui configurações específicas para facilitar o desenvolvimento local, incluindo hot reload no frontend e backend.

🚀 Executando o projeto localmente
1. Configuração das variáveis de ambiente

Antes de iniciar a aplicação, é necessário criar o arquivo:

.env-dev


na raiz do monolito.

Utilize o arquivo de exemplo:

.env-dev-example


como base.

Copie o conteúdo de .env-dev-example para .env-dev e preencha/ajuste as variáveis necessárias para o ambiente local.

A estrutura ficará semelhante a:

.
├── .env-dev-example
├── .env-dev
├── docker-compose-dev.yml
├── docker-compose-prod.yml
├── ...


Importante: o arquivo .env-dev é utilizado tanto pelo frontend quanto pelo backend.

Não versionar informações sensíveis no repositório. Caso o .env-dev contenha credenciais ou outros segredos, mantenha-o fora do controle de versão conforme as regras do projeto.

2. Inicializando o ambiente de desenvolvimento

Com o .env-dev configurado na raiz do projeto, execute:

docker compose -f docker-compose-dev.yml up -d --build


Esse comando irá:

construir as imagens necessárias;

criar/inicializar os containers;

iniciar os serviços;

criar os volumes nomeados necessários;

disponibilizar o NGINX;

iniciar o frontend;

iniciar o backend;

iniciar o banco de dados;

iniciar o Redis;

iniciar o RabbitMQ.

🔥 Hot Reload

Os containers de frontend e backend estão configurados com hot reload no ambiente de desenvolvimento.

Isso significa que alterações realizadas localmente através da IDE são refletidas automaticamente dentro dos containers.

Não é necessário reconstruir manualmente os containers a cada alteração no código do frontend ou backend.

O fluxo de desenvolvimento é:

Alteração na IDE
       │
       ▼
Arquivo local
       │
       ▼
Volume montado no container
       │
       ▼
Hot Reload
       │
       ▼
Aplicação atualizada

🔌 API

As rotas do backend são disponibilizadas através do NGINX.

O cliente não precisa conhecer diretamente a localização ou porta do container do backend.

Criar usuário
POST /api/register


Responsável pela criação de um novo usuário.

Endpoint
/api/register

Buscar CEP
GET /api/search/cep/{cep}


Realiza a busca de um CEP utilizando o backend como BFF (Backend for Frontend).

Endpoint
/api/search/cep/{cep}

Exemplo
/api/search/cep/01001000


O backend recebe a solicitação e realiza a comunicação com o serviço externo responsável pela consulta do CEP.

Listar usuários
GET /api/users


Retorna a listagem de usuários cadastrados na aplicação.

Endpoint
/api/users

🌐 Serviço externo
ViaCEP

A aplicação utiliza o ViaCEP como serviço externo para consultas de CEP.

O fluxo de consulta é realizado através do backend:

Navegador
    │
    ▼
  NGINX
    │
    ▼
 Backend
    │
    ▼
 ViaCEP
    │
    ▼
 Backend
    │
    ▼
 NGINX
    │
    ▼
Navegador


O frontend não precisa realizar diretamente a integração com o serviço externo. A comunicação é intermediada pelo backend através do padrão BFF (Backend for Frontend).

🐳 Docker

O projeto utiliza Docker Compose para orquestrar os serviços da aplicação.

Desenvolvimento

Arquivo:

docker-compose-dev.yml


Inicialização:

docker compose -f docker-compose-dev.yml up -d --build


Os serviços de desenvolvimento incluem:

NGINX
Frontend
Backend
Banco de dados
Redis
RabbitMQ


Além dos containers, o Compose também gerencia os volumes nomeados utilizados pela aplicação.

🛑 Parando o ambiente

Para parar os containers do ambiente de desenvolvimento:

docker compose -f docker-compose-dev.yml down


Para acompanhar os logs dos serviços:

docker compose -f docker-compose-dev.yml logs -f


Para consultar o status dos containers:

docker compose -f docker-compose-dev.yml ps

📁 Estrutura conceitual

A estrutura do projeto pode ser representada da seguinte maneira:

monolito/
│
├── .env-dev
├── .env-dev-example
│
├── docker-compose-dev.yml
├── docker-compose-prod.yml
│
├── frontend/
│   └── ...
│
├── backend/
│   └── ...
│
├── nginx/
│   └── ...
│
└── ...


A estrutura exata dos diretórios pode variar conforme a implementação do projeto.

🔄 Fluxo geral da aplicação
                         INTERNET
                            │
                            ▼
                    ┌───────────────┐
                    │     NGINX     │
                    └───────┬───────┘
                            │
               ┌────────────┴────────────┐
               │                         │
               ▼                         ▼
          FRONTEND                    BACKEND
                                         │
                       ┌─────────────────┼─────────────────┐
                       │                 │                 │
                       ▼                 ▼                 ▼
                    DATABASE          REDIS            RABBITMQ
                                         
                                         │
                                         ▼
                                      ViaCEP


O NGINX funciona como a porta de entrada única da aplicação, mantendo a comunicação entre os serviços internos encapsulada.

📝 Resumo rápido
Configuração

Criar o arquivo:

.env-dev


utilizando como base:

.env-dev-example


O arquivo deve ficar na raiz do projeto.

Inicialização
docker compose -f docker-compose-dev.yml up -d --build

Serviços

NGINX

Frontend

Backend

Banco de dados

Redis

RabbitMQ

APIs
Método	Endpoint	Descrição
POST	/api/register	Criação de usuário
GET	/api/search/cep/{cep}	Busca de CEP via BFF
GET	/api/users	Listagem de usuários
Ambientes
Development
    └── docker-compose-dev.yml

Production
    └── docker-compose-prod.yml