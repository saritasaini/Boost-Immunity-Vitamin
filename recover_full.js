const fs = require('fs');
const logPath = 'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\695ee113-2ec6-448d-8c4b-2f905695dc97\\.system_generated\\logs\\overview.txt';

if (!fs.existsSync(logPath)) {
    console.log('Log file not found');
    process.exit(1);
}

const content = fs.readFileSync(logPath, 'utf8');
const lines = content.split('\n');

// Search for the longest ScrollExperience.js content
let longestScroll = '';
let longestFooter = '';

for (const line of lines) {
    if (!line.trim()) continue;
    try {
        const entry = JSON.parse(line);
        if (entry.tool_calls) {
            for (const call of entry.tool_calls) {
                if (call.args.TargetFile && call.args.TargetFile.includes('ScrollExperience.js')) {
                    const code = call.args.CodeContent || call.args.ReplacementContent;
                    if (code && code.length > longestScroll.length && !code.includes('<truncated')) {
                        longestScroll = code;
                    }
                }
                if (call.args.TargetFile && call.args.TargetFile.includes('Footer.js')) {
                    const code = call.args.CodeContent || call.args.ReplacementContent;
                    if (code && code.length > longestFooter.length && !code.includes('<truncated')) {
                        longestFooter = code;
                    }
                }
            }
        }
    } catch (e) {
        // Not a single JSON line, maybe it's a diff or other
    }
}

if (longestScroll) {
    fs.writeFileSync('components/ScrollExperience_recovered_full.js', longestScroll.replace(/^"/, '').replace(/"$/, '').replace(/\\n/g, '\n').replace(/\\"/g, '"'));
    console.log('Recovered ScrollExperience.js, length:', longestScroll.length);
} else {
    console.log('Could not find full ScrollExperience.js in logs');
}

if (longestFooter) {
    fs.writeFileSync('components/Footer_recovered_full.js', longestFooter.replace(/^"/, '').replace(/"$/, '').replace(/\\n/g, '\n').replace(/\\"/g, '"'));
    console.log('Recovered Footer.js, length:', longestFooter.length);
}
