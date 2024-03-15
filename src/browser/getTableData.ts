/**
 * A function to get the current state of the database
 */

export async function getTableData() {
  const response = await fetch('/queue', {
    method: 'get',
  });
  if (!response.ok) {
    throw new Error(
      `Failed to get queue data (${response.status}: ${response.statusText}): ${response.text}`,
    );
  }
  const json = await response.json();
  return json;
}
