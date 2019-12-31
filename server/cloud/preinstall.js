// const fs = require('fs'); fs.writeFile('./google-credentials-heroku.json', process.env.GOOGLE_CONFIG, (err) => { });

const fs = require('fs'); fs.writeFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, process.env.GOOGLE_CONFIG, (err) => { });