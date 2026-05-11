$historyPath = "C:\Users\DELL\AppData\Roaming\Code\User\History"
if (Test-Path $historyPath) {
    Get-ChildItem -Path $historyPath -Recurse -File | 
        Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-2) -and $_.Length -gt 5000 } | 
        Sort-Object -Property LastWriteTime -Descending | 
        Select-Object -Property FullName, Length, LastWriteTime -First 20 | 
        Format-Table -AutoSize
} else {
    Write-Host "History path not found"
}
