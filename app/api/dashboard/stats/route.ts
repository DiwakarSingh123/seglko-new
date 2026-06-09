import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { StudentApplication, Institution } from "@/lib/models";
import { readJsonFallback } from "@/lib/api-fallback";
import { computeDashboardStats } from "@/lib/dashboard-stats";

export async function GET() {
  try {
    await connectDB();

    const dbApps = await StudentApplication.find({}).lean();
    const dbInsts = await Institution.find({}).lean();

    const appsTyped = dbApps.map((app: any) => ({
      date: app.createdAt ? new Date(app.createdAt).toISOString() : undefined,
      status: app.status || "Pending",
      fee: app.paymentAmount?.toString() || "0",
      university: app.desiredInstitution || ""
    }));

    const institutionsTyped = dbInsts.map((inst: any) => ({
      title: inst.title || "",
      short: inst.short || "",
      students: Number(inst.students) || 0,
      programs: Number(inst.programs) || 0,
      status: inst.status || "Active"
    }));

    const stats = computeDashboardStats(appsTyped, institutionsTyped);

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    const [applications, institutions] = await Promise.all([
      readJsonFallback("applications.json", []),
      readJsonFallback("institutions.json", []),
    ]);
    const stats = computeDashboardStats(applications, institutions);
    return NextResponse.json(stats);
  }
}
