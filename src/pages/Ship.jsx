import React, { useEffect, useState } from 'react';
import { RocketIcon, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Ship = () => {
    const navigate = useNavigate();
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const checkedItems = JSON.parse(localStorage.getItem('testChecklist') || '{}');
        const passedCount = Object.values(checkedItems).filter(Boolean).length;
        if (passedCount < 10) {
            navigate('/jt/07-test'); // Correctly redirect to the checklist if incomplete
        } else {
            setIsComplete(true);
        }
    }, [navigate]);

    if (!isComplete) return null; // Or loading spinner

    return (
        <div style={{ maxWidth: '800px', margin: '64px auto', padding: '0 24px', textAlign: 'center' }}>
            <div style={{
                background: '#fff',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius)',
                padding: '80px 40px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px'
            }}>
                <div style={{
                    background: '#f0fcf4',
                    borderRadius: '50%',
                    padding: '32px',
                    color: '#4CAF50',
                    marginBottom: '16px'
                }}>
                    <RocketIcon size={64} />
                </div>

                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', margin: 0 }}>
                    Ready for Launch!
                </h1>

                <p style={{ color: '#666', maxWidth: '500px', lineHeight: '1.6', fontSize: '18px', margin: 0 }}>
                    All system checks passed. The Job Notification Tracker is stable and ready for production deployment.
                </p>

                <div style={{
                    marginTop: '24px',
                    padding: '16px 24px',
                    background: '#fafafa',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#555',
                    fontSize: '14px'
                }}>
                    <CheckCircle size={16} color="green" />
                    <span>Version 1.0.0 Verified</span>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <Button variant="secondary">Back to Workspace</Button>
                    </Link>
                    <Button variant="primary" onClick={() => alert('Deployment sequence initiated (simulated)!')}>
                        Deploy Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Ship;
