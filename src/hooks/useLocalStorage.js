import { useEffect, useState } from "react";

const getStoredValue = (key, initialValue) => {
    try {
        const storedValue = window.localStorage.getItem(key);

        if (storedValue === null) {
            return initialValue;
        }

        const parsedValue = JSON.parse(storedValue);

        return parsedValue;
    } catch {
        return initialValue;
    }
};

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => getStoredValue(key, initialValue));

    const [error, setError] = useState(false);

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));

            setError(false);
        } catch {
            setError(true);
        }
    }, [key, value]);

    const removeValue = () => {
        try {
            window.localStorage.removeItem(key);

            setValue(initialValue);
            setError(false);
        } catch {
            setError(true);
        }
    };

    return {
        value,
        setValue,
        error,
        removeValue,
    };
};

export default useLocalStorage;
