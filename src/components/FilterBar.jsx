import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const FilterBar = ({ onFilterChange }) => {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [mode, setMode] = useState('');
    const [experience, setExperience] = useState('');
    const [source, setSource] = useState('');
    const [status, setStatus] = useState('All');

    const updateFilters = (key, val) => {
        const filters = { keyword, location, mode, experience, source, status };
        filters[key] = val;
        onFilterChange(filters);
    };

    const handleChange = (e, field) => {
        const val = e.target.value;
        if (field === 'keyword') setKeyword(val);
        if (field === 'location') setLocation(val);
        if (field === 'mode') setMode(val);
        if (field === 'experience') setExperience(val);
        if (field === 'source') setSource(val);
        if (field === 'status') setStatus(val);

        updateFilters(field, val);
    };

    const clearFilters = () => {
        setKeyword('');
        setLocation('');
        setMode('');
        setExperience('');
        setSource('');
        setStatus('All');
        onFilterChange({ keyword: '', location: '', mode: '', experience: '', source: '', status: 'All' });
    };

    return (
        <div className="filter-bar" style={{
            background: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius)',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center'
        }}>
            <div style={{ flex: 2, minWidth: '200px', display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px', padding: '0 8px' }}>
                <Search size={16} color="#888" />
                <input
                    type="text"
                    placeholder="Search role or company..."
                    value={keyword}
                    onChange={(e) => handleChange(e, 'keyword')}
                    style={{ border: 'none', padding: '10px', width: '100%', outline: 'none', fontSize: '14px', fontFamily: 'var(--font-body)' }}
                />
            </div>

            <div style={{ flex: 1, minWidth: '120px' }}>
                <select value={location} onChange={(e) => handleChange(e, 'location')} style={selectStyle}>
                    <option value="">Location</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Noida">Noida</option>
                </select>
            </div>

            <div style={{ flex: 1, minWidth: '120px' }}>
                <select value={mode} onChange={(e) => handleChange(e, 'mode')} style={selectStyle}>
                    <option value="">Mode</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                </select>
            </div>

            <div style={{ flex: 1, minWidth: '120px' }}>
                <select value={experience} onChange={(e) => handleChange(e, 'experience')} style={selectStyle}>
                    <option value="">Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 Years">0-1 Years</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                </select>
            </div>

            <div style={{ flex: 1, minWidth: '120px' }}>
                <select value={source} onChange={(e) => handleChange(e, 'source')} style={selectStyle}>
                    <option value="">Source</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Indeed">Indeed</option>
                </select>
            </div>

            <div style={{ flex: 1, minWidth: '120px' }}>
                <select value={status} onChange={(e) => handleChange(e, 'status')} style={selectStyle}>
                    <option value="All">All Statuses</option>
                    <option value="Not Applied">Not Applied</option>
                    <option value="Applied">Applied</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Selected">Selected</option>
                </select>
            </div>

            <button onClick={clearFilters} style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#888',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '13px'
            }} title="Clear Filters">
                <X size={16} /> Clear
            </button>

        </div>
    );
};

const selectStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    fontSize: '14px',
    color: '#444',
    outline: 'none',
    cursor: 'pointer'
};

export default FilterBar;
