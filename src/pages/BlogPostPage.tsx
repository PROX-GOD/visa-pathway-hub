import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock, ArrowLeft, Share, ThumbsUp, Loader2, ArrowRight } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
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
  author: string;
  author_avatar_url: string;
  content: string;
  likes: number;
  views: number;
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug);
    }
  }, [slug]);

  const fetchBlogPost = async (slug: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching blog post:', error);
        setNotFound(true);
      }

      if (data) {
        setBlogPost(data);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28">
        {isLoading ? (
          <section className="py-24">
            <div className="container-custom mx-auto text-center">
              <Loader2 className="animate-spin text-visa-blue mr-2 inline-block" size={24} />
              <p className="text-gray-600">Loading blog post...</p>
            </div>
          </section>
        ) : blogPost ? (
          <>
            <section className="py-16 bg-gradient-to-br from-visa-light via-white to-blue-50">
              <div className="container-custom mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <Link to="/blog" className="text-visa-blue hover:underline flex items-center">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Blog
                  </Link>
                  
                  <Button variant="outline" size="icon">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
                
                <h1 className="text-4xl font-serif font-bold text-visa-navy mb-6">
                  {blogPost.title}
                </h1>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <div className="flex items-center mr-4">
                    <User className="mr-2 h-5 w-5 text-visa-blue" />
                    <span className="font-medium">{blogPost.author}</span>
                  </div>
                  
                  <div className="flex items-center mr-4">
                    <Calendar className="mr-2 h-5 w-5 text-visa-blue" />
                    <span>{formatDate(blogPost.created_at)}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-visa-blue" />
                    <span>{formatTime(blogPost.created_at)}</span>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="py-16">
              <div className="container-custom mx-auto">
                <div className="prose prose-lg max-w-none">
                  {blogPost.content}
                </div>
                
                <div className="mt-12 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="gap-2">
                      <ThumbsUp size={16} />
                      Like
                    </Button>
                    <span className="text-gray-500">{blogPost.likes} Likes</span>
                  </div>
                  
                  <span className="text-gray-500">{blogPost.views} Views</span>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="py-24">
            <div className="container-custom mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-visa-navy mb-4">
                Blog Post Not Found
              </h2>
              <p className="text-gray-600">
                The blog post you are looking for does not exist.
              </p>
              <Link to="/blog" className="text-visa-blue hover:underline flex items-center justify-center mt-6">
                <ArrowRight size={16} className="mr-2" />
                Back to Blog
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
