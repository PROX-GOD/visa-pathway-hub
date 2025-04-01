import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://mpckiisrkczpdnyzpqpm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wY2tpaXNya2N6cGRueXpwcXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MzQwMjEsImV4cCI6MjAzMDQxMDAyMX0.ZBWcdHw1t0P4j4r0sqFxaj_aiGYAgse5FZE3MIobN8Q';
const supabase = createClient(supabaseUrl, supabaseKey);

type BlogPost = {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  author_avatar_url: string;
  tags: string[];
  likes: number;
};

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBlogPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28">
        <section className="py-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
          <div className="container-custom mx-auto">
            <h1 className="text-4xl font-serif font-bold text-visa-navy mb-6">
              The <span className="text-visa-blue">Spring/Fall USA</span> Blog
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Stay up-to-date with the latest news, tips, and stories related to the F-1 visa process
              and studying in the United States.
            </p>
            
            <div className="mt-8 max-w-lg">
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-full shadow-sm focus:ring-visa-blue focus:border-visa-blue"
              />
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-custom mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-visa-blue mr-2" size={24} />
                <span className="text-gray-600">Loading blog posts...</span>
              </div>
            ) : filteredBlogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-visa-navy mb-2">{post.title}</h2>
                      <div className="flex items-center text-gray-600 text-sm mb-4">
                        <Calendar className="mr-2" size={16} />
                        <span>{formatDate(post.created_at)}</span>
                        <span className="mx-2">&middot;</span>
                        <User className="mr-2" size={16} />
                        <span>{post.author}</span>
                      </div>
                      <p className="text-gray-700 line-clamp-3 mb-4">{post.content}</p>
                      <Link to={`/blog/${post.slug}`}>
                        <Button className="bg-visa-blue hover:bg-visa-navy text-white">
                          Read More
                          <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <Search className="mx-auto text-gray-400" size={48} />
                <h3 className="text-xl font-medium text-visa-navy mt-4">No blog posts found</h3>
                <p className="text-gray-600 mt-2">
                  Try adjusting your search query or check back later for new content.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
