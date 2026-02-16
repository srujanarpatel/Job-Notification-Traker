import React, { useState } from 'react';
import './JobCard.css';
import { Building2, MapPin, Clock, DollarSign, Brain, Link as LinkIcon, ChevronDown } from 'lucide-react';
import Button from './Button';

const STATUS_COLORS = {
    'Not Applied': '#9E9E9E',
    'Applied': '#2196F3',
    'Rejected': '#F44336',
    'Selected': '#4CAF50'
};

const JobCard = ({ job, onSave, onApply, onView, status = 'Not Applied', onStatusChange }) => {
    const [showStatusMenu, setShowStatusMenu] = useState(false);

    const handleStatusClick = (newStatus) => {
        onStatusChange(job.id, newStatus);
        setShowStatusMenu(false);
    };

    return (
        <div className="job-card" style={{ borderColor: status === 'Selected' ? '#4CAF50' : status === 'Rejected' ? '#FFCDD2' : 'var(--border-color)' }}>
            <div className="job-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, fontFamily: 'var(--font-heading)' }}>{job.title}</h3>

                    {/* Status Badge / Dropdown Trigger */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowStatusMenu(!showStatusMenu)}
                            style={{
                                fontSize: '11px',
                                fontWeight: '600',
                                padding: '4px 10px',
                                borderRadius: '12px',
                                backgroundColor: 'white',
                                border: `1px solid ${STATUS_COLORS[status] || '#ccc'}`,
                                color: STATUS_COLORS[status] || '#666',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                            {status} <ChevronDown size={10} />
                        </button>

                        {showStatusMenu && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: '4px',
                                background: 'white',
                                border: '1px solid #eee',
                                borderRadius: '4px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                zIndex: 20,
                                minWidth: '120px',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                {Object.keys(STATUS_COLORS).map(s => (
                                    <button
                                        key={s}
                                        onClick={() => handleStatusClick(s)}
                                        style={{
                                            textAlign: 'left',
                                            padding: '8px 12px',
                                            background: 'white',
                                            border: 'none',
                                            fontSize: '12px',
                                            color: s === status ? STATUS_COLORS[s] : '#333',
                                            fontWeight: s === status ? 'bold' : 'normal',
                                            cursor: 'pointer',
                                            borderBottom: '1px solid #f9f9f9'
                                        }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666', fontSize: '14px', marginBottom: '12px' }}>
                    <Building2 size={14} />
                    {job.company}
                    <span style={{ color: '#ddd' }}>|</span>
                    <span style={{ fontSize: '11px', color: '#888' }}>{job.source}</span>
                </div>
            </div>

            <div className="job-details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#555' }}>
                    <MapPin size={13} />
                    {job.location} ({job.mode})
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#555' }}>
                    <Clock size={13} />
                    {job.experience}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#555' }}>
                    <DollarSign size={13} />
                    {job.salaryRange}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#888' }}>
                    Posted {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}
                </div>
            </div>

            <div className="job-skills-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {job.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} style={{
                        backgroundColor: '#f5f5f5',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        color: '#444'
                    }}>
                        {skill}
                    </span>
                ))}
                {job.skills.length > 3 && <span style={{ fontSize: '11px', color: '#888', alignSelf: 'center' }}>+{job.skills.length - 3}</span>}
            </div>

            <div className="job-footer" style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                <Button variant="secondary" onClick={() => onView(job)} style={{ padding: '8px', flex: 0 }} title="View Details">
                    <Brain size={18} />
                </Button>
                <Button variant="secondary" onClick={() => onSave(job)} style={{ padding: '8px', flex: 0 }} title="Save">
                    <span style={{ fontSize: '16px' }}>★</span>
                </Button>
                <Button variant="primary" onClick={() => onApply(job)} style={{ flex: 1, justifyContent: 'center' }}>
                    Apply <LinkIcon size={14} style={{ marginLeft: '6px' }} />
                </Button>
            </div>
        </div>
    );
};

export default JobCard;
