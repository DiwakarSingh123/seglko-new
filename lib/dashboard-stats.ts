type Application = {
  date?: string;
  status?: string;
  fee?: string;
  university?: string;
};

type Institution = {
  title?: string;
  short?: string;
  students?: number;
  programs?: number;
  status?: string;
};

export function parseCurrency(value: string | undefined): number {
  if (!value) return 0;
  const cleaned = String(value).replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? num : 0;
}

export function formatCount(value: number): string {
  return value.toLocaleString("en-IN");
}

export function formatRevenue(value: number): string {
  if (value >= 10_000_000) return `₹${(value / 10_000_000).toFixed(1)}Cr`;
  if (value >= 100_000) return `₹${(value / 100_000).toFixed(1)}L`;
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(1)}K`;
  return `₹${formatCount(value)}`;
}

export function formatPercentChange(current: number, previous: number): { change: string; up: boolean } {
  if (previous === 0) {
    if (current === 0) return { change: "0%", up: true };
    return { change: "+100%", up: true };
  }
  const pct = ((current - previous) / previous) * 100;
  const up = pct >= 0;
  const sign = up ? "+" : "";
  return { change: `${sign}${pct.toFixed(1)}%`, up };
}

function parseAppDate(dateStr: string | undefined): Date | null {
  if (!dateStr) return null;
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function isPreviousMonth(date: Date, ref: Date): boolean {
  const prev = new Date(ref.getFullYear(), ref.getMonth() - 1, 1);
  return date.getFullYear() === prev.getFullYear() && date.getMonth() === prev.getMonth();
}

export function computeDashboardStats(
  applications: Application[],
  institutions: Institution[]
) {
  const now = new Date();

  const appsThisMonth = applications.filter((a) => {
    const d = parseAppDate(a.date);
    return d && isSameMonth(d, now);
  });

  const appsLastMonth = applications.filter((a) => {
    const d = parseAppDate(a.date);
    return d && isPreviousMonth(d, now);
  });

  const revenueThisMonth = appsThisMonth.reduce((sum, a) => sum + parseCurrency(a.fee), 0);
  const revenueLastMonth = appsLastMonth.reduce((sum, a) => sum + parseCurrency(a.fee), 0);
  const totalRevenue = applications.reduce((sum, a) => sum + parseCurrency(a.fee), 0);

  const activeStudents = institutions
    .filter((i) => (i.status || "Active") === "Active")
    .reduce((sum, i) => sum + Number(i.students || 0), 0);

  const totalStudents = institutions.reduce((sum, i) => sum + Number(i.students || 0), 0);
  const activeInstitutions = institutions.filter((i) => (i.status || "Active") === "Active").length;

  const rankedInstitutions = institutions
    .filter((inst) => inst.title?.trim())
    .map((inst) => ({
      name: inst.title!.trim(),
      short: inst.short?.trim() || "",
      students: Number(inst.students || 0),
      programs: Number(inst.programs || 0),
      status: inst.status || "Active",
    }))
    .sort((a, b) => b.students - a.students);

  const maxStudents = Math.max(1, ...rankedInstitutions.map((i) => i.students));
  const topInstitutions = rankedInstitutions.slice(0, 5).map((inst) => ({
    name: inst.name,
    short: inst.short,
    students: inst.students,
    programs: inst.programs,
    pct: Math.round((inst.students / maxStudents) * 100),
  }));

  const weekBuckets = [0, 0, 0, 0];
  for (const app of appsThisMonth) {
    const d = parseAppDate(app.date);
    if (!d) continue;
    const weekIndex = Math.min(3, Math.floor((d.getDate() - 1) / 7));
    weekBuckets[weekIndex] += 1;
  }
  const maxWeek = Math.max(1, ...weekBuckets);
  const weeklyActivity = weekBuckets.map((count) => Math.round((count / maxWeek) * 100));

  const studentsShare =
    totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0;

  return {
    totalApplications: applications.length,
    applicationsChange: formatPercentChange(appsThisMonth.length, appsLastMonth.length),
    activeStudents,
    studentsChange: {
      change: `${studentsShare}% active`,
      up: studentsShare >= 50,
    },
    universities: institutions.length,
    universitiesChange: {
      change: institutions.length
        ? `${Math.round((activeInstitutions / institutions.length) * 100)}% active`
        : "0% active",
      up: activeInstitutions >= institutions.length / 2,
    },
    totalRevenue,
    revenueFormatted: formatRevenue(totalRevenue),
    revenueChange: formatPercentChange(revenueThisMonth, revenueLastMonth),
    topInstitutions,
    weeklyActivity,
    activityTotal: formatCount(applications.length),
    activityChange: formatPercentChange(appsThisMonth.length, appsLastMonth.length),
  };
}
