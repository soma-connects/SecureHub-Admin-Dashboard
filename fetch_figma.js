const https = require('https');
const fs = require('fs');

const fileKey = 'kbbVoRoElKFTE666PWW6ej';
const token = 'figd_58HYtw2XwuApbwAtGMvZUeO1gvZRDuMFvAUbwJVY';
const url = `https://api.figma.com/v1/files/${fileKey}`;

const options = {
    headers: {
        'X-Figma-Token': token
    }
};

https.get(url, options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            fs.writeFileSync('figma_data.json', data);
            console.log('Successfully fetched Figma data to figma_data.json');

            // Parse and print summary
            const json = JSON.parse(data);
            console.log(`Project: ${json.name}`);
            console.log(`Pages: ${json.document.children.length}`);
            json.document.children.forEach(page => {
                console.log(`- Page: ${page.name} (ID: ${page.id})`);
            });
        } else {
            console.error(`Failed to fetch: ${res.statusCode} ${res.statusMessage}`);
            console.error(data);
        }
    });

}).on('error', (err) => {
    console.error('Error:', err.message);
});
