export const JWT_HEADER = (token) => ({
    Authorization: `Bearer ${token}`,
});

export const JSON_HEADER = {
    'Content-Type': 'application/json',
};