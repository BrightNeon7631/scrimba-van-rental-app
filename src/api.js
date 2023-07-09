export async function getVans() {
  const res = await fetch('/api/vans');
  if (!res.ok) {
    throw {
      message: 'Failed to fetch vans',
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}

export async function getHostVans(id = null) {
  const fetchUrl = id ? `/api/host/vans/${id}` : '/api/host/vans';
  const res = await fetch(fetchUrl);
  if (!res.ok) {
    throw {
      message: 'Failed to fetch host vans',
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}