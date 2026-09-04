import { chromium } from 'playwright-core';
const SP = process.argv[2];
const base = 'http://localhost:4322';
const browser = await chromium.launch({ channel: 'msedge' });

const SIZES = [
  { n: '1920x1080', w: 1920, h: 1080 },
  { n: '1536x864',  w: 1536, h: 864  },
  { n: '1366x768',  w: 1366, h: 768  },
  { n: '1280x720',  w: 1280, h: 720  },
  { n: '1024x640',  w: 1024, h: 640  },
  { n: '900x700',   w: 900,  h: 700  },
  { n: '768x1024',  w: 768,  h: 1024 },
  { n: '390x844',   w: 390,  h: 844  },
];

console.log('=== FILTER: must be ONE line at every size ===');
for (const s of SIZES) {
  const p = await browser.newPage({ viewport: { width: s.w, height: s.h } });
  await p.goto(base + '/challenge-cards', { waitUntil: 'networkidle' });
  await p.waitForTimeout(350);
  const r = await p.evaluate(() => {
    const els = [...document.querySelectorAll('[aria-pressed]')];
    const tops = [...new Set(els.map((e) => Math.round(e.getBoundingClientRect().top)))];
    const strip = els[0].parentElement;
    const bar = strip.parentElement;
    const clipped = els.filter((e) => {
      const t = e.querySelector('span');
      return t.scrollWidth > t.clientWidth + 1;
    }).map((e) => e.textContent.trim());
    const d = document.documentElement;
    return {
      rows: tops.length,
      barScroll: strip.scrollWidth - bar.clientWidth,
      widths: els.map((e) => Math.round(e.getBoundingClientRect().width)),
      clipped,
      pageH: d.scrollWidth - d.clientWidth,
    };
  });
  console.log(
    `${s.n.padEnd(10)} rows=${r.rows}` +
    `  barScrolls=${r.barScroll > 1 ? 'yes +' + r.barScroll : 'no'}` +
    `  clippedLabels=${r.clipped.length ? JSON.stringify(r.clipped) : 'none'}` +
    `  pageHScroll=${r.pageH > 1 ? 'YES' : 'none'}` +
    `  pillW=[${r.widths.join(',')}]`
  );
  if (['1920x1080','1366x768','1024x640','390x844'].includes(s.n)) {
    await p.screenshot({ path: `${SP}/f-cards-${s.n}.png` });
  }
  await p.close();
}

console.log('\n=== HOME title + no-scroll ===');
for (const s of SIZES) {
  const p = await browser.newPage({ viewport: { width: s.w, height: s.h } });
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(350);
  const r = await p.evaluate(() => {
    const d = document.documentElement;
    return { h1: document.querySelector('h1').innerText, t: document.title, v: d.scrollHeight - d.clientHeight, hz: d.scrollWidth - d.clientWidth };
  });
  console.log(`${s.n.padEnd(10)} h1="${r.h1}"  vScroll=${r.v > 1 ? 'YES +' + r.v : 'none'}  hScroll=${r.hz > 1 ? 'YES' : 'none'}`);
  if (s.n === '1366x768') { console.log('  document.title:', r.t); await p.screenshot({ path: `${SP}/f-home-1366x768.png` }); }
  if (s.n === '1920x1080') await p.screenshot({ path: `${SP}/f-home-1920x1080.png` });
  await p.close();
}
await browser.close();
