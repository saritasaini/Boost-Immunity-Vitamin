@echo off
powershell -Command "(Get-Content pages\index.js -Raw).Trim('\"') | Set-Content pages\index.js"
powershell -Command "(Get-Content components\ScrollExperience.js -Raw).Trim('\"') | Set-Content components\ScrollExperience.js"
powershell -Command "(Get-Content components\ScrollExperience_recovered.js -Raw).Trim('\"') | Set-Content components\ScrollExperience_recovered.js"
