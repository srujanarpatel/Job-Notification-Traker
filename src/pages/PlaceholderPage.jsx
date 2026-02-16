import React from 'react';

const PlaceholderPage = ({ title }) => {
    return (
        <div style={{ padding: '64px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '48px',
                fontWeight: '700',
                marginBottom: '16px',
                color: 'var(--text-primary)',
                lineHeight: '1.2'
            }}>
                {title}
            </h1>
            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: '#666',
                maxWidth: '600px',
                lineHeight: '1.6',
                margin: '0'
            }}>
                This section will be built in the next step.
            </p>
        </div>
    );
};

export default PlaceholderPage;
