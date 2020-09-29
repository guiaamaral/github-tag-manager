# GitHub Tag Manager
Aplicação para gestão de tags nos repositórios marcados com estrela.

## Instruções para rodar a aplicação:
Para rodar a aplicação, primeiro você deverá [criar um token de acesso pessoal](https://docs.github.com/pt/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) através da sua conta no GitHub. Salve este token pois iremos utilizar posteriormente.

Clone o repositório, acesse a pasta do projeto e instale as dependências com os comandos abaixo:
```
git clone https://github.com/guiaamaral/github-tag-manager
cd github-tag-manager
npm install
```

Faça uma cópia do arquivo `.env.example`, que está na raiz do repositório, e salve no mesmo local com o nome `.env`. Neste novo arquivo insira o seu nome de usuário, do GitHub, na variável `GIT_USER` e o token gerado anteriormente em `GIT_PWD`.

Agora basta rodar o comando abaixo para iniciar a aplicação:

```
npm start
```