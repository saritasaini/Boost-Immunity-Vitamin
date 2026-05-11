$files = @("pages\index.js", "components\ScrollExperience.js", "components\ScrollExperience_recovered.js")
foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content.Trim().Trim('"')
        Set-Content $file $content
        Write-Host "Fixed $file"
    }
}
