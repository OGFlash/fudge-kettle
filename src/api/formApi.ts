const API_BASE = import.meta.env.VITE_API_URL ?? '';

export async function submitCustomOrder(data: Record<string, string>): Promise<void> {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formType: 'custom-order', ...data }),
  });
  if (!res.ok) throw new Error('Submission failed');
}

export async function submitCheckout(data: Record<string, string>): Promise<void> {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formType: 'checkout', ...data }),
  });
  if (!res.ok) throw new Error('Submission failed');
}
