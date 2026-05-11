const fs = require('fs');
try {
    const data = JSON.parse(fs.readFileSync('recovered.json', 'utf8'));
    let code = data.tool_calls[0].args.CodeContent;
    
    // If the code is stringified with quotes and escapes
    if (code.startsWith('"')) {
        try {
            code = JSON.parse(code);
        } catch(e) {
            // Manual fallback if it's not a full JSON string
            code = code.replace(/^"/, '').replace(/"$/, '').replace(/\\n/g, '\n').replace(/\\"/g, '"');
        }
    }
    
    fs.writeFileSync('components/ScrollExperience.js', code);
    console.log('Successfully extracted and unescaped ScrollExperience.js');
} catch (e) {
    console.error('Error:', e.message);
}
