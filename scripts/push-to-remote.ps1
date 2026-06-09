<#
Interactive helper to commit and push the current workspace to the specified remote.

How to use:
- Open PowerShell in the repository root (C:\Users\HCL\Desktop\GitHub Demo).
- Run: `.	emplates\push-to-remote.ps1` or `.	ools\push-to-remote.ps1` depending on path shown here.
- The script will prompt to authenticate with `gh` if needed and perform a `git push`.

Security note: This script prefers using the GitHub CLI (`gh`) for authentication.
If you must use a PAT, follow the prompts carefully and avoid pasting tokens into shared shells.
#>

param(
    [string]$Message = "Prepare project for remote push",
    [string]$Remote = "https://github.com/Md-Moinuddin01/GitHub-Contribution-Simulator.git",
    [string]$Branch = "main"
)

function Test-Command($name) {
    $which = Get-Command $name -ErrorAction SilentlyContinue
    return $which -ne $null
}

Write-Host "Push helper starting..." -ForegroundColor Cyan

if (-not (Test-Command git)) {
    Write-Error "git is not installed or not in PATH. Install Git first: https://git-scm.com/downloads"
    exit 1
}

$useGh = Test-Command gh
if ($useGh) {
    Write-Host "GitHub CLI found. Checking auth status..." -ForegroundColor Green
    try {
        gh auth status -h github.com | Out-Null
    } catch {
        Write-Host "You are not authenticated with GitHub CLI. Running interactive login..." -ForegroundColor Yellow
        gh auth login
    }
} else {
    Write-Host "GitHub CLI not found. The script will attempt to push and you will be prompted for credentials if needed." -ForegroundColor Yellow
}

Write-Host "Staging changes..." -ForegroundColor Cyan
git add .

$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit." -ForegroundColor Yellow
} else {
    Write-Host "Committing changes with message: $Message" -ForegroundColor Cyan
    git commit -m "$Message"
}

Write-Host "Ensuring branch is '$Branch'..." -ForegroundColor Cyan
git branch --show-current 2>$null | Out-Null
try {
    git branch -M $Branch
} catch {
    # ignore
}

Write-Host "Configuring remote 'origin' to $Remote" -ForegroundColor Cyan
try { git remote remove origin } catch {}
git remote add origin $Remote

Write-Host "Pushing to remote..." -ForegroundColor Cyan

try {
    git push -u origin $Branch
    Write-Host "Push succeeded." -ForegroundColor Green
    exit 0
} catch {
    Write-Error "Push failed. See output above. If authentication failed, ensure 'gh auth login' completed or provide credentials when prompted." 
    exit 2
}
