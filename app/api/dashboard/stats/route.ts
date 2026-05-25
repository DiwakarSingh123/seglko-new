import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { computeDashboardStats } from "@/lib/dashboard-stats";

const dataDir = path.join(process.cwd(), "data");

function readJson<T>(filename: string, fallback: T): T {
  const filePath = path.join(dataDir, filename);
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function GET() {
  try {
    const applications = readJson<unknown[]>("applications.json", []);
    const institutions = readJson<unknown[]>("institutions.json", []);

    // computeDashboardStats expects typed Application[] / Institution[].
    // JSON parsing gives unknown[], so we filter out non-object entries.
    // Keep these as `unknown[]` filtered to objects, then cast to the expected shapes.
    // This avoids passing `unknown[]` directly into the typed compute function.
    const typedApplications = (Array.isArray(applications)
      ? applications.filter((x): x is Record<string, unknown> => typeof x === "object" && x !== null)
      : []) as unknown[];

    const typedInstitutions = (Array.isArray(institutions)
      ? institutions.filter((x): x is Record<string, unknown> => typeof x === "object" && x !== null)
      : []) as unknown[];

    const appsTyped = typedApplications as any; // Application[]
    const institutionsTyped = typedInstitutions as any; // Institution[]

    const stats = computeDashboardStats(appsTyped, institutionsTyped);

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Failed to load dashboard stats" }, { status: 500 });
  }
}
