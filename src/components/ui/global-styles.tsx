// src/components/ui/global-styles.tsx
"use client"

import { Global } from "@emotion/react"

export const GlobalStyles = () => (
    <Global
        styles={`
        :root {
            --bg-milky: #fffaf0;
            --text-regular: #0a0404;
            --text-heading: #1a202c;
            --accent-sky: #87CEEB;
            --card-grey: #f5f5f5;
        }

        [data-theme='dark'] {
            --bg-milky: #0a0a0a;
            --text-regular: #ededed;
            --text-heading: #ffffff;
            --card-dark: #1a202c;
        }

        body {
            background-color: var(--bg-milky);
            color: var(--text-regular);
            font-family: system-ui, sans-serif;
        }

        * {
            color: inherit;
        }

        h1, h2, h3, h4, h5, h6 {
            color: var(--text-heading);
        }

        strong {
            color: var(--text-heading);
        }
        `}
    />
)
