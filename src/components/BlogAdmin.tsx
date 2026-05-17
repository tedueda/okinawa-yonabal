import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  image_url?: string;
  published: boolean;
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    author: 'Ocean View Ryukyu Tower',
    image_url: '',
    published: true
  });
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Supabaseからブログ投稿を取得
      // const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      
      // デモデータ（実際にはSupabaseから取得）
      const demoData: BlogPost[] = [
        {
          id: '1',
          title: '沖縄東海岸オーシャンビュー民泊で激安一人旅！釣りも楽しめる絶景スポット',
          content: '沖縄東海岸の絶景オーシャンビュー民泊をご紹介。一人旅でも激安価格で宿泊可能。釣りスポットも近く、斎場御嶽へのアクセスも抜群。与那原町の隠れ家的民泊で、プライベートな時間をお過ごしください。海を眺めながらの朝食は格別です。',
          author: 'Ocean View Ryukyu Tower',
          created_at: '2026-04-29T10:00:00Z',
          image_url: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
          published: true
        },
        {
          id: '2',
          title: '斎場御嶽観光の拠点に最適！沖縄南部の激安オーシャンビュー民泊',
          content: '世界遺産・斎場御嶽へ車で15分。沖縄南部観光の拠点として最適な民泊施設です。東海岸の美しいオーシャンビューを独り占め。一人旅から家族旅行まで、激安価格でご提供。釣り好きにもおすすめの立地です。',
          author: 'Ocean View Ryukyu Tower',
          created_at: '2026-04-25T14:30:00Z',
          image_url: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
          published: true
        }
      ];
      
      setPosts(demoData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (!editingPost.title || !editingPost.content) {
        alert('タイトルと本文は必須です');
        return;
      }

      if (editingPost.id) {
        // 更新
        // await updateBlogPost(editingPost.id, editingPost);
        setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...editingPost } as BlogPost : p));
        alert('記事を更新しました');
      } else {
        // 新規作成
        const newPost: BlogPost = {
          ...editingPost,
          id: Date.now().toString(),
          created_at: new Date().toISOString()
        } as BlogPost;
        // await createBlogPost(newPost);
        setPosts([newPost, ...posts]);
        alert('記事を作成しました');
      }

      setIsEditing(false);
      setEditingPost({
        title: '',
        content: '',
        author: 'Ocean View Ryukyu Tower',
        image_url: '',
        published: true
      });
    } catch (error) {
      console.error('Error saving post:', error);
      alert('保存に失敗しました');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('本当に削除しますか？')) return;

    try {
      // await deleteBlogPost(id);
      setPosts(posts.filter(p => p.id !== id));
      alert('記事を削除しました');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('削除に失敗しました');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingPost({
      title: '',
      content: '',
      author: 'Ocean View Ryukyu Tower',
      image_url: '',
      published: true
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light tracking-wider">ブログ管理</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
            >
              <Plus size={20} />
              新規記事作成
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-medium mb-6">
              {editingPost.id ? '記事を編集' : '新規記事作成'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タイトル *
                </label>
                <input
                  type="text"
                  value={editingPost.title || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="記事のタイトル"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  本文 *
                </label>
                <textarea
                  value={editingPost.content || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  rows={10}
                  placeholder="記事の本文"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  著者
                </label>
                <input
                  type="text"
                  value={editingPost.author || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="著者名"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  画像URL
                </label>
                <input
                  type="url"
                  value={editingPost.image_url || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={editingPost.published || false}
                  onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                  className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                />
                <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                  公開する
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  <Save size={20} />
                  保存
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X size={20} />
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>著者: {post.author}</span>
                      <span>
                        {new Date(post.created_at).toLocaleDateString('ja-JP')}
                      </span>
                      <span className={post.published ? 'text-green-600' : 'text-red-600'}>
                        {post.published ? '公開中' : '非公開'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="編集"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="削除"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {posts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                まだ記事がありません
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
