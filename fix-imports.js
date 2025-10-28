import fs from 'fs'
import path from 'path'

const componentsDir = './src/components'
const files = fs.readdirSync(componentsDir)

files.forEach((file) => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(componentsDir, file)
    let content = fs.readFileSync(filePath, 'utf8')

    // Fix the import path
    content = content.replace(
      /import { useSiteConfigContext } from '\.\.\/config\/SiteConfigContext'/g,
      "import { useSiteConfigContext } from '../config/SiteConfigContext.jsx'"
    )

    fs.writeFileSync(filePath, content)
    console.log(`Fixed imports in ${file}`)
  }
})

// Also fix App.jsx
const appPath = './src/App.jsx'
let appContent = fs.readFileSync(appPath, 'utf8')
appContent = appContent.replace(
  /import { SiteConfigProvider, useSiteConfigContext } from '\.\/config\/SiteConfigContext'/g,
  "import { SiteConfigProvider, useSiteConfigContext } from './config/SiteConfigContext.jsx'"
)
fs.writeFileSync(appPath, appContent)
console.log('Fixed imports in App.jsx')
