export const formatZipCode = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");

    const truncatedValue = cleanedValue.slice(0, 8);
    if (truncatedValue.length > 5) {
        return `${truncatedValue.slice(0, 5)}-${truncatedValue.slice(5)}`;
    }
    return truncatedValue;
};