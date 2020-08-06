import { useIsFocused } from '@react-navigation/native';
import { loadPlaygroundCards, CardModel } from './../utils/cards/index';
import { useState, useEffect } from "react";

export enum FetchTypes {
    Playground,
};
const useFetch = (type: FetchTypes, options?: {}) => {
    const [response, setResponse] = useState<object | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();
    
    useEffect(() => {
        if (!isFocused) {
            return;
        }
        const abortController = new AbortController();
        const signal = abortController.signal;
        const loadCards = async () => {
            setLoading(true);
            let response = null;
            try {
                switch (type) {
                    default:
                    case FetchTypes.Playground: {
                        response = await loadPlaygroundCards({});
                        break;
                    }
                }
                if (!signal.aborted) {
                    setResponse(response);
                }
            } catch (e) {
                if (!signal.aborted) {
                    setError(e);
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };
        loadCards();

        return () => abortController.abort();
    }, [isFocused]);

    return { response, error, loading };
};

export default useFetch;
