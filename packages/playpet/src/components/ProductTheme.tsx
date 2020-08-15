import React, { useState, useEffect } from 'react';

interface ThemeProps {
    themeId: 'hot' | 'new' | 'sale';
};
function ProductTheme({ themeId = 'hot' }: ThemeProps) {

    return (
        null
    );
};

export default ProductTheme;

type Themes = {
    themeId: 'hot' | 'new' | 'sale';

}