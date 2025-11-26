<h1 align="center">
  <img alt="GoBarber" src="https://res.cloudinary.com/practicaldev/image/fetch/s--9pI8FjT---/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r90x1f74p5b87199t5yq.png" width="100%">
</h1>

<h3 align="center">
  GoBarber - Agendamento de serviços para barbearias
</h3>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como Executar</a>
</p>

## 💻 Sobre o projeto

O **GoBarber** é uma aplicação completa (Web, Mobile e API) para gestão de agendamentos em barbearias. O sistema permite que prestadores de serviço (barbeiros) gerenciem seus horários e que clientes marquem atendimentos via aplicativo móvel.

Este projeto foi desenvolvido aplicando conceitos avançados de engenharia de software como **TDD (Test Driven Development)**, **DDD (Domain Driven Design)** e arquitetura **SOLID**.

## 🚀 Tecnologias

O projeto foi desenvolvido com a seguinte stack:

- **Backend:** Node.js, Express, TypeScript
- **Frontend:** ReactJS
- **Mobile:** React Native (Expo)
- **Banco de Dados:** PostgreSQL (TypeORM) e MongoDB
- **Cache & Filas:** Redis (BeeQueue)
- **Testes:** Jest

## ✨ Funcionalidades

- **Prestadores (Web):**
  - Cadastro e autenticação (JWT).
  - Gestão de perfil e avatar.
  - Visualização de agenda e horários disponíveis.
  - Notificações de novos agendamentos.

- **Clientes (Mobile):**
  - Listagem de prestadores.
  - Agendamento de horário.
  - Cancelamento de horário.

## 📦 Como executar

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com/).

```bash
# Clone este repositório
$ git clone [https://github.com/alexandreramosdev/gobarber.git](https://github.com/alexandreramosdev/gobarber.git)

# Acesse a pasta do projeto no terminal/cmd
$ cd gobarber

# --- BACKEND ---
$ cd backend
$ npm install
# Crie os containers do banco
$docker run --name gobarber_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres$ docker run --name gobarber_mongo -p 27017:27017 -d -t mongo
$ docker run --name gobarber_redis -p 6379:6379 -d -t redis:alpine
# Execute as migrations
$ npm run typeorm migration:run
# Inicie o servidor
$ npm run dev:server

# --- FRONTEND ---
$cd ../frontend$ npm install
$ npm start

# --- MOBILE ---
$cd ../mobile$ npm install
$ npm run android # ou ios

---
Feito com 💜 por Alexandre Ramos
