// custom.d.ts
// This file is intended for global type declarations.
import React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'stripe-buy-button': React.HTMLAttributes<HTMLElement> & {
                'buy-button-id': string;
                'publishable-key': string;
            };
        }
    }
}
