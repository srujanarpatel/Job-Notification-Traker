import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            textAlign: 'center',
            padding: '0 var(--s-24)'
        }}>
            <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '56px',
                fontWeight: '700',
                marginBottom: '24px',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                maxWidth: '800px',
                lineHeight: '1.1'
            }}>
                Stop Missing The Right Jobs.
            </h1>

            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '20px',
                color: '#555',
                marginBottom: '48px',
                maxWidth: '500px',
                lineHeight: '1.6'
            }}>
                Precision-matched job discovery delivered daily at 9AM.
            </p>

            <Link to="/settings" style={{ textDecoration: 'none' }}>
                <Button variant="primary" style={{
                    padding: '16px 32px',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    Start Tracking <ArrowRight size={20} />
                </Button>
            </Link>
        </div>
    );
};

export default LandingPage;
