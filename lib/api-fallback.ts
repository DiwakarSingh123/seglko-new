import fs from 'fs/promises';
import path from 'path';

export async function readJsonFallback<T>(fileName: string, fallback: T): Promise<T> {
  try {
    const filePath = path.join(process.cwd(), 'data', fileName);
    const fileContent = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContent) as T;
  } catch (error) {
    console.error(`Failed to read fallback data/${fileName}:`, error);
    return fallback;
  }
}

export function logApiError(route: string, error: unknown) {
  const message = error instanceof Error ? error.message : error;
  console.error(`${route} error:`, message);
}
