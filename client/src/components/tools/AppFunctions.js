import React from 'react';

export async function formatTextToList(text) {
    const textSplit = text.split('\n');
    return textSplit.map((textSplit, idx) =>
        <li key={idx}>{textSplit}</li>
    );
};