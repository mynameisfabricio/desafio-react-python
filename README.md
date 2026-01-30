# Desafio Técnico - Gerenciador de Atividades (React + Python)

Olá! Este é o projeto que desenvolvi para o desafio técnico. A aplicação é um gerenciador de tarefas onde é possível criar, editar, excluir e mover atividades entre status (Pendente, Em Andamento e Concluído).

Segui os requisitos do PDF, utilizando **React** com Vite no frontend e **FastAPI** no backend, com a persistência dos dados feita em um arquivo JSON local.

## Tecnologias que utilizei

- **Frontend:** React, Tailwind CSS (para estilização), Lucide React (ícones).
- **Backend:** Python, FastAPI, Uvicorn.
- **Banco de Dados:** Arquivo `activities.json` (persistência em arquivo).

---

## Como rodar o projeto na sua máquina

Para facilitar, separei o passo a passo para o Backend e para o Frontend. Você vai precisar de dois terminais abertos.

### Passo 1: Rodando o Backend (Python)

Primeiro, vamos colocar a API para rodar.

1. Acesse a pasta do backend:
   cd backend

2. Crie e ative o ambiente virtual (para isolar as dependências):
   
   # Se estiver no Windows:
   python -m venv venv
   .\venv\Scripts\activate

   # Se estiver no Linux ou Mac:
   python3 -m venv venv
   source venv/bin/activate

3. Instale as bibliotecas necessárias:
   pip install -r requirements.txt

4. Suba o servidor:
   python -m uvicorn main:app --reload

> Obs: A API vai ficar rodando no endereço http://localhost:8000. Deixe esse terminal aberto.

---

### Passo 2: Rodando o Frontend (React)

Agora, em um novo terminal, vamos subir a interface.

1. Acesse a pasta do frontend:
   cd frontend

2. Instale as dependências do Node:
   npm install

3. Rode o projeto:
   npm run dev

> O projeto vai abrir no seu navegador, geralmente em http://localhost:5173.

---

## Sobre o Desenvolvimento

- **Estrutura:** Separei bem as responsabilidades. O `ActivityForm` cuida do cadastro, o `ActivityList` organiza o Kanban e o `ActivityCard` é o componente visual de cada tarefa.
- **Persistência:** Conforme pedido, os dados são salvos automaticamente no arquivo `activities.json` dentro da pasta backend.
- **Design:** Usei Tailwind para criar uma interface limpa e responsiva.

Qualquer dúvida estou à disposição!
