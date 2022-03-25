const { author, dependencies, repository, version } = require('../package.json')

module.exports = {
  name: 'Spy-Lard',
  namespace: 'https://kejith.de/',
  version: version,
  author: author,
  source: repository.url,
  // 'license': 'MIT',
  match: [
    'https://*.pr0game.com/*'
  ],
  require: [
    `https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`,
  ],
  grant: ['GM.xmlHttpRequest'],
  // connect: [
  //   'httpbin.org'
  // ],
  'run-at': 'document-end'
}
