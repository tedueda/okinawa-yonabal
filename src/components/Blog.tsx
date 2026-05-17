import { useState, useEffect } from 'react';
import { Calendar, User } from 'lucide-react';
import SEO from './SEO';
import { getBlogPosts } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  image_url?: string;
  published: boolean;
}

interface BlogProps {
  onPostClick?: (postId: string) => void;
}

export default function Blog({ onPostClick }: BlogProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Supabaseから公開済みの記事を取得
      const data = await getBlogPosts();
      setPosts(data as BlogPost[]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
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
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <SEO 
        title="沖縄オーシャンビュー民泊ブログ | 東海岸・斎場御嶽・釣り・一人旅情報"
        description="沖縄東海岸のオーシャンビュー民泊、斎場御嶽観光、釣りスポット、激安一人旅の情報をお届け。与那原町の絶景民泊で最高の沖縄体験を。"
        keywords={['沖縄', 'オーシャンビュー', '釣り', '東海岸', '斎場御嶽', '激安', '一人旅', '民泊', '与那原', '沖縄観光', '沖縄旅行']}
      />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-wider mb-4">沖縄オーシャンビュー民泊ブログ</h1>
          <p className="text-gray-600">東海岸の絶景、斎場御嶽観光、釣り情報、激安一人旅のヒントをお届けします</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => onPostClick && onPostClick(post.id)}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            >
              {post.image_url && (
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-xl font-medium mb-3 text-gray-800 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">まだ投稿がありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
