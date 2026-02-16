import React, { useState, useEffect } from 'react';
import { jobs as initialJobs } from '../data/jobs';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import JobModal from '../components/JobModal';
import { UploadCloud, Zap, Info } from 'lucide-react';
import { calculateMatchScore, getScoreColor } from '../utils/scoring';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [savedJobs, setSavedJobs] = useState([]);
    const [preferences, setPreferences] = useState(null);
    const [showOnlyMatches, setShowOnlyMatches] = useState(false);
    const [jobStatuses, setJobStatuses] = useState({});
    const [toast, setToast] = useState(null);

    // Filter State
    const [filters, setFilters] = useState({
        keyword: '', location: '', mode: '', experience: '', source: '', status: 'All', sort: 'Latest'
    });

    useEffect(() => {
        // Load preferences
        const prefs = JSON.parse(localStorage.getItem('jobTrackerPreferences'));
        setPreferences(prefs);

        // Load saved jobs
        const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setSavedJobs(saved);

        // Load statuses
        const statuses = JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
        setJobStatuses(statuses);

        // Initial Score Calculation
        const scoredJobs = initialJobs.map(job => ({
            ...job,
            matchScore: prefs ? calculateMatchScore(job, prefs) : 0,
            status: statuses[job.id] || 'Not Applied'
        }));

        setJobs(scoredJobs);
        setFilteredJobs(scoredJobs);
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = jobs.map(j => ({
            ...j,
            status: jobStatuses[j.id] || 'Not Applied'
        }));

        // 1. Keyword
        if (filters.keyword) {
            const k = filters.keyword.toLowerCase();
            result = result.filter(j =>
                j.title.toLowerCase().includes(k) ||
                j.company.toLowerCase().includes(k)
            );
        }

        // 2. Dropdowns
        if (filters.location) result = result.filter(j => j.location === filters.location);
        if (filters.mode) result = result.filter(j => j.mode === filters.mode);
        if (filters.experience) result = result.filter(j => j.experience === filters.experience);
        if (filters.source) result = result.filter(j => j.source === filters.source);

        // 3. Status Filter
        if (filters.status && filters.status !== 'All') {
            result = result.filter(j => j.status === filters.status);
        }

        // 4. "Show Only Matches" Toggle
        if (showOnlyMatches && preferences) {
            result = result.filter(j => j.matchScore >= (preferences.minMatchScore || 40));
        }

        // 5. Sorting
        if (filters.sort === 'Match Score') {
            result.sort((a, b) => b.matchScore - a.matchScore);
        } else if (filters.sort === 'Salary') {
            const extract = (s) => parseInt(s.replace(/[^0-9]/g, '')) || 0;
            result.sort((a, b) => extract(b.salaryRange) - extract(a.salaryRange));
        } else {
            result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        }

        setFilteredJobs(result);
    }, [filters, jobs, showOnlyMatches, preferences, jobStatuses]);

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const handleStatusChange = (jobId, newStatus) => {
        const updatedStatuses = {
            ...jobStatuses,
            [jobId]: newStatus
        };
        setJobStatuses(updatedStatuses);
        localStorage.setItem('jobTrackerStatus', JSON.stringify(updatedStatuses));

        // Show notification if status changed meaningfully
        if (newStatus !== 'Not Applied') {
            setToast(`Status updated: ${newStatus}`);
            setTimeout(() => setToast(null), 3000);
        }
    };

    const handleSave = (job) => {
        const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        if (!saved.find(j => j.id === job.id)) {
            const newSaved = [...saved, job];
            localStorage.setItem('savedJobs', JSON.stringify(newSaved));
            setSavedJobs(newSaved);
            setToast(`Saved ${job.title}`);
            setTimeout(() => setToast(null), 3000);
        } else {
            setToast('Already saved');
            setTimeout(() => setToast(null), 3000);
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>

            {/* Header */}
            <div style={{
                marginBottom: '32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '16px'
            }}>
                <div>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', marginBottom: '8px', color: 'var(--text-primary)' }}>
                        Job Feed
                    </h1>
                    <p style={{ color: '#666', fontSize: '16px' }}>
                        Showing {filteredJobs.length} opportunities.
                    </p>
                </div>

                {preferences ? (
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 16px',
                        background: showOnlyMatches ? '#FFF3E0' : '#f5f5f5',
                        borderRadius: '24px',
                        cursor: 'pointer',
                        border: showOnlyMatches ? '1px solid #FFB74D' : '1px solid transparent',
                        transition: 'all 0.2s ease'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '24px',
                            backgroundColor: showOnlyMatches ? 'var(--color-accent)' : '#ccc',
                            borderRadius: '12px',
                            position: 'relative'
                        }}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '2px',
                                left: showOnlyMatches ? '18px' : '2px',
                                transition: 'left 0.2s',
                            }} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '14px', color: showOnlyMatches ? 'var(--color-accent)' : '#666' }}>
                            Only Matches ({preferences.minMatchScore}+)
                        </span>
                    </label>
                ) : (
                    <div style={{
                        padding: '12px 16px',
                        background: '#E3F2FD',
                        color: '#1565C0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Info size={18} />
                        Set preferences to enable AI matching.
                    </div>
                )}
            </div>

            <FilterBar onFilterChange={handleFilterChange} />

            {/* Empty Statess */}
            {filteredJobs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '64px', color: '#666' }}>
                    <div style={{
                        background: '#f9f9f9',
                        borderRadius: '50%',
                        padding: '24px',
                        display: 'inline-block',
                        marginBottom: '16px'
                    }}>
                        <UploadCloud size={48} color="#ccc" />
                    </div>
                    <h3>No roles match your criteria.</h3>
                    <p>Adjust filters or lower your match threshold.</p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: '24px'
                }}>
                    {filteredJobs.map(job => (
                        <div key={job.id} style={{ position: 'relative' }}>
                            {/* Match Score Badge */}
                            {job.matchScore > 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    backgroundColor: getScoreColor(job.matchScore),
                                    color: 'white',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    zIndex: 10,
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    border: '2px solid white'
                                }}>
                                    {job.matchScore}
                                </div>
                            )}
                            <JobCard
                                job={job}
                                status={jobStatuses[job.id] || 'Not Applied'}
                                onStatusChange={handleStatusChange}
                                onSave={() => handleSave(job)}
                                onApply={() => window.open(job.applyUrl, '_blank')}
                                onView={() => setSelectedJob(job)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <div style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    backgroundColor: '#333',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 2000,
                    animation: 'fadeIn 0.3s ease',
                    fontSize: '14px',
                    fontWeight: '500'
                }}>
                    {toast}
                </div>
            )}

            {selectedJob && (
                <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
        </div>
    );
};

export default Dashboard;
