import React, { useEffect, useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import Button from './Button';

const JobModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }} onClick={onClose}>
            <div style={{
                background: 'white',
                borderRadius: 'var(--border-radius)',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '80vh',
                overflowY: 'auto',
                padding: '32px',
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>
                <button style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#888'
                }} onClick={onClose}>
                    <X size={24} />
                </button>

                <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: 0, marginBottom: '8px' }}>{job.title}</h2>
                <h3 style={{ fontSize: '16px', color: '#666', fontWeight: '500', marginBottom: '24px' }}>{job.company} • {job.location}</h3>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    {job.skills.map((skill, i) => (
                        <span key={i} style={{ background: '#f0f0f0', padding: '4px 12px', borderRadius: '16px', fontSize: '13px', color: '#333' }}>
                            {skill}
                        </span>
                    ))}
                </div>

                <div style={{ marginBottom: '24px', lineHeight: '1.6', color: '#444' }}>
                    <h4 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#888', marginBottom: '8px' }}>Description</h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{job.description}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                    <Button variant="primary" onClick={() => window.open(job.applyUrl, '_blank')}>
                        Apply Now <ExternalLink size={16} style={{ marginLeft: '8px' }} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default JobModal;
