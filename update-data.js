const fs = require('fs');
const path = require('path');

// 1. Сканируем папки конкурсов
const competitions = fs.readdirSync('.', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => {
    const folderName = dirent.name;
    const displayName = folderName.replace(/\$/g, ' ');
    
    // 2. Читаем description.txt (если есть)
    let description = "No description";
    try {
      description = fs.readFileSync(path.join(folderName, 'description.txt'), 'utf8');
    } catch {}
    
    return {
      name: displayName,
      logo: `${folderName}.png`, // лого в корне
      description,
      resultsUrl: `${folderName}/`
    };
  });

// 3. Сохраняем в JSON
fs.writeFileSync('data.json', JSON.stringify(competitions, null, 2));
console.log('✅ Updated data.json');
