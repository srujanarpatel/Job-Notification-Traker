import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { Save, Info } from 'lucide-react';

const Settings = () => {
    const [preferences, setPreferences] = useState({
        roleKeywords: '',
        preferredLocations: '',
        preferredMode: {
            Remote: false,
            Hybrid: false,
            Onsite: false
        },
        experienceLevel: '',
        skills: '',
        minMatchScore: 40
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('jobTrackerPreferences'));
        if (saved) {
            setPreferences(saved);
        }
    }, []);

    const handleChange = (field, value) => {
        setPreferences(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleModeChange = (mode) => {
        setPreferences(prev => ({
            ...prev,
            preferredMode: {
                ...prev.preferredMode,
                [mode]: !prev.preferredMode[mode]
            }
        }));
    };

    const handleSubmit = () => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(preferences));
        setMessage('Preferences saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', marginBottom: '8px' }}>
                    Matching Preferences
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                    Configure your job search parameters to activate intelligent match scoring.
                </p>
            </header>

            <Card style={{ padding: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* Role Keywords */}
                    <div>
                        <Input
                            label="Role Keywords"
                            placeholder="e.g. Frontend Developer, React Engineer, SDE"
                            value={preferences.roleKeywords}
                            onChange={(e) => handleChange('roleKeywords', e.target.value)}
                        />
                        <span style={{ fontSize: '13px', color: '#888' }}>Comma-separated. +25 points for title match, +15 for description.</span>
                    </div>

                    {/* Preferred Locations */}
                    <div>
                        <Input
                            label="Preferred Locations"
                            placeholder="e.g. Bangalore, Pune, Remote"
                            value={preferences.preferredLocations}
                            onChange={(e) => handleChange('preferredLocations', e.target.value)}
                        />
                        <span style={{ fontSize: '13px', color: '#888' }}>Comma-separated. +15 points for location match.</span>
                    </div>

                    {/* Preferred Mode */}
                    <div>
                        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '12px' }}>
                            Preferred Work Modes (+10 points)
                        </label>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            {['Remote', 'Hybrid', 'Onsite'].map(mode => (
                                <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={preferences.preferredMode[mode]}
                                        onChange={() => handleModeChange(mode)}
                                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-accent)' }}
                                    />
                                    <span style={{ fontSize: '15px' }}>{mode}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Experience Level */}
                    <div>
                        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '12px' }}>
                            Experience Level (+10 points)
                        </label>
                        <select
                            value={preferences.experienceLevel}
                            onChange={(e) => handleChange('experienceLevel', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '4px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'white',
                                fontSize: '16px',
                                fontFamily: 'var(--font-body)'
                            }}
                        >
                            <option value="">Select Experience Level</option>
                            <option value="Fresher">Fresher (0 years)</option>
                            <option value="0-1 Years">0-1 Years</option>
                            <option value="1-3 Years">1-3 Years</option>
                            <option value="3-5 Years">3-5 Years</option>
                            <option value="5+ Years">5+ Years</option>
                        </select>
                    </div>

                    {/* Skills */}
                    <div>
                        <Input
                            label="Skills"
                            placeholder="e.g. React, Python, AWS, SQL"
                            value={preferences.skills}
                            onChange={(e) => handleChange('skills', e.target.value)}
                        />
                        <span style={{ fontSize: '13px', color: '#888' }}>Comma-separated. +15 points skill overlap match.</span>
                    </div>

                    {/* Min Match Score */}
                    <div>
                        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span>Minimum Match Score Threshold</span>
                            <span style={{ color: 'var(--color-accent)' }}>{preferences.minMatchScore}</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={preferences.minMatchScore}
                            onChange={(e) => handleChange('minMatchScore', parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888', marginTop: '4px' }}>
                            <span>0 (Loose)</span>
                            <span>100 (Strict)</span>
                        </div>
                    </div>

                    <div style={{ marginTop: '16px', borderTop: '1px solid #eee', paddingTop: '32px' }}>
                        <Button variant="primary" onClick={handleSubmit} style={{ width: '100%', justifyContent: 'center' }}>
                            <Save size={18} style={{ marginRight: '8px' }} />
                            Save Preferences
                        </Button>
                        {message && (
                            <div style={{ marginTop: '16px', textAlign: 'center', color: 'var(--color-success)', fontWeight: '500' }}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Settings;
