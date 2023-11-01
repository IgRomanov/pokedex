import { useState, useEffect } from 'react';

export const useDebounce = (value, time) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, time);
        
        return () => {
            clearTimeout(handler);
        };
    }, [value, time]);
    
    return debounceValue;
};