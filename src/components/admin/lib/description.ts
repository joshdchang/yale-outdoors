import type { ZodObject } from "astro/zod";

export function parseSchemaDescription(schema?: ZodObject<any>) {
  try {
    return JSON.parse(schema?.description || '{}');
  } catch (error) {
    return null;
  }
}
