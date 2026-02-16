import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle, Clock, Link as LinkIcon, ExternalLink, Copy, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const Proof = () => {
    // Hardcoded steps for Project 1 - could be dynamic but fixed for this context
    const steps = [
        { id: 1, name: 'Project Initialization', status: 'Completed' },
        { id: 2, name: 'Routing & Navigation', status: 'Completed' },
        { id: 3, name: 'Job Data Generation', status: 'Completed' },
        { id: 4, name: 'Dashboard Implem.', status: 'Completed' },
        { id: 5, name: 'Preferences Engine', status: 'Completed' },
        { id: 6, name: 'Daily Digest Logic', status: 'Completed' },
        { id: 7, name: 'Status Tracking', status: 'Completed' },
        { id: 8, name: 'Test Verification', status: 'Pending' } // Will check localStorage
    ];

    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deployed: ''
    });

    const [status, setStatus] = useState('Not Started'); // Not Started, In Progress, Shipped
    const [testPassed, setTestPassed] = useState(false);
    const [stepData, setStepData] = useState(steps);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Load links
        const savedLinks = JSON.parse(localStorage.getItem('proofLinks') || '{}');
        setLinks(prev => ({ ...prev, ...savedLinks }));

        // Check Tests
        const checklist = JSON.parse(localStorage.getItem('testChecklist') || '{}');
        const passedCount = Object.values(checklist).filter(Boolean).length;
        const allTestsPassed = passedCount >= 10;
        setTestPassed(allTestsPassed);

        // Update step 8 status
        const updatedSteps = steps.map(s => {
            if (s.id === 8) return { ...s, status: allTestsPassed ? 'Completed' : 'Pending' };
            return s;
        });
        setStepData(updatedSteps);

    }, []);

    useEffect(() => {
        // Validation Logic for Status
        const hasLinks = links.lovable && links.github && links.deployed;

        if (hasLinks && testPassed) {
            setStatus('Shipped');
        } else if (hasLinks || testPassed) {
            setStatus('In Progress');
        } else {
            setStatus('Not Started');
        }
    }, [links, testPassed]);

    const handleLinkChange = (field, value) => {
        const newLinks = { ...links, [field]: value };
        setLinks(newLinks);
        localStorage.setItem('proofLinks', JSON.stringify(newLinks));
    };

    const copySubmission = () => {
        const text = `Job Notification Tracker — Final Submission\n\nLovable Project:\n${links.lovable}\n\nGitHub Repository:\n${links.github}\n\nLive Deployment:\n${links.deployed}\n\nCore Features:\n- Intelligent match scoring\n- Daily digest simulation\n- Status tracking\n- Test checklist enforced`;
        navigator.clipboard.writeText(text);
        setMessage('Submission copied to clipboard.');
        setTimeout(() => setMessage(''), 3000);
    };

    const getStatusColor = (s) => {
        if (s === 'Shipped') return '#4CAF50';
        if (s === 'In Progress') return '#FFB300';
        return '#9E9E9E';
    };

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>

            {/* Header */}
            <header style={{ marginBottom: '40px', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', marginBottom: '8px', margin: 0 }}>
                    Project Proof
                </h1>
                <p style={{ color: '#666', fontSize: '18px', marginTop: '8px' }}>
                    Final validation and artifact collection.
                </p>

                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '8px 16px', borderRadius: '24px',
                    backgroundColor: `${getStatusColor(status)}20`,
                    color: getStatusColor(status),
                    marginTop: '16px',
                    fontWeight: '600',
                    fontSize: '14px',
                    border: `1px solid ${getStatusColor(status)}`
                }}>
                    {status === 'Shipped' ? <CheckCircle size={16} /> : <Clock size={16} />}
                    {status}
                </div>
            </header>

            {/* Step Summary */}
            <section style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={18} /> Step Completion Summary
                </h3>
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px'
                }}>
                    {stepData.map(step => (
                        <div key={step.id} style={{
                            padding: '12px',
                            background: 'white',
                            border: '1px solid #eee',
                            borderRadius: '6px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '13px'
                        }}>
                            <span style={{ fontWeight: '500', color: '#333' }}>{step.name}</span>
                            {step.status === 'Completed' ? (
                                <CheckCircle size={14} color="green" />
                            ) : (
                                <div style={{ w: '14px', h: '14px', borderRadius: '50%', border: '2px solid #ddd', width: '12px', height: '12px' }} />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Artifact Inputs */}
            <Card style={{ padding: '32px', marginBottom: '32px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '20px', fontFamily: 'var(--font-heading)' }}>
                    Artifact Collection
                </h3>

                <div style={{ display: 'grid', gap: '24px' }}>
                    <div>
                        <Input
                            label="Lovable Project Link"
                            placeholder="https://lovable.dev/..."
                            value={links.lovable}
                            onChange={(e) => handleLinkChange('lovable', e.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            label="GitHub Repository Link"
                            placeholder="https://github.com/..."
                            value={links.github}
                            onChange={(e) => handleLinkChange('github', e.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            label="Deployed URL"
                            placeholder="https://vercel.app/..."
                            value={links.deployed}
                            onChange={(e) => handleLinkChange('deployed', e.target.value)}
                        />
                    </div>
                </div>
            </Card>

            {/* Submission Action */}
            <div style={{ textAlign: 'center' }}>
                <Button
                    variant="primary"
                    onClick={copySubmission}
                    disabled={status !== 'Shipped'}
                    style={{
                        margin: '0 auto',
                        padding: '12px 32px',
                        opacity: status !== 'Shipped' ? 0.6 : 1,
                        cursor: status !== 'Shipped' ? 'not-allowed' : 'pointer'
                    }}
                >
                    <Copy size={18} style={{ marginRight: '8px' }} />
                    Copy Final Submission
                </Button>

                {message && (
                    <div style={{ marginTop: '16px', color: 'var(--color-success)', fontWeight: '500' }}>
                        {message}
                    </div>
                )}

                {status === 'Shipped' && (
                    <p style={{ marginTop: '24px', color: '#666', fontSize: '15px' }}>
                        Project 1 Shipped Successfully.
                    </p>
                )}

                {status !== 'Shipped' && (
                    <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#888', fontSize: '14px' }}>
                        <AlertCircle size={14} /> Complete all steps and provide links to ship.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Proof;
