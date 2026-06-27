import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Wand2, Upload, Loader } from 'lucide-react';
import { generateBlogPost } from '../lib/openai';
import { supabase, createBlogPost, updateBlogPost, deleteBlogPost } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  image_url?: string;
  published: boolean;
}

export default function BlogAdminNew() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    author: 'Ocean View Ryukyu Tower',
    image_url: '',
    published: true
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Supabaseから全ての記事を取得（公開・非公開含む）
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  const handleGenerateContent = async () => {
    if (!editingPost.title) {
      alert('タイトルを入力してください');
      return;
    }

    setIsGenerating(true);
    try {
      const content = await generateBlogPost(editingPost.title);
      setEditingPost({ ...editingPost, content });
      alert('ブログ記事を生成しました！内容を確認して、必要に応じて編集してください。');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '不明なエラー';
      alert(`記事の生成に失敗しました: ${errorMessage}`);
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      // ファイル名を一意にする
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      // Supabase Storageにアップロード
      const { error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      // 公開URLを取得
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('画像のアップロードに失敗しました');
    }
  };

  const handleSave = async () => {
    try {
      if (!editingPost.title || !editingPost.content) {
        alert('タイトルと本文は必須です');
        return;
      }

      let imageUrl = editingPost.image_url || '';
      
      // 画像がアップロードされている場合
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      if (editingPost.id) {
        // 更新
        const postToUpdate = {
          title: editingPost.title,
          content: editingPost.content,
          author: editingPost.author || 'Ocean View Ryukyu Tower',
          image_url: imageUrl,
          published: editingPost.published !== undefined ? editingPost.published : true,
          created_at: editingPost.created_at
        };
        await updateBlogPost(editingPost.id, postToUpdate);
        alert('記事を更新しました');
      } else {
        // 新規作成（created_atは含めない - Supabaseが自動設定）
        const postToCreate = {
          title: editingPost.title,
          content: editingPost.content,
          author: editingPost.author || 'Ocean View Ryukyu Tower',
          image_url: imageUrl,
          published: editingPost.published !== undefined ? editingPost.published : true
        };
        await createBlogPost(postToCreate);
        alert('記事を作成しました');
      }

      // 記事リストを再取得
      await fetchPosts();
      handleCancel();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('保存に失敗しました: ' + (error as Error).message);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setImagePreview(post.image_url || '');
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('本当に削除しますか？')) return;

    try {
      await deleteBlogPost(id);
      alert('記事を削除しました');
      // 記事リストを再取得
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('削除に失敗しました: ' + (error as Error).message);
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
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light tracking-wider">ブログ管理（AI生成機能付き）</h1>
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
              {editingPost.id ? '記事を編集' : '新規記事作成（AI生成）'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タイトル *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingPost.title || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="例: 沖縄東海岸の絶景スポット紹介"
                    required
                  />
                  <button
                    onClick={handleGenerateContent}
                    disabled={isGenerating || !editingPost.title}
                    className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <Loader size={20} className="animate-spin" />
                        生成中...
                      </>
                    ) : (
                      <>
                        <Wand2 size={20} />
                        AI生成
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  タイトルを入力して「AI生成」ボタンを押すと、ChatGPTが1000文字のブログ記事を自動生成します
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  画像アップロード
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                    <Upload size={20} />
                    画像を選択
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="プレビュー"
                        className="h-20 w-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview('');
                          setEditingPost({ ...editingPost, image_url: '' });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  ファイルサイズ: 5MB以下推奨
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  本文 * {editingPost.content && `(${editingPost.content.length}文字)`}
                </label>
                <textarea
                  value={editingPost.content || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  rows={15}
                  placeholder="AI生成ボタンで自動生成、または手動で入力"
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
                  公開日時
                </label>
                <input
                  type="datetime-local"
                  value={
                    editingPost.created_at
                      ? new Date(editingPost.created_at).toISOString().slice(0, 16)
                      : new Date().toISOString().slice(0, 16)
                  }
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setEditingPost({ ...editingPost, created_at: date.toISOString() });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  記事の公開日時を設定できます（デフォルト: 現在日時）
                </p>
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
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors disabled:bg-gray-400"
                >
                  <Save size={20} />
                  公開
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
                <div className="flex gap-4">
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>著者: {post.author}</span>
                      <span>
                        {new Date(post.created_at).toLocaleString('ja-JP', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span className={post.published ? 'text-green-600' : 'text-red-600'}>
                        {post.published ? '公開中' : '非公開'}
                      </span>
                      <span className="text-blue-600">{post.content.length}文字</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
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
