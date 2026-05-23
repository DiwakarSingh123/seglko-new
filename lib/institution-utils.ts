export type InstitutionRecord = {
  id?: number;
  title?: string;
  short?: string;
};

export function resolveInstitutionName(
  value: string,
  institutions: InstitutionRecord[]
): string {
  const query = value.trim().toLowerCase();
  if (!query) return value;

  const match = institutions.find((inst) => {
    const title = inst.title?.trim().toLowerCase() || "";
    const short = inst.short?.trim().toLowerCase() || "";
    return title === query || short === query || title.includes(query) || query.includes(title);
  });

  return match?.title?.trim() || value;
}
