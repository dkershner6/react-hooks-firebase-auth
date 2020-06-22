import { useState } from 'react';

/**
 * Persist your state to local storage, so that it sticks around through page refreshes.
 * Matches the React useState API for sets, and just adds a key for other functionality.
 * Only works in the browser...for now.
 * @param key Important this is globally unique for the user. Initial value will be overwritten if value pre-exists.
 * @param initialValue
 */
const useLocalStorage = <T,>(
    key: string,
    initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            if (typeof window !== 'undefined') {
                const item = window?.localStorage?.getItem(key);

                return item ? JSON.parse(item) : initialValue;
            }
            return initialValue;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            return initialValue;
        }
    });

    const setValue: React.Dispatch<React.SetStateAction<T>> = (value: T) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== 'undefined') {
                window?.localStorage?.setItem(
                    key,
                    JSON.stringify(valueToStore)
                );
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;
