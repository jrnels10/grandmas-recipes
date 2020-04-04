import React from 'react';

export async function formatTextToList(text) {
    const textSplit = text.split('\n');
    return textSplit.map((textSplit, idx) =>
        <li key={idx}>{textSplit}</li>
    );
};



export async function horizontalPageTransition() {
    const pageVariant = {
        in: {
            opacity: 1,
            x: 0
        },
        out: {
            opacity: 0,
            x: "-100vw"
        }
    };
    const pageTransition = {
        transition: "linear"
    }
    return { pageVariant, pageTransition }
}