import { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import SEO from './SEO';
import { supabase } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  image_url?: string;
  published: boolean;
}

interface BlogPostProps {
  postId: string;
  onBack: () => void;
}

export default function BlogPost({ postId, onBack }: BlogPostProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .eq('published', true)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } else {
        setPost(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setPost(null);
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-8"
          >
            <ArrowLeft size={20} />
            ブログ一覧に戻る
          </button>
          <div className="text-center py-12">
            <p className="text-gray-500">記事が見つかりませんでした</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white py-12">
      <SEO
        title={`${post.title} | Ocean View Ryukyu Tower`}
        description={post.content.substring(0, 160)}
        type="article"
      />

      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          ブログ一覧に戻る
        </button>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {post.image_url && (
            <div className="w-full h-96 overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>
          </div>
        </article>

        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            <ArrowLeft size={20} />
            ブログ一覧に戻る
          </button>
        </div>
      </div>
    </div>
  );
}
