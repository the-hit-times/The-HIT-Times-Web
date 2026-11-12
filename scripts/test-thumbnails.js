const fs = require('fs');

async function testThumbnails() {
  const content = fs.readFileSync('src/data/tabloidsData.ts', 'utf8');
  const lines = content.split('\n');
  const driveIds = [];
  let currentIssue = '';
  for (const line of lines) {
    if (line.includes('title: "')) {
      currentIssue = line.split('"')[1];
    }
    if (line.includes('driveId: "')) {
      const id = line.split('"')[1];
      driveIds.push({ title: currentIssue, driveId: id });
    }
  }

  //console.log('Total issues found:', driveIds.length);

  for (const item of driveIds) {
    const thumbUrl = `https://drive.google.com/thumbnail?id=${item.driveId}&sz=w600`;
    try {
      const res = await fetch(thumbUrl);
      //console.log(`${item.title} (${item.driveId}): Status ${res.status}, Type: ${res.headers.get('content-type')}`);
    } catch (err) {
      console.error(`${item.title}: Error ${err.message}`);
    }
  }
}

testThumbnails();
