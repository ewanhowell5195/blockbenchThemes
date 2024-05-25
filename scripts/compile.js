import { transform, Features } from "lightningcss"
import path from "node:path"
import fs from "node:fs"

for (const folder of fs.readdirSync("../")) {
  const theme = path.join("..", folder, "theme.bbtheme")
  if (fs.existsSync(theme)) {
    const css = path.join("..", folder, folder + ".css")
    const thumbnail = path.join("..", folder, "thumbnail.css")
    const output = path.join("..", folder, folder + ".bbtheme")
    if (!fs.existsSync(css) && !fs.existsSync(thumbnail)) {
      fs.copyFileSync(theme, output)
    } else {
      const themeData = JSON.parse(fs.readFileSync(theme))
      if (fs.existsSync(css)) {
        const cssData = fs.readFileSync(css, "utf-8")
        themeData.css = `/*\n\n${themeData.name}\nBy ${themeData.author} - https://ewanhowell.com/\n\n*/\n` + transform({
          code: Buffer.from(cssData),
          minify: true
        }).code.toString()
      }
      if (fs.existsSync(thumbnail)) {
        const thumbnailData = fs.readFileSync(thumbnail, "utf-8")
        themeData.thumbnail = transform({
          code: Buffer.from(thumbnailData),
          minify: true,
          include: Features.Nesting
        }).code.toString()
      }
      fs.writeFileSync(output, JSON.stringify(themeData, null, 2))
    }
  }
}