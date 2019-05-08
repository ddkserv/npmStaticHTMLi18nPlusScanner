const staticI18n = require('static-i18n');
const fs = require('fs');

const fileContents = fs.readFileSync('./i18nstatic-i18n-config.json', 'utf8');
const data = JSON.parse(fileContents);

var options = {
    allowHtml: true,
    outputDefault: "__lng__.__file__",
    outputOther: "__lng__.__file__",
    outputDir: "output",
    locale: "en",
    locales: ['en','da'],
    localesPath: "i18n",
    i18n: data
}
var dir = "html";

staticI18n.processDir(dir, options).catch((err) => {
  console.log("An error has occured:");
  console.log(err.toString());
  process.exit(1);
});