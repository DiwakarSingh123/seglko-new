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

    const stats = computeDashboardStats(
      Array.isArray(applications) ? applications : [],
      Array.isArray(institutions) ? institutions : []
    );

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Failed to load dashboard stats" }, { status: 500 });
  }
}
