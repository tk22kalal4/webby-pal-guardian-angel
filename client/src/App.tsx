import React from 'react';
import { Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import LectureCompletion from './components/LectureCompletion';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="app-header">
          <nav className="navbar">
            <div className="nav-brand">
              <h1>LASTPULSE</h1>
            </div>
            <div className="nav-links">
              <a href="/">Home</a>
              <a href="/search">Search</a>
              <a href="/progress">Progress</a>
            </div>
          </nav>
        </header>
        
        <main className="app-main">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/progress" component={LectureCompletion} />
            <Route>
              <div className="not-found">
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;