import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, AlertTriangle, RotateCcw, Lock, Ship as ShipIcon } from 'lucide-react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

const checklistItems = [
    { id: 1, text: "Preferences persist after refresh", tip: "Reload page after saving." },
    { id: 2, text: "Match score calculates correctly", tip: "Verify score badge math." },
    { id: 3, text: "'Show only matches' toggle works", tip: "Filter for score >= threshold." },
    { id: 4, text: "Save job persists after refresh", tip: "Check /saved after reload." },
    { id: 5, text: "Apply opens in new tab", tip: "Click Apply and check tab." },
    { id: 6, text: "Status update persists after refresh", tip: "Change status, reload, verify." },
    { id: 7, text: "Status filter works correctly", tip: "Filter by 'Applied' etc." },
    { id: 8, text: "Digest generates top 10 by score", tip: "Check /digest count/order." },
    { id: 9, text: "Digest persists for the day", tip: "Reload /digest, same list?" },
    { id: 10, text: "No console errors on main pages", tip: "F12 > Console > Reload." }
];

const TestChecklist = () => {
    const [checkedItems, setCheckedItems] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('testChecklist') || '{}');
        setCheckedItems(saved);
    }, []);

    const toggleItem = (id) => {
        const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newChecked);
        localStorage.setItem('testChecklist', JSON.stringify(newChecked));
    };

    const resetTests = () => {
        setCheckedItems({});
        localStorage.removeItem('testChecklist');
    };

    const passedCount = Object.values(checkedItems).filter(Boolean).length;
    const isComplete = passedCount === checklistItems.length;

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', marginBottom: '8px', margin: 0 }}>
                        System Verification
                    </h1>
                    <p style={{ color: '#666', margin: '8px 0 0 0' }}>
                        Validate core functionality before shipping.
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: isComplete ? 'var(--color-success)' : 'var(--color-warning)'
                    }}>
                        {passedCount} / {checklistItems.length}
                    </div>
                    <div style={{ fontSize: '13px', color: '#888' }}>Tests Passed</div>
                </div>
            </div>

            <div style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden'
            }}>
                {checklistItems.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        style={{
                            padding: '16px 24px',
                            borderBottom: index < checklistItems.length - 1 ? '1px solid #f0f0f0' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            cursor: 'pointer',
                            background: checkedItems[item.id] ? '#fafafa' : 'white',
                            transition: 'background 0.2s'
                        }}
                    >
                        <div style={{ color: checkedItems[item.id] ? 'var(--color-success)' : '#ccc' }}>
                            {checkedItems[item.id] ? <CheckSquare size={20} /> : <Square size={20} />}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{
                                fontWeight: '500',
                                color: checkedItems[item.id] ? '#888' : '#333',
                                textDecoration: checkedItems[item.id] ? 'line-through' : 'none'
                            }}>
                                {item.text}
                            </div>
                            <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>
                                Test: {item.tip}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="secondary" onClick={resetTests} style={{ color: '#666' }}>
                    <RotateCcw size={14} style={{ marginRight: '8px' }} /> Reset Status
                </Button>

                {isComplete ? (
                    <Link to="/jt/08-ship" style={{ textDecoration: 'none' }}>
                        <Button variant="primary" style={{ padding: '12px 32px' }}>
                            Proceed to Ship <ShipIcon size={18} style={{ marginLeft: '8px' }} />
                        </Button>
                    </Link>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#888' }}>
                        <span style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <AlertTriangle size={14} /> Resolve all issues to unlock shipping
                        </span>
                        <Button variant="secondary" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                            Ship Locked <Lock size={14} style={{ marginLeft: '8px' }} />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestChecklist;
