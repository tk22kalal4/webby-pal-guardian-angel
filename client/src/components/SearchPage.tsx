import React, { useState, useEffect } from 'react';
import './SearchPage.css';

interface Teacher {
  name: string;
  subject: string;
  platform: string;
}

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredResults, setFilteredResults] = useState<Teacher[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const platforms = ['marrow', 'dams', 'prepladder'];
  const subjects = ['anatomy', 'physiology'];

  useEffect(() => {
    // Mock data for now - in a real app, this would come from the API
    const mockTeachers: Teacher[] = [
      { name: 'Dr. Smith', subject: 'anatomy', platform: 'Marrow' },
      { name: 'Prof. Johnson', subject: 'physiology', platform: 'DAMS' },
      { name: 'Dr. Brown', subject: 'anatomy', platform: 'Prepladder' },
      { name: 'Dr. Wilson', subject: 'physiology', platform: 'Marrow' },
    ];
    setTeachers(mockTeachers);
    setFilteredResults(mockTeachers);
  }, []);

  useEffect(() => {
    let filtered = teachers;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.platform.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by platform
    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(teacher =>
        teacher.platform.toLowerCase() === selectedPlatform
      );
    }

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(teacher =>
        teacher.subject.toLowerCase() === selectedSubject
      );
    }

    setFilteredResults(filtered);
  }, [searchTerm, selectedPlatform, selectedSubject, teachers]);

  return (
    <div className="search-page">
      <div className="search-header">
        <h2>Search Content</h2>
        <p>Find lectures, teachers, and subjects across all platforms</p>
      </div>

      <div className="search-controls">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Search for teachers, subjects, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>

        <div className="filters">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Platforms</option>
            {platforms.map(platform => (
              <option key={platform} value={platform}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="search-results">
        <div className="results-header">
          <h3>Results ({filteredResults.length})</h3>
        </div>

        <div className="results-grid">
          {filteredResults.length > 0 ? (
            filteredResults.map((teacher, index) => (
              <div key={index} className="result-card">
                <div className="result-header">
                  <h4>{teacher.name}</h4>
                  <span className="platform-badge">{teacher.platform}</span>
                </div>
                <p className="subject">{teacher.subject.charAt(0).toUpperCase() + teacher.subject.slice(1)}</p>
                <button className="view-lectures-btn">
                  <i className="fas fa-play"></i>
                  View Lectures
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No results found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;