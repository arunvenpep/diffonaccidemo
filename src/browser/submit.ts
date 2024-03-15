/**
 * A function to submit a diffonacci request for processing
 */
export async function submit(a: number, b: number) {
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ a, b }),
  }).then(async (res) => {
    if (!res.ok) {
      console.error(`Submit failed!`, {
        status: res.status,
        statusText: res.statusText,
        state: { a, b },
      });
      return;
    }
    const data = await res.text();
    console.log(`Submit succeeded`, data);
  });
}
