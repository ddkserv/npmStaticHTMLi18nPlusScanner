var fs = require('fs');
var chalk = require('chalk');

module.exports = {
    input: [
        'html/*.{htm,html}',
        // Use ! to filter out files or directories
        '!app/**/*.{js,jsx}',
        '!app/i18n/**',
        '!**/node_modules/**',
    ],
    output: './',
    options: {
        debug: true,
        attr: {
            list: ['data-i18n'],
            extensions: ['.html', '.htm']
        },
        func: {
            list: ['i18next.t', 'i18n.t'],
            extensions: ['.js', '.jsx']
        },
        lngs: ['en','da'],
        ns: [
            'resource'
        ],
        defaultLng: 'en',
        defaultNs: 'resource',
        defaultValue: '__STRING_NOT_TRANSLATED__',
        resource: {
            loadPath: 'i18n/$$lng$$.json',
            savePath: 'i18n/$$lng$$.json',
            jsonIndent: 2,
            lineEnding: '\n'
        },
        nsSeparator: false, // namespace separator
        keySeparator: false, // key separator
        interpolation: {
            prefix: '$$',
			suffix: '$$',
			escapeValue: false
        }
    },
    transform: function customTransform(file, enc, done) {
        "use strict";
        const parser = this.parser;
        const content = fs.readFileSync(file.path, enc);
        let count = 0;
	
		parser.parseAttrFromString(content, { list: ['data-i18n'] }, (key, options) => {
            parser.set(key, Object.assign({}, options, {
                nsSeparator: false,
                keySeparator: false
            }));
            ++count;
        });

        if (count > 0) {
            console.log(`i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(JSON.stringify(file.relative))}`);
        }

        done();
    }
};