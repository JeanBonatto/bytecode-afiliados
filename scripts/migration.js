const { execSync } = require('child_process');

// Gerar timestamp no formato YYYYMMDDHHMMSS
function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// Pegar nome da migration dos argumentos
const migrationName = process.argv[2];

if (!migrationName) {
  console.error('❌ Erro: Nome da migration não fornecido');
  console.log('Uso: npm run migration:gen NomeDaMigration');
  process.exit(1);
}

const timestamp = getTimestamp();

// Executar comando do TypeORM
const command = `npm run typeorm -- migration:generate -d src/config/database.ts -t ${timestamp} src/migrations/${migrationName}`;

console.log(`🔄 Gerando migration: ${timestamp}-${migrationName}.ts`);

try {
  execSync(command, { stdio: 'inherit' });
  console.log(`✅ Migration criada com sucesso!`);
} catch (error) {
  console.error('❌ Erro ao gerar migration');
  process.exit(1);
}