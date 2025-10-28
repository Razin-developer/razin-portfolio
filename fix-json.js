import fs from 'fs'

const configJSPath = './public/config/site-config.js'
const configJSONPath = './public/config/site-config.json'
const configJSContent = fs.readFileSync(configJSPath, 'utf8')

console.log(configJSContent)

fs.writeFileSync(
  configJSONPath,
  JSON.stringify(
    configJSContent.split('export const siteConfig = ')[1],
    null,
    2
  ),
  'utf8'
)
