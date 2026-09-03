export const parseError = (data, fallbackMessage) => {
    if (typeof data === "string" && data) return data;
    if (data && typeof data === "object" && typeof data.message === "string") return data.message;
    return fallbackMessage;
};

export const handleResponse = async (res, fallbackMessage) => {
    const text = await res.text();
    let data = null;

    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (!res.ok) {
        const message = parseError(data, fallbackMessage);
        throw new Error(message);
    }

    return data !== null ? data : {};
};
