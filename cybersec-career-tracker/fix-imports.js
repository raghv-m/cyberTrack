// Script to fix unused imports
const fs = require('fs');
const path = require('path');

const fixes = [
  // DailyLog.tsx
  {
    file: 'src/pages/DailyLog.tsx',
    find: /const \[showValidation, setShowValidation\] = useState\(false\);/,
    replace: ''
  },
  // DashboardNew.tsx
  {
    file: 'src/pages/DashboardNew.tsx',
    find: /, Shield/,
    replace: ''
  },
  {
    file: 'src/pages/DashboardNew.tsx',
    find: /const \[loading, setLoading\] = useState\(true\);/,
    replace: 'const [, setLoading] = useState(true);'
  },
  {
    file: 'src/pages/DashboardNew.tsx',
    find: /const \[nextAction, setNextAction\] = useState\(/,
    replace: 'const [nextAction] = useState('
  },
  {
    file: 'src/pages/DashboardNew.tsx',
    find: /const \[learningPlan, setLearningPlan\] = useState\(/,
    replace: 'const [learningPlan] = useState('
  },
  // TodoList.tsx
  {
    file: 'src/pages/TodoList.tsx',
    find: /import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase\/firestore';/,
    replace: "import { doc, getDoc, setDoc } from 'firebase/firestore';"
  },
  {
    file: 'src/pages/TodoList.tsx',
    find: /, Calendar/,
    replace: ''
  },
  // SkillsMatrix.tsx - remove unused variable
  {
    file: 'src/pages/SkillsMatrix.tsx',
    find: /const filteredSkills = selectedCategory === 'All'/,
    replace: '// const filteredSkills = selectedCategory === \'All\''
  }
];

fixes.forEach(fix => {
  const filePath = path.join(__dirname, fix.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(fix.find, fix.replace);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${fix.file}`);
  }
});

console.log('All fixes applied!');

