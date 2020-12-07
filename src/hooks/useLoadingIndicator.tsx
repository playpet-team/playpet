import { useState } from 'react';
import Indicator from '../components/Indicator'

function useLoadingIndicator() {
    const [loading, setLoading] = useState(false);

    return {
        loading,
        setLoading,
        Indicator
    };
};

export default useLoadingIndicator;
