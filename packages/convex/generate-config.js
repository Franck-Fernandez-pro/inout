const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

// Générer le contenu du fichier auth.config.ts
const authConfigContent = `'use node';

// This file is auto-generated from .env.local via generate-config.js
// DO NOT EDIT MANUALLY - your changes will be overwritten

export default {
  providers: [
    {
      domain: "${process.env.CONVEX_URL || 'https://tidy-puma-951.convex.cloud'}",
      applicationID: 'convex',
    },
  ],
};
`;


const outputPath = path.join(__dirname, 'src', 'auth.config.ts');
fs.writeFileSync(outputPath, authConfigContent, 'utf8');

console.log(
  'Generated auth.config.ts with CONVEX_URL:',
  process.env.CONVEX_URL || 'default value'
);
