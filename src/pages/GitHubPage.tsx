import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

const GitHubPage: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/arranstrange/repos?sort=updated&per_page=100"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        // Filter out forked repositories and sort by stars
        const filteredRepos = data
          .filter((repo: GitHubRepo) => !repo.fork)
          .sort(
            (a: GitHubRepo, b: GitHubRepo) =>
              b.stargazers_count - a.stargazers_count
          );
        setRepos(filteredRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Python: "#3572A5",
      React: "#61dafb",
      "React Native": "#61dafb",
      HTML: "#e34c26",
      CSS: "#563d7c",
      SCSS: "#cf649a",
      "C#": "#178600",
      Java: "#b07219",
      PHP: "#4F5D95",
      Ruby: "#701516",
      Go: "#00ADD8",
      Rust: "#dea584",
      Swift: "#ffac45",
      Kotlin: "#F18E33",
      Vue: "#4fc08d",
      Angular: "#dd0031",
      Node: "#339933",
    };
    return colors[language || ""] || "#586069";
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-satoshi font-light text-warm-white mb-6">
            GitHub
          </h1>
          <p className="text-xl text-warm-white/80 font-light max-w-2xl mx-auto">
            Explore my open-source projects and contributions
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-white mx-auto mb-4"></div>
            <p className="text-warm-white/80">Loading repositories...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">
              Error loading repositories: {error}
            </p>
            <p className="text-warm-white/60">
              Please check your internet connection and try again.
            </p>
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  size="sm"
                  variant="default"
                  className="h-full hover:scale-105 transition-transform duration-300"
                >
                  <div className="p-4 h-full flex flex-col">
                    {/* Repository Header */}
                    <div className="mb-3">
                      <h3 className="text-lg font-satoshi font-medium text-warm-white mb-1">
                        {repo.name}
                      </h3>
                      {repo.description && (
                        <p className="text-warm-white/70 text-xs leading-relaxed mb-3">
                          {repo.description}
                        </p>
                      )}
                    </div>

                    {/* Language */}
                    <div className="flex items-center mb-3">
                      {repo.language && (
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: getLanguageColor(repo.language),
                            }}
                          ></div>
                          <span className="text-warm-white/60 text-xs font-satoshi">
                            {repo.language}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Topics */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {repo.topics.slice(0, 2).map((topic) => (
                          <span
                            key={topic}
                            className="px-1.5 py-0.5 bg-warm-white/10 text-warm-white/80 text-xs rounded-full font-satoshi"
                          >
                            {topic}
                          </span>
                        ))}
                        {repo.topics.length > 2 && (
                          <span className="px-1.5 py-0.5 bg-warm-white/10 text-warm-white/60 text-xs rounded-full font-satoshi">
                            +{repo.topics.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Updated Date */}
                    <div className="text-warm-white/50 text-xs font-satoshi mb-3">
                      Updated {formatDate(repo.updated_at)}
                    </div>

                    {/* View Repository Button */}
                    <div className="mt-auto">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full text-center px-3 py-1.5 border border-warm-white/20 rounded-lg text-warm-white hover:bg-warm-white/5 transition-colors font-satoshi text-xs"
                      >
                        View Repository
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && repos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-warm-white/80">No repositories found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubPage;
