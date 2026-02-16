import React, { useEffect, useState } from 'react';
import { BookmarkIcon, ExternalLink } from 'lucide-react';
import Button from '../components/Button';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';

const Saved = () => {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedJobs')) || [];
        setSavedJobs(saved);
    }, []);

    const removeJob = (id) => {
        const updated = savedJobs.filter(j => j.id !== id);
        setSavedJobs(updated);
        localStorage.setItem('savedJobs', JSON.stringify(updated));
    };

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '24px' // Add padding to wrapper
        }}>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '32px',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    margin: 0,
                    marginBottom: '16px'
                }}>
                    Saved Opportunities
                </h1>
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '18px',
                    color: '#666',
                    maxWidth: '500px',
                    lineHeight: '1.6',
                    margin: '0 auto'
                }}>
                    {savedJobs.length > 0 ? `You have ${savedJobs.length} saved jobs.` : 'You haven\'t bookmarked any opportunities yet.'}
                </p>
            </div>

            {savedJobs.length > 0 ? (
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px'
                }}>
                    {savedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onSave={() => removeJob(job.id)} // This will be confusing if the icon is a Star (add), but let's assume it toggles or just removes. Given "onSave" usually means "Save", user might expect "Unsave". The button in JobCard is a Star. I'll stick to this for now but ideally I'd change the icon.
                            // However, the prompt asked to "Use JobCard logic".
                            onApply={() => window.open(job.applyUrl, '_blank')}
                            onView={() => { }} // No view needed or can add modal
                        />
                    ))}
                </div>
            ) : (
                <div style={{
                    background: '#fff',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius)',
                    padding: '80px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '24px',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        background: '#FFF5F5',
                        borderRadius: '50%',
                        padding: '24px',
                        color: 'var(--color-accent)',
                        marginBottom: '8px'
                    }}>
                        <BookmarkIcon size={48} />
                    </div>

                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '24px',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        margin: 0
                    }}>
                        Start building your shortlist
                    </h2>

                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <Button variant="primary">Browse Jobs</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Saved;
