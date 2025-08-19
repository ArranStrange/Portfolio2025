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

  const handleWaveAnimationComplete = () => {
    console.log("Wave animation completed");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://dev.to/api/articles?username=arranstrange"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
              const blogSection = document.querySelector("#blog-posts-section");
              if (blogSection) {
                blogSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-center space-y-4 cursor-pointer group"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-warm-white/80 font-satoshi font-bold uppercase tracking-wider text-lg group-hover:text-warm-white transition-colors"
            >
              Blog
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
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
        className="h-screen relative flex items-center justify-center"
      >
        <div className="max-w-6xl mx-auto px-6 w-full max-h-full overflow-y-auto">
          {loading && (
            <div className="text-center text-warm-white/80 py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-white mx-auto mb-4"></div>
              <p>Loading posts...</p>
            </div>
          )}

          {error && (
            <div className="text-center text-red-400 py-20">
              <p>Error loading posts: {error}</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center text-warm-white/80 py-20">
              <p>No posts found.</p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
              {posts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
    </>
  );
};

export default BlogPage;
