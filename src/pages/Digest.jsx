import React, { useState, useEffect } from 'react';
import { Mail, Copy, Send, RotateCw, AlertCircle, Clock } from 'lucide-react';
import Button from '../components/Button';
import { jobs as initialJobs } from '../data/jobs';
import { calculateMatchScore, getScoreColor } from '../utils/scoring';

const Digest = () => {
    const [digest, setDigest] = useState(null);
    const [preferences, setPreferences] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [recentStatuses, setRecentStatuses] = useState([]);

    useEffect(() => {
        // Load preferences
        const prefs = JSON.parse(localStorage.getItem('jobTrackerPreferences'));
        setPreferences(prefs);

        // Load statuses status updates
        const allStatuses = JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
        // Convert to array and filter meaningful ones
        const statusUpdates = Object.entries(allStatuses)
            .filter(([id, status]) => status !== 'Not Applied')
            .map(([id, status]) => {
                const job = initialJobs.find(j => j.id === id);
                return job ? { ...job, status } : null;
            })
            .filter(Boolean)
            .slice(0, 5); // Just show top 5 recent (simulated, since we don't store timestamp yet, just list them)

        setRecentStatuses(statusUpdates);

        // Check for existing digest
        if (prefs) {
            const today = new Date().toISOString().split('T')[0];
            const stored = localStorage.getItem(`jobTrackerDigest_${today}`);
            if (stored) {
                setDigest(JSON.parse(stored));
            }
        }
    }, []);

    const generateDigest = () => {
        /* ... same as before ... */
        if (!preferences) return;
        setLoading(true);
        setTimeout(() => {
            const today = new Date().toISOString().split('T')[0];

            // Score all jobs
            const scored = initialJobs.map(job => ({
                ...job,
                matchScore: calculateMatchScore(job, preferences)
            }));

            // Filter relevant matches first (optional, but good for quality)
            // Sort by matchScore desc, then postedDaysAgo asc
            const sorted = scored.sort((a, b) => {
                if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
                return a.postedDaysAgo - b.postedDaysAgo;
            });

            // Take top 10
            const top10 = sorted.slice(0, 10);
            const finalDigest = top10.filter(j => j.matchScore > 0);

            if (finalDigest.length === 0) {
                setDigest([]);
                localStorage.setItem(`jobTrackerDigest_${today}`, JSON.stringify([]));
            } else {
                setDigest(finalDigest);
                localStorage.setItem(`jobTrackerDigest_${today}`, JSON.stringify(finalDigest));
            }

            setLoading(false);
        }, 800);
    };

    const copyToClipboard = () => {
        if (!digest) return;
        const text = digest.map(j =>
            `[${j.matchScore}%] ${j.title} at ${j.company}\nLocation: ${j.location}\nApply: ${j.applyUrl}`
        ).join('\n\n');

        navigator.clipboard.writeText(`My 9AM Job Digest (${new Date().toLocaleDateString()})\n\n${text}`);
        setMessage('Copied to clipboard!');
        setTimeout(() => setMessage(''), 3000);
    };

    const createEmailDraft = () => {
        if (!digest) return;
        const subject = encodeURIComponent(`My 9AM Job Digest - ${new Date().toLocaleDateString()}`);
        const bodyText = digest.map(j =>
            `[${j.matchScore}%] ${j.title} at ${j.company} - ${j.location}\n${j.applyUrl}`
        ).join('\n\n');

        const body = encodeURIComponent(`Here is my daily job digest:\n\n${bodyText}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    if (!preferences) {
        return (
            <div style={{ maxWidth: '800px', margin: '64px auto', padding: '0 24px', textAlign: 'center' }}>
                {/* ... same no preferences view ... */}
                <div style={{
                    background: '#fff',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius)',
                    padding: '64px 32px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px'
                }}>
                    <AlertCircle size={48} color="#FFB300" />
                    <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Set Preferences Required</h2>
                    <p style={{ color: '#666', maxWidth: '400px', lineHeight: '1.6', margin: 0 }}>
                        To generate your personalized daily digest, we need to know what you're looking for.
                    </p>
                    <a href='/settings' style={{ textDecoration: 'none' }}>
                        <Button variant="primary">
                            Configure Preferences
                        </Button>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', margin: 0 }}>Daily Digest</h1>
                <Button variant="primary" onClick={generateDigest} disabled={loading || (digest && digest.length > 0)}>
                    {loading ? 'Generating...' : (digest && digest.length > 0) ? 'Digest Ready' : 'Generate Today\'s 9AM Digest'}
                    {!loading && !(digest && digest.length > 0) && <RotateCw size={16} style={{ marginLeft: '8px' }} />}
                </Button>
            </div>

            {/* Status Section Simulation */}
            {recentStatuses.length > 0 && (
                <div style={{ marginBottom: '32px', background: 'white', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '24px' }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={16} /> Recent Status Updates
                    </h3>
                    <div style={{ display: 'grid', gap: '12px' }}>
                        {recentStatuses.map(job => (
                            <div key={job.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px solid #f9f9f9', paddingBottom: '8px' }}>
                                <span><strong>{job.title}</strong> at {job.company}</span>
                                <span style={{
                                    textTransform: 'uppercase', fontSize: '11px', fontWeight: 'bold',
                                    color: job.status === 'Selected' ? 'green' : job.status === 'Rejected' ? 'red' : 'blue'
                                }}>
                                    {job.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Digest View */}
            {digest ? (
                digest.length > 0 ? (
                    <div className="digest-paper" style={{
                        background: 'white',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                        borderRadius: '2px',
                        overflow: 'hidden'
                    }}>
                        <div style={{ background: '#111', color: 'white', padding: '40px', textAlign: 'center' }}>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', margin: '0 0 8px 0', fontWeight: '400' }}>
                                Top Jobs For You
                            </h2>
                            <p style={{ opacity: 0.7, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0 }}>
                                9AM DIGEST • {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>

                        <div style={{ padding: '0 40px' }}>
                            {digest.map((job, index) => (
                                <div key={job.id} style={{
                                    borderBottom: index < digest.length - 1 ? '1px solid #f0f0f0' : 'none',
                                    padding: '32px 0',
                                    display: 'flex', justifyContent: 'space-between', gap: '24px', alignItems: 'center'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#111', fontFamily: 'var(--font-heading)' }}>
                                                {job.title}
                                            </h3>
                                            <span style={{
                                                fontSize: '12px', fontWeight: 'bold',
                                                color: getScoreColor(job.matchScore),
                                                background: '#fcfcfc', border: `1px solid ${getScoreColor(job.matchScore)}`, padding: '2px 8px', borderRadius: '12px'
                                            }}>
                                                {job.matchScore}% Match
                                            </span>
                                        </div>
                                        <p style={{ margin: '0 0 6px 0', color: '#555', fontSize: '15px' }}>
                                            {job.company} • {job.location} ({job.mode})
                                        </p>
                                        <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>
                                            {job.experience} • {job.salaryRange}
                                        </p>
                                    </div>
                                    <Button variant="secondary" onClick={() => window.open(job.applyUrl, '_blank')} style={{ fontSize: '14px', padding: '10px 24px', whiteSpace: 'nowrap' }}>
                                        Apply Now
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div style={{ background: '#fafafa', padding: '32px', textAlign: 'center', borderTop: '1px solid #eee', color: '#888', fontSize: '14px' }}>
                            <p style={{ margin: '0 0 24px 0' }}>This digest was generated based on your preferences.</p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                                <button onClick={copyToClipboard} style={actionLinkStyle}>
                                    <Copy size={16} /> Copy Digest
                                </button>
                                <button onClick={createEmailDraft} style={actionLinkStyle}>
                                    <Send size={16} /> Email Digest
                                </button>
                            </div>
                            {message && <div style={{ color: 'var(--color-success)', marginTop: '16px', fontWeight: '500' }}>{message}</div>}
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <h3>No matching roles found today.</h3>
                        <p style={{ color: '#666' }}>Try broadening your preferences or check back tomorrow.</p>
                        <Button variant="secondary" onClick={generateDigest} style={{ marginTop: '16px' }}>Regenerate</Button>
                    </div>
                )
            ) : (
                <div style={{ textAlign: 'center', padding: '80px 40px', background: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc' }}>
                    <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <Mail size={32} color="#111" />
                    </div>
                    <h3 style={{ color: '#111', margin: '0 0 8px 0', fontFamily: 'var(--font-heading)' }}>Ready to Generate</h3>
                    <p style={{ color: '#666', maxWidth: '400px', margin: '0 auto 32px auto', lineHeight: '1.6' }}>
                        Click the button above to simulate the 9AM daily trigger and build your curated list of top 10 matches.
                    </p>
                    <div style={{ fontSize: '12px', color: '#999', fontFamily: 'monospace', background: '#eee', display: 'inline-block', padding: '4px 8px', borderRadius: '4px' }}>
                        Simulated Mode: Manual Trigger
                    </div>
                </div>
            )}
        </div>
    );
};

const actionLinkStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#333',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background 0.2s'
};

export default Digest;
