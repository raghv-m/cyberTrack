# PowerShell script to fix all TypeScript errors

Write-Host "Fixing all TypeScript errors..." -ForegroundColor Cyan

# Fix LegalAcceptanceModal.tsx
(Get-Content "src/components/LegalAcceptanceModal.tsx") -replace ", X", "" | Set-Content "src/components/LegalAcceptanceModal.tsx"

# Fix CookiePolicy.tsx
(Get-Content "src/pages/CookiePolicy.tsx") -replace "import { Shield, Cookie", "import { Cookie" | Set-Content "src/pages/CookiePolicy.tsx"

# Fix DailyLog.tsx
(Get-Content "src/pages/DailyLog.tsx") -replace "const \[showValidation, setShowValidation\] = useState\(false\);", "const [, setShowValidation] = useState(false);" | Set-Content "src/pages/DailyLog.tsx"

# Fix DashboardNew.tsx
(Get-Content "src/pages/DashboardNew.tsx") -replace ", Shield", "" | Set-Content "src/pages/DashboardNew.tsx"
(Get-Content "src/pages/DashboardNew.tsx") -replace "const \[loading, setLoading\]", "const [, setLoading]" | Set-Content "src/pages/DashboardNew.tsx"
(Get-Content "src/pages/DashboardNew.tsx") -replace "const \[nextAction, setNextAction\]", "const [nextAction]" | Set-Content "src/pages/DashboardNew.tsx"
(Get-Content "src/pages/DashboardNew.tsx") -replace "const \[learningPlan, setLearningPlan\]", "const [learningPlan]" | Set-Content "src/pages/DashboardNew.tsx"

# Fix EmailPreferences.tsx
(Get-Content "src/pages/EmailPreferences.tsx") -replace ", Calendar", "" | Set-Content "src/pages/EmailPreferences.tsx"

# Fix governance files
(Get-Content "src/pages/governance/CloudSecurity.tsx") -replace "import { Cloud, Shield, Lock, Network }", "import { Cloud }" | Set-Content "src/pages/governance/CloudSecurity.tsx"
(Get-Content "src/pages/governance/DataProtection.tsx") -replace "import { Database, Lock, Trash2, Shield }", "import { Database }" | Set-Content "src/pages/governance/DataProtection.tsx"
(Get-Content "src/pages/governance/DetectionMonitoring.tsx") -replace "import { Activity, Database, Shield, AlertTriangle }", "import { Activity }" | Set-Content "src/pages/governance/DetectionMonitoring.tsx"
(Get-Content "src/pages/governance/IncidentResponse.tsx") -replace "import { AlertTriangle, Users, FileText, TrendingUp }", "import { AlertTriangle }" | Set-Content "src/pages/governance/IncidentResponse.tsx"
(Get-Content "src/pages/governance/SecurityGovernance.tsx") -replace ", AlertTriangle, CheckCircle", "" | Set-Content "src/pages/governance/SecurityGovernance.tsx"
(Get-Content "src/pages/governance/SOCOperations.tsx") -replace ", TrendingUp, Clock", "" | Set-Content "src/pages/governance/SOCOperations.tsx"

# Fix IncidentReportForm.tsx
(Get-Content "src/pages/IncidentReportForm.tsx") -replace ", Upload, Calendar, AlertTriangle", "" | Set-Content "src/pages/IncidentReportForm.tsx"
$content = Get-Content "src/pages/IncidentReportForm.tsx" -Raw
$content = $content -replace "const docRef = await addDoc", "await addDoc"
$content = $content -replace "const getSeverityColor[\s\S]*?};", ""
$content | Set-Content "src/pages/IncidentReportForm.tsx"

# Fix LandingPage.tsx
(Get-Content "src/pages/LandingPage.tsx") -replace ", CheckCircle", "" | Set-Content "src/pages/LandingPage.tsx"
(Get-Content "src/pages/LandingPage.tsx") -replace ", BookOpen", "" | Set-Content "src/pages/LandingPage.tsx"
(Get-Content "src/pages/LandingPage.tsx") -replace ", BarChart3", "" | Set-Content "src/pages/LandingPage.tsx"
(Get-Content "src/pages/LandingPage.tsx") -replace ", Clock", "" | Set-Content "src/pages/LandingPage.tsx"

# Fix PrivacyPolicy.tsx
(Get-Content "src/pages/PrivacyPolicy.tsx") -replace "import { Shield, Lock }", "import { Lock }" | Set-Content "src/pages/PrivacyPolicy.tsx"

# Fix Settings.tsx
(Get-Content "src/pages/Settings.tsx") -replace ", Mail", "" | Set-Content "src/pages/Settings.tsx"

# Fix TermsOfService.tsx
(Get-Content "src/pages/TermsOfService.tsx") -replace "import { Shield, FileText }", "import { FileText }" | Set-Content "src/pages/TermsOfService.tsx"

# Fix TodoList.tsx
(Get-Content "src/pages/TodoList.tsx") -replace ", collection, query, where, getDocs", "" | Set-Content "src/pages/TodoList.tsx"
(Get-Content "src/pages/TodoList.tsx") -replace ", Calendar", "" | Set-Content "src/pages/TodoList.tsx"

# Fix SkillsMatrix.tsx - comment out unused variable
$content = Get-Content "src/pages/SkillsMatrix.tsx" -Raw
$content = $content -replace "const filteredSkills = selectedCategory", "// const filteredSkills = selectedCategory"
$content | Set-Content "src/pages/SkillsMatrix.tsx"

Write-Host "All simple fixes applied!" -ForegroundColor Green
Write-Host "Installing @types/nodemailer..." -ForegroundColor Cyan
npm install --save-dev @types/nodemailer

Write-Host "Done!" -ForegroundColor Green

