import fs from 'fs';
import path from 'path';

const componentsDir = './src/components';
const files = fs.readdirSync(componentsDir);

files.forEach(file => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the import statement
    content = content.replace(
      /import { siteConfig } from '\.\.\/config\/site-config'/g,
      "import { useSiteConfigContext } from '../config/SiteConfigContext'"
    );
    
    // Replace the usage pattern
    content = content.replace(
      /const { ([^}]+) } = siteConfig/g,
      'const { config } = useSiteConfigContext()\n  const { $1 } = config'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
