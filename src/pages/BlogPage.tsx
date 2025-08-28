import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WaveParallax from "../components/WaveParallax";
import BlogCard from "../components/BlogCard";
import SEO from "../components/SEO";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  published_at: string;
  url: string;
  reading_time_minutes: number;
  tag_list: string[];
  cover_image?: string;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Debug effect to log posts state changes
  useEffect(() => {
    console.log("Posts state updated:", posts.length, "posts");
    if (posts.length > 0) {
      console.log("First post:", posts[0]);
    }
  }, [posts]);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWaveAnimationComplete = () => {
    console.log("Wave animation completed");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchPosts = async (retryCount = 0) => {
      try {
        console.log(
          "Fetching blog posts from dev.to... (attempt",
          retryCount + 1,
          ")"
        );
        // Add timestamp to prevent caching
        const timestamp = new Date().getTime();
        const url = `https://dev.to/api/articles?username=arranstrange&_t=${timestamp}`;
        console.log("Fetching from URL:", url);

        const response = await fetch(url);
        console.log("Response status:", response.status);
        console.log(
          "Response headers:",
          Object.fromEntries(response.headers.entries())
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched posts:", data.length, "posts");
        console.log("Posts data:", data);
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        console.error("Error details:", {
          name: err instanceof Error ? err.name : "Unknown",
          message: err instanceof Error ? err.message : String(err),
          stack: err instanceof Error ? err.stack : "No stack trace",
        });

        // Retry once if it's the first attempt
        if (retryCount === 0) {
          console.log("Retrying fetch...");
          setTimeout(() => fetchPosts(1), 2000);
          return;
        }

        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        if (retryCount > 0 || !error) {
          setLoading(false);
        }
      }
    };

    fetchPosts();
  }, [error]);

  return (
    <>
      <SEO
        title="Blog"
        description="Thoughts on web development, design, and creative technology. Exploring the intersection of code and creativity."
        keywords="blog, web development, design, creative technology, React, TypeScript, development notes"
        type="website"
      />
      <div className="relative">
        {/* Wave Parallax Section */}
        <section className="h-screen relative">
          <WaveParallax onAnimationComplete={handleWaveAnimationComplete} />

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <motion.button
              onClick={() => {
                const blogSection = document.querySelector(
                  "#blog-posts-section"
                );
                if (blogSection) {
                  blogSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.5, // Delay to let wave animation settle
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center space-y-4 cursor-pointer group"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }} // Reduced movement for smoother animation
                transition={{
                  duration: 3, // Slower for smoother motion
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-warm-white/80 font-satoshi font-bold uppercase tracking-wider text-lg group-hover:text-warm-white transition-colors"
              >
                Blog
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }} // Reduced movement for smoother animation
                transition={{
                  duration: 3, // Slower for smoother motion
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="w-px h-12 bg-warm-white/40 mx-auto group-hover:bg-warm-white/60 transition-colors"
              />
            </motion.button>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section
          id="blog-posts-section"
          className="min-h-screen relative py-20"
        >
          <div className="max-w-6xl mx-auto px-6 w-full">
            {loading && (
              <div className="text-center text-warm-white/80 py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-white mx-auto mb-4"></div>
                <p>Loading posts...</p>
              </div>
            )}

            {error && (
              <div className="text-center text-red-400 py-20">
                <p>Error loading posts: {error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-warm-white/10 border border-warm-white/20 rounded hover:bg-warm-white/20 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && posts.length === 0 && (
              <div className="text-center text-warm-white/80 py-20">
                <p>No posts found.</p>
                <p className="text-sm mt-2">
                  This might be due to caching. Try refreshing the page.
                </p>
              </div>
            )}

            {!loading && !error && posts.length > 0 && (
              <>
                {/* Blog Posts Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                  {posts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </motion.div>

                {/* Bottom spacing for better scrolling experience */}
                <div className="h-20"></div>
              </>
            )}
          </div>
        </section>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: showScrollTop ? 1 : 0,
            scale: showScrollTop ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-warm-white/10 backdrop-blur-sm border border-warm-white/20 rounded-full hover:bg-warm-white/20 transition-all duration-300 cursor-pointer group"
          style={{ pointerEvents: showScrollTop ? "auto" : "none" }}
        >
          <svg
            className="w-6 h-6 text-warm-white group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      </div>
    </>
  );
};

export default BlogPage;
