// Create a new file: src/components/GitHubActivity.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Github, 
  GitBranch, 
  GitCommit, 
  Star, 
  GitFork, 
  Calendar,
  Activity,
  ExternalLink,
  Code,
  Users,
  Clock
} from 'lucide-react';

const GitHubActivity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [githubData, setGithubData] = useState({
    user: null,
    repos: [],
    commits: [],
    stats: {
      totalRepos: 0,
      totalStars: 0,
      totalCommits: 0,
      followers: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your GitHub username
  const GITHUB_USERNAME = 'Rajukrsna';

  useEffect(() => {
    fetchGitHubData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchGitHubData, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchGitHubData = async () => {
  try {
    setLoading(true);
    setError(null);
    
    console.log('Fetching GitHub data for:', GITHUB_USERNAME);
    
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    console.log('User response status:', userResponse.status);
    
    if (!userResponse.ok) {
      throw new Error(`GitHub API returned ${userResponse.status}: ${userResponse.statusText}`);
    }
    
    const userData = await userResponse.json();
    console.log('User data:', userData);
    
    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    console.log('Repos response status:', reposResponse.status);
    
    if (!reposResponse.ok) {
      throw new Error(`Repos API returned ${reposResponse.status}: ${reposResponse.statusText}`);
    }
    
    const reposData = await reposResponse.json();
    console.log('Repos data:', reposData);
    
    // Fetch recent commits from top repos (with better error handling)
    const commitsPromises = reposData.slice(0, 3).map(async repo => {
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=3`);
        if (response.ok) {
          const commits = await response.json();
          return { repo: repo.name, commits };
        } else {
          console.warn(`Failed to fetch commits for ${repo.name}:`, response.status);
          return { repo: repo.name, commits: [] };
        }
      } catch (err) {
        console.warn(`Error fetching commits for ${repo.name}:`, err);
        return { repo: repo.name, commits: [] };
      }
    });
    
    const commitsData = await Promise.all(commitsPromises);
    const allCommits = commitsData.flatMap(({ repo, commits }) => 
      commits.map(commit => ({ ...commit, repo }))
    ).slice(0, 8);

    // Calculate stats
    const stats = {
      totalRepos: userData.public_repos || 0,
      totalStars: reposData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0),
      totalCommits: allCommits.length,
      followers: userData.followers || 0
    };

    setGithubData({
      user: userData,
      repos: reposData,
      commits: allCommits,
      stats
    });
    
    setLoading(false);
  } catch (err) {
    console.error('GitHub API Error:', err);
    setError(`Failed to fetch GitHub data: ${err.message}`);
    setLoading(false);
  }
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <section className="section-padding gradient-bg" ref={ref}>
        <div className="container-custom">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Github className="w-12 h-12 text-primary-600" />
            </motion.div>
            <p className="mt-4 text-secondary-600">Loading GitHub activity...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding gradient-bg" ref={ref}>
        <div className="container-custom">
          <div className="text-center">
            <Github className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-secondary-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding gradient-bg" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
            GitHub <span className="text-gradient">Activity</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Real-time overview of my development activity and contributions
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Repositories', value: githubData.stats.totalRepos, icon: Github, color: 'text-blue-600' },
            { label: 'Total Stars', value: githubData.stats.totalStars, icon: Star, color: 'text-yellow-600' },
            { label: 'Followers', value: githubData.stats.followers, icon: Users, color: 'text-green-600' },
            { label: 'Recent Commits', value: githubData.commits.length, icon: GitCommit, color: 'text-purple-600' }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="card p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <IconComponent className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-secondary-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-secondary-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Recent Repositories */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Github className="w-6 h-6 text-primary-600 mr-3" />
              <h3 className="text-2xl font-semibold text-secondary-800">
                Recent Repositories
              </h3>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {githubData.repos.slice(0, 4).map((repo, index) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-secondary-800 group-hover:text-primary-600 transition-colors">
                        {repo.name}
                      </h4>
                      <motion.a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="text-secondary-400 hover:text-primary-600"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                    
                    {repo.description && (
                      <p className="text-sm text-secondary-600 mb-3">
                        {truncateText(repo.description, 100)}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-secondary-500">
                      <div className="flex items-center space-x-4">
                        {repo.language && (
                          <div className="flex items-center space-x-1">
                            <Code className="w-3 h-3" />
                            <span>{repo.language}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="w-3 h-3" />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(repo.updated_at)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Recent Commits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="card p-6"
          >
            <div className="flex items-center mb-6">
              <Activity className="w-6 h-6 text-primary-600 mr-3" />
              <h3 className="text-2xl font-semibold text-secondary-800">
                Recent Commits
              </h3>
            </div>
            <div className="h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-secondary-100 hover:scrollbar-thumb-primary-400">
              <div className="space-y-4">
                <AnimatePresence>
                  {githubData.commits.map((commit, index) => (
                    <motion.div
                      key={`${commit.sha}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0">
                      <GitCommit className="w-4 h-4 text-primary-600 mt-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-secondary-800 mb-1">
                        {truncateText(commit.commit.message, 60)}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-secondary-500">
                        <span className="font-medium">{commit.repo}</span>
                        <span>•</span>
                        <span>{formatDate(commit.commit.author.date)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            </div>
          </motion.div>
        </div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Github className="w-5 h-5" />
            <span>View Full Profile</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;