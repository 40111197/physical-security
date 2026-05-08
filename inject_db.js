const fs = require('fs');
const path = require('path');

function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Check if already injected
            if (content.includes('db.js')) continue;

            // Find how many directories deep we are to correctly path db.js
            const parts = fullPath.split(path.sep + 'modules' + path.sep);
            let dbPath = 'db.js';
            if (parts.length > 1) {
                const depth = parts[1].split(path.sep).length;
                dbPath = '../'.repeat(depth) + 'db.js';
            }

            // Insert db.js before app.js
            if (content.includes('<script src="app.js"></script>')) {
                content = content.replace('<script src="app.js"></script>', `<script src="${dbPath}"></script>\n    <script src="app.js"></script>`);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            } else if (content.includes('<script src="../../app.js"></script>')) {
                content = content.replace('<script src="../../app.js"></script>', `<script src="../../db.js"></script>\n    <script src="../../app.js"></script>`);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDirectory(process.cwd());
console.log('Finished injecting db.js');
