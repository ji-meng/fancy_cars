import { css } from 'styled-components'

const truncateText = css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const fontFamilies = {
    PRIMARY: 'Source Sans Pro',
    HEADER: 'October Condensed Bold',
}

// This is more for rough sizes, don't expect people to use variables for font size
export const fontSizes = {
    XS: '12px',
    SM: '14px',
    MD: '18px',
    LG: '24px',
    XL: '48px',
}

export const fontWeights = {
    EXTRA_LIGHT: 200,
    LIGHT: 300,
    NORMAL: 400,
    SEMI_BOLD: 500,
    BOLD: 600,
    ULTRA_BOLD: 700,
    XULTRA_BOLD: 900,
}

export default {
    truncateText,
    fontFamilies,
    fontSizes,
    fontWeights,
}
