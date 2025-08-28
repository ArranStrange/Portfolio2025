import React from "react";
import { motion } from "framer-motion";

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

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer group h-full flex flex-col"
      onClick={() => window.open(post.url, "_blank")}
    >
      {/* Cover Image */}
      {post.cover_image && (
        <div className="mb-4 overflow-hidden rounded-md flex-shrink-0">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="space-y-3 flex-1 flex flex-col">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 flex-shrink-0">
          {post.tag_list.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 border border-warm-white/20 text-warm-white/80 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold text-warm-white group-hover:text-white transition-colors duration-300 overflow-hidden flex-shrink-0"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {post.title}
        </h3>

        {/* Description */}
        <p
          className="text-warm-white/80 text-sm leading-relaxed overflow-hidden flex-1"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {post.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-warm-white/60 text-xs pt-2 border-t border-white/10 flex-shrink-0">
          <span>{formatDate(post.published_at)}</span>
          <span>{post.reading_time_minutes} min read</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
