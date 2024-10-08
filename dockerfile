# Usar uma imagem base do Node.js
FROM node:14

# Definir o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todos os arquivos do projeto para o contêiner
COPY . .

# Comando para executar o script
CMD ["node", "updateDeals.js"]
