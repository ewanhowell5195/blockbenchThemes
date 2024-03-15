import { minify } from "csso"
import path from "node:path"
import fs from "node:fs"

for (const folder of fs.readdirSync("../")) {
  const theme = path.join("..", folder, "theme.bbtheme")
  if (fs.existsSync(theme)) {
    const css = path.join("..", folder, folder + ".css")
    const output = path.join("..", folder, folder + ".bbtheme")
    if (fs.existsSync(css)) {
      const themeData = JSON.parse(fs.readFileSync(theme))
      const cssData = fs.readFileSync(css, "utf-8")
      themeData.css = minify(cssData).css
      fs.writeFileSync(output, JSON.stringify(themeData, null, 2))
    } else {
      fs.copyFileSync(theme, output)
    }
  }
}