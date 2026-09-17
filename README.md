# RegisterFlow

Monolito — Frontend + Backend + Worker

Aplicação monolítica composta por frontend, backend, worker, e serviços de infraestrutura (banco de dados, Redis, RabbitMQ, Prometheus e Grafana), disponibilizados através de um NGINX que atua como ponto único de entrada da aplicação.

🏗️ Arquitetura

A aplicação utiliza uma arquitetura em que o navegador se comunica exclusivamente com o NGINX.

O NGINX é responsável por receber as requisições e encaminhá-las internamente para os serviços correspondentes, ocultando a existência do frontend e do backend para o cliente.

```
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
    │   Frontend    │         │    Backend    │
    └───────────────┘         └───────┬───────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
             ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
             │    Redis    │   │  RabbitMQ   │   │  Banco de   │
             │   (Cache)   │   │  (Fila)     │   │   dados     │
             └─────────────┘   └──────┬──────┘   └─────────────┘
                                      │
                                      ▼
                               ┌─────────────┐
                               │  Worker PHP │
                               └─────────────┘

```

Fluxo de requisições

O navegador não acessa diretamente o frontend ou o backend.

Todas as requisições são direcionadas ao NGINX, que decide internamente para qual serviço cada requisição deve ser encaminhada.

Isso permite que a aplicação seja exposta através de um único ponto de entrada.

⚙️ Tecnologías e serviços

A aplicação é composta pelos seguintes serviços:

* **NGINX** — Ponto de entrada da aplicação e responsável pelo encaminhamento das requisições (reverse proxy).
* **Frontend** — Aplicação de interface do usuário.
* **Backend** — API responsável pelas regras e operações da aplicação.
* **Worker (PHP)** — Processo em background responsável por consumir mensagens da fila e executar tarefas assíncronas (como envio de e-mails/notificações de boas-vindas).
* **Banco de dados** — Persistência dos dados da aplicação.
* **Redis** — Armazenamento em memória/cache (utilizado para cachear respostas da API de CEP).
* **RabbitMQ** — Serviço de mensageria para desacoplamento de notificações/eventos assíncronos.
* **Prometheus & Grafana** (Ambiente de Produção) — Monitoramento da aplicação, permitindo capturar métricas de performance, saúde e uso dos serviços.
* **Docker / Docker Compose** — Gerenciamento dos serviços e ambientes.

🎯 Motivação de uso dos serviços específicos:

* **Redis**: Utilizado para cachear as respostas da API externa de CEP, viabilizando um retorno mais ágil ao usuário final e otimizando a velocidade de resposta sem sobrecarregar o provedor externo.
* **RabbitMQ**: Utilizado com a intenção de que o serviço da aplicação envie mensagens para uma fila de forma desacoplada, permitindo que um *worker* conectado à fila processe assincronamente o envio de notificações (como um e-mail/mensagem de boas-vindas para o usuário recém-cadastrado).
* **Worker (PHP)**: Processa de forma assíncrona o consumo da fila do RabbitMQ, garantindo que o fluxo principal de cadastro de usuário não seja travado pelo envio de notificações externas.

🌎 Ambientes

A aplicação possui dois ambientes:

* Development (`dev`)
* Production (`prod`)

Cada ambiente possui seu próprio arquivo de Docker Compose:

* `docker-compose-dev.yml`
* `docker-compose-prod.yml`

O ambiente de desenvolvimento possui configurações específicas para facilitar o desenvolvimento local, incluindo *hot reload* no frontend e backend.

🚀 Executando o projeto localmente (Passo a Passo)

1. **Copiar as variáveis de ambiente de exemplo:**
Copie o conteúdo de `.env-dev-example` para criar o arquivo de configuração local.
2. **Criar o arquivo `.env.dev**` (na raiz do monolito):
Preencha/ajuste as variáveis necessárias para o ambiente local. A estrutura de arquivos ficará semelhante a:
```text
.
├── .env.dev.example
├── .env.dev
├── docker-compose-dev.yml
├── docker-compose-prod.yml
├── ...

```


*(Nota: O arquivo `.env.dev` é utilizado tanto pelo frontend quanto pelo backend. Não versionar informações sensíveis).*
3. **Construir e subir os containers do ambiente de desenvolvimento:**
Execute o comando abaixo na raiz do projeto:
```bash
docker compose -f docker-compose-dev.yml up -d --build

```


Esse comando irá:
* Construir as imagens necessárias;
* Criar/inicializar os containers;
* Iniciar os serviços (NGINX, Frontend, Backend, Worker, Banco de dados, Redis, RabbitMQ);
* Criar os volumes nomeados necessários.


4. **URL de acesso à aplicação:**
Após a inicialização, a aplicação ficará disponível em:
👉 **`http://localhost:80`** (ou simplesmente `http://localhost`)

🔥 Hot Reload

Os containers de frontend e backend estão configurados com *hot reload* no ambiente de desenvolvimento. Alterações realizadas localmente via IDE refletem automaticamente nos containers sem necessidade de rebuild manual.

🔌 API

As rotas do backend são disponibilizadas através do NGINX.

* **Criar usuário**: `POST /api/register`
* **Buscar CEP**: `GET /api/search/cep/{cep}` *(Exemplo: `/api/search/cep/01001000`)*
* **Listar usuários**: `GET /api/users`

🌐 Serviço externo

* **ViaCEP**: Utilizado para consultas de CEP intermediadas pelo backend no padrão BFF.

🐳 Docker / Comandos Úteis

* **Parar o ambiente de desenvolvimento**:
```bash
docker compose -f docker-compose-dev.yml down

```


* **Acompanhar os logs**:
```bash
docker compose -f docker-compose-dev.yml logs -f

```


* **Consultar o status dos containers**:
```bash
docker compose -f docker-compose-dev.yml ps

```



🔄 Fluxo geral da aplicação

```text
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
          FRONTEND                  BACKEND
                                         │
                   ┌─────────────────────┼─────────────────────┐
                   │                     │                     │
                   ▼                     ▼                     ▼
               DATABASE                REDIS               RABBITMQ
               (Persistência)         (Cache CEP)            │
                                                             ▼
                                                        WORKER (PHP)
                                                             │
                                                             ▼
                                                          ViaCEP /
                                                       Notificações

```

O NGINX funciona como a porta de entrada única da aplicação (`localhost:80`), mantendo a comunicação entre os serviços internos encapsulada.