# Projeto DELTA
 - Projeto com o objetivo de contratação, API com CRUD de aluno para ser consumida pelo frontend em react.

 ## Executando projeto

 - As configurações do banco de dados e demais configurações se encontra no arquivo **[.env.example](./.env.example)**, fazer uma copia deste arquivo com o nome **`.env`** e colocando as valores da variaveis de acordo com o banco de dados.

   - Obs.: caso ultilize o docker para criação do banco de dado, o arquivo **[docker-compose.yml](./docker-compose.yml)** foi criado para esse intuito, apenas rodar o comando **`docker-compose up -d --build`**

- Após as configurações feitas, rode o seguintes comandos em sequencia,
**`npm -i`** ou **`yarn`** para instalar as dependencias e **`npm run dev`** ou **`yarn dev`** para executar o script que se encontra em **[package.json](./package.json)** com o nome dev.

