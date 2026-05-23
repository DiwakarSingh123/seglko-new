export function parsePackageLpa(pkg) {
  const match = String(pkg || '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

export function computePlacementStats(records) {
  const packages = records.map((r) => parsePackageLpa(r.pkg)).filter((n) => n > 0);
  const avgLpa = packages.length ? packages.reduce((a, b) => a + b, 0) / packages.length : 0;
  const highestLpa = packages.length ? Math.max(...packages) : 0;
  const recruiters = new Set(
    records.map((r) => r.company.trim().toLowerCase()).filter(Boolean)
  ).size;

  return {
    totalPlaced: records.length,
    avgPackage: avgLpa > 0 ? `₹${avgLpa.toFixed(1)} LPA` : '—',
    highestPackage: highestLpa > 0 ? `₹${highestLpa.toFixed(1)} LPA` : '—',
    recruitersCount: recruiters,
    recruiters: recruiters > 0 ? `${recruiters}+` : '0',
  };
}

export function formatPlacedCount(count) {
  if (count >= 1000) return `${Math.floor(count / 100) * 100}+`;
  return count > 0 ? `${count}+` : '0';
}

export function getRecentPlacements(records, limit = 3) {
  return [...records]
    .sort((a, b) => {
      const yearDiff = Number(b.year) - Number(a.year);
      if (yearDiff !== 0) return yearDiff;
      return b.id - a.id;
    })
    .slice(0, limit);
}

export function mapToShowcaseCard(record, imageFallback) {
  const lpa = parsePackageLpa(record.pkg);
  let packageLabel = record.pkg || '';
  if (!packageLabel.toLowerCase().includes('lpa') && lpa > 0) {
    packageLabel = `${lpa.toFixed(2)} LPA`;
  } else {
    packageLabel = packageLabel.replace(/^₹\s*/, '').trim();
  }

  const words = record.company.trim().split(/\s+/);
  const logo =
    words.length > 1
      ? words.map((w) => w[0]).join('').slice(0, 6).toUpperCase()
      : record.company.slice(0, 6).toUpperCase();

  return {
    name: record.student,
    course: record.program,
    packageLabel,
    company: record.company,
    role: record.role,
    image: record.customImage?.trim() ? record.customImage : imageFallback,
    logo,
  };
}
