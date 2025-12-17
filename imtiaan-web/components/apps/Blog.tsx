import { useState, useRef, useEffect } from "react";
import { FileText, ArrowRight, ArrowLeft } from "lucide-react";
import { BlogPost } from "@/lib/posts";
import ReactMarkdown from "react-markdown";

interface BlogProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPost && topRef.current) {
      // Use a small timeout to ensure the DOM is fully updated
      const timer = setTimeout(() => {
        // Find the scrollable parent container (the Window content div)
        let parent = topRef.current?.parentElement;
        while (parent) {
          const style = window.getComputedStyle(parent);
          if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
            parent.scrollTop = 0;
            break;
          }
          parent = parent.parentElement;
        }
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [selectedPost]);

  if (selectedPost) {
    return (
      <div className="h-full flex flex-col">
        <div ref={topRef} />
        <button 
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors w-fit group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all posts
        </button>

        <article className="prose prose-invert prose-emerald max-w-none">
          <h1 className="text-3xl font-bold text-white mb-2">{selectedPost.title}</h1>
          <div className="flex items-center gap-4 text-sm text-white/40 mb-8">
            <span>{selectedPost.date}</span>
            {selectedPost.category && (
              <>
                <span>•</span>
                <span className="text-emerald-400">{selectedPost.category}</span>
              </>
            )}
          </div>
          
          <div className="text-white/80 leading-relaxed">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-emerald-400 mt-8 mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-emerald-400 mt-8 mb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold text-emerald-300 mt-6 mb-3" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-white/90" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-4 space-y-1 text-white/80" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-1 text-white/80" {...props} />,
                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-emerald-500/50 pl-4 italic my-4 text-white/70 bg-white/5 py-2 rounded-r" {...props} />
                ),
                code: ({node, ...props}) => (
                  <code className="bg-black/50 px-1.5 py-0.5 rounded text-emerald-300 font-mono text-sm" {...props} />
                ),
                a: ({node, ...props}) => (
                  <a className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors" {...props} />
                ),
                strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
              }}
            >
              {selectedPost.content}
            </ReactMarkdown>
          </div>
        </article>
        
        <button 
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white mt-12 mb-6 transition-colors w-fit group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to all posts
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Thoughts & Insights</h1>
          <p className="text-white/60">Writing on Fintech, Blockchain, and the Future of Work.</p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-white/40 border border-dashed border-white/10 rounded-xl">
          <p>No posts found. Add markdown files to content/posts/</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div 
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group p-5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    {post.category && (
                      <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">{post.category}</span>
                    )}
                    <span className="text-white/40">{post.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-white/60 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="h-full flex items-center">
                  <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
