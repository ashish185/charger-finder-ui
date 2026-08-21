const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export class VehicleService {
  static async list() {
    const res = await fetch(`${apiUrl}/vehicles`, {
      credentials: "include",
    });

    const body = await handleResponse(res, "Could not fetch vehicles");
    return body.data;
  }
}

async function handleResponse(res, errorMessage) {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || errorMessage);
  }

  return data;
}
