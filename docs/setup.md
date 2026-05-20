# 1. Instalar dependências (se ainda não fez)
npm install

# 2. Subir PostgreSQL
npm run docker:up

# 3. Aguardar 10 segundos

# 4. Rodar migrations
npm run migration:run

# 5. Verificar tabelas criadas
npm run migration:show

# Saída:
# [X] InitialSchema1779210897627