export async function runConcurrently<T>(
  tasks: Array<() => Promise<T>>,
  limit: number
): Promise<T[]> {
  const results: T[] = [];

  while (tasks.length > 0) {
    const batch = tasks.splice(0, limit);

    const batchResults = await Promise.all(batch.map(task => task()));

    results.push(...batchResults);
  }

  return results;
}
