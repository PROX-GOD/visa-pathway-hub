
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ThumbsUp, Trophy, Clock, Loader2, Info, ArrowRight } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@/components/auth/AuthProvider';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Initialize Supabase client
const supabaseUrl = 'https://mpckiisrkczpdnyzpqpm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wY2tpaXNya2N6cGRueXpwcXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MzQwMjEsImV4cCI6MjAzMDQxMDAyMX0.ZBWcdHw1t0P4j4r0sqFxaj_aiGYAgse5FZE3MIobN8Q';
const supabase = createClient(supabaseUrl, supabaseKey);

type Candidate = {
  id: string;
  name: string;
  bio: string;
  image_url: string;
  votes_count: number;
  user_id: string;
  election_id: string;
};

type Election = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'upcoming' | 'active' | 'completed';
};

const AdminElectionPage = () => {
  const { user } = useAuth();
  const [elections, setElections] = useState<Election[]>([]);
  const [activeElection, setActiveElection] = useState<Election | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    fetchElections();
  }, []);

  useEffect(() => {
    if (activeElection) {
      fetchCandidates(activeElection.id);
      checkUserVote(activeElection.id);
      
      if (activeElection.status === 'active') {
        const interval = setInterval(() => {
          updateTimeRemaining(activeElection.end_date);
        }, 1000);
        
        return () => clearInterval(interval);
      }
    }
  }, [activeElection, user]);

  const fetchElections = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('elections')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) {
        throw error;
      }

      // Add mock elections if none exist
      const electionsData = data && data.length > 0 
        ? data 
        : [
            {
              id: '1',
              title: 'Spring/Fall USA Admin Elections 2025',
              description: 'Vote for the next group of administrators who will guide our community and help students with their F-1 visa journey.',
              start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
              end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
              status: 'active' as const
            }
          ];
      
      setElections(electionsData);
      
      // Set the active election (most recent active or upcoming)
      const active = electionsData.find(e => e.status === 'active');
      const upcoming = electionsData.find(e => e.status === 'upcoming');
      setActiveElection(active || upcoming || electionsData[0]);
    } catch (error) {
      console.error('Error fetching elections:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCandidates = async (electionId: string) => {
    try {
      // Use the existing candidates if using mock data
      if (electionId === '1') {
        const mockCandidates = [
          {
            id: '1',
            name: 'Sarah Johnson',
            bio: 'International student advisor with 5+ years of experience. Passionate about helping students navigate the visa process.',
            image_url: 'https://i.pravatar.cc/150?u=sarah',
            votes_count: 145,
            user_id: '1',
            election_id: '1'
          },
          {
            id: '2',
            name: 'Michael Rodriguez',
            bio: 'Former F-1 student, now working as an immigration consultant. Wants to make the visa process more transparent and accessible.',
            image_url: 'https://i.pravatar.cc/150?u=michael',
            votes_count: 132,
            user_id: '2',
            election_id: '1'
          },
          {
            id: '3',
            name: 'Priya Patel',
            bio: 'Graduate student with a passion for community building. Aims to expand our support network and create more resources.',
            image_url: 'https://i.pravatar.cc/150?u=priya',
            votes_count: 127,
            user_id: '3',
            election_id: '1'
          },
          {
            id: '4',
            name: 'David Kim',
            bio: 'Education technology specialist focused on creating digital tools to simplify the visa application process.',
            image_url: 'https://i.pravatar.cc/150?u=david',
            votes_count: 98,
            user_id: '4',
            election_id: '1'
          }
        ];
        setCandidates(mockCandidates);
        return;
      }

      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('election_id', electionId)
        .order('votes_count', { ascending: false });

      if (error) {
        throw error;
      }

      setCandidates(data || []);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const checkUserVote = async (electionId: string) => {
    if (!user) {
      setHasVoted(false);
      setVotedFor(null);
      return;
    }

    try {
      // For mock data
      if (electionId === '1') {
        setHasVoted(false);
        setVotedFor(null);
        return;
      }

      const { data, error } = await supabase
        .from('votes')
        .select('candidate_id')
        .eq('user_id', user.id)
        .eq('election_id', electionId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows found
          setHasVoted(false);
          setVotedFor(null);
        } else {
          throw error;
        }
      } else {
        setHasVoted(true);
        setVotedFor(data.candidate_id);
      }
    } catch (error) {
      console.error('Error checking user vote:', error);
      setHasVoted(false);
      setVotedFor(null);
    }
  };

  const updateTimeRemaining = (endDateStr: string) => {
    const endDate = new Date(endDateStr);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeRemaining('Voting has ended');
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };

  const handleVote = async (candidateId: string) => {
    if (!user) {
      toast.error('You must be logged in to vote');
      return;
    }
    
    if (hasVoted) {
      toast.error('You have already voted in this election');
      return;
    }

    if (!activeElection) {
      toast.error('No active election found');
      return;
    }

    setIsVoting(true);

    try {
      // For mock data
      if (activeElection.id === '1') {
        // Update the UI optimistically
        setCandidates(
          candidates.map(candidate => 
            candidate.id === candidateId 
              ? { ...candidate, votes_count: candidate.votes_count + 1 } 
              : candidate
          )
        );
        setHasVoted(true);
        setVotedFor(candidateId);
        toast.success('Your vote has been recorded!');
        setIsVoting(false);
        return;
      }

      // Insert the vote
      const { error } = await supabase
        .from('votes')
        .insert([
          { 
            user_id: user.id, 
            candidate_id: candidateId, 
            election_id: activeElection.id,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      // Update the votes count for the candidate
      const { error: updateError } = await supabase.rpc('increment_votes', {
        candidate_id: candidateId
      });

      if (updateError) throw updateError;

      // Update local state
      setCandidates(
        candidates.map(candidate => 
          candidate.id === candidateId 
            ? { ...candidate, votes_count: candidate.votes_count + 1 } 
            : candidate
        )
      );
      
      setHasVoted(true);
      setVotedFor(candidateId);
      toast.success('Your vote has been recorded!');
    } catch (error: any) {
      console.error('Error voting:', error);
      toast.error(`Failed to record your vote: ${error.message}`);
    } finally {
      setIsVoting(false);
    }
  };

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
              Admin <span className="text-visa-blue">Elections 2025</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mb-6">
              Vote for the next group of administrators who will guide our community and help students 
              with their F-1 visa journey.
            </p>

            {activeElection && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 max-w-3xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-medium text-visa-navy">{activeElection.title}</h2>
                    <p className="text-gray-500 text-sm">
                      {formatDate(activeElection.start_date)} - {formatDate(activeElection.end_date)}
                    </p>
                  </div>
                  
                  {activeElection.status === 'active' && (
                    <div className="bg-visa-blue bg-opacity-10 px-4 py-2 rounded-full flex items-center">
                      <Clock size={18} className="text-visa-blue mr-2" />
                      <span className="text-visa-blue font-medium">{timeRemaining}</span>
                    </div>
                  )}
                </div>
                
                {activeElection.status === 'upcoming' && (
                  <div className="mt-4 bg-amber-50 text-amber-800 p-4 rounded-md flex items-start">
                    <Info size={20} className="mr-2 flex-shrink-0" />
                    <p>
                      This election hasn't started yet. Voting will begin on {formatDate(activeElection.start_date)}.
                    </p>
                  </div>
                )}
                
                {activeElection.status === 'completed' && (
                  <div className="mt-4 bg-blue-50 text-blue-800 p-4 rounded-md flex items-start">
                    <Trophy size={20} className="mr-2 flex-shrink-0" />
                    <p>
                      This election has ended. Results have been finalized and the winners announced.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-custom mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-visa-blue mr-2" size={24} />
                <span className="text-gray-600">Loading candidates...</span>
              </div>
            ) : candidates.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif font-bold text-visa-navy">
                    {activeElection?.status === 'completed' ? 'Election Results' : 'Candidates'}
                  </h2>
                  
                  {hasVoted && activeElection?.status === 'active' && (
                    <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full flex items-center">
                      <ThumbsUp size={18} className="mr-2" />
                      <span>You have voted</span>
                    </div>
                  )}
                </div>
                
                {!user && activeElection?.status === 'active' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start">
                      <Info size={20} className="text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-amber-800">
                        You must be logged in to vote in this election.
                      </p>
                    </div>
                    <Link to="/login" className="shrink-0">
                      <Button className="bg-visa-blue hover:bg-visa-navy text-white">
                        Log in to Vote
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {candidates.map((candidate) => {
                    const isSelectedCandidate = votedFor === candidate.id;
                    const totalVotes = candidates.reduce((sum, c) => sum + c.votes_count, 0);
                    const votePercentage = totalVotes > 0 
                      ? Math.round((candidate.votes_count / totalVotes) * 100) 
                      : 0;
                    
                    return (
                      <div 
                        key={candidate.id} 
                        className={`bg-white rounded-xl shadow-sm border ${
                          isSelectedCandidate ? 'border-visa-blue ring-2 ring-visa-blue/20' : 'border-gray-100'
                        } overflow-hidden hover:shadow-md transition-shadow`}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img 
                            src={candidate.image_url} 
                            alt={candidate.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-visa-navy mb-2">{candidate.name}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">{candidate.bio}</p>
                          
                          {activeElection?.status === 'active' ? (
                            <div className="space-y-4">
                              {(hasVoted || activeElection.status !== 'active') && (
                                <div className="bg-gray-100 rounded-full h-2 mb-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      isSelectedCandidate ? 'bg-visa-blue' : 'bg-gray-300'
                                    }`}
                                    style={{ width: `${votePercentage}%` }}
                                  ></div>
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <span className="text-gray-500 font-medium">
                                  {candidate.votes_count} votes
                                  {hasVoted && ` (${votePercentage}%)`}
                                </span>
                                
                                {activeElection.status === 'active' && !hasVoted && (
                                  <Button 
                                    onClick={() => handleVote(candidate.id)} 
                                    disabled={isVoting}
                                    className={`${
                                      isVoting ? 'bg-gray-300' : 'bg-visa-blue hover:bg-visa-navy'
                                    } text-white`}
                                  >
                                    {isVoting ? (
                                      <>
                                        <Loader2 size={16} className="mr-2 animate-spin" />
                                        Voting...
                                      </>
                                    ) : (
                                      <>
                                        <ThumbsUp size={16} className="mr-2" />
                                        Vote
                                      </>
                                    )}
                                  </Button>
                                )}
                                
                                {activeElection.status === 'active' && hasVoted && (
                                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                    isSelectedCandidate 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-gray-100 text-gray-500'
                                  }`}>
                                    {isSelectedCandidate ? 'Your vote' : ''}
                                  </span>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="bg-gray-100 rounded-full h-2 mb-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    activeElection?.status === 'completed' && candidate === candidates[0]
                                      ? 'bg-visa-gold' 
                                      : 'bg-visa-blue'
                                  }`}
                                  style={{ width: `${votePercentage}%` }}
                                ></div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-gray-500 font-medium">
                                  {candidate.votes_count} votes ({votePercentage}%)
                                </span>
                                
                                {activeElection?.status === 'completed' && candidate === candidates[0] && (
                                  <span className="text-sm font-medium bg-visa-gold/20 text-visa-navy px-3 py-1 rounded-full flex items-center">
                                    <Trophy size={14} className="mr-1" />
                                    Winner
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium text-visa-navy mb-2">No candidates found</h3>
                <p className="text-gray-600 mb-6">
                  There are currently no candidates for this election.
                </p>
              </div>
            )}
          </div>
        </section>
        
        {activeElection?.status === 'active' && (
          <section className="py-12 bg-visa-navy">
            <div className="container-custom mx-auto">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-serif font-bold text-white mb-4">
                  Election Information
                </h2>
                <p className="text-blue-100 mb-6">
                  The elected administrators will serve a one-year term and be responsible for 
                  moderating our community, organizing events, and developing resources for F-1 visa applicants.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-visa-gold hover:bg-visa-gold/90 text-visa-navy">
                    View Admin Responsibilities
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Election Rules
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {activeElection?.status === 'completed' && (
          <section className="py-12 bg-visa-light">
            <div className="container-custom mx-auto">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-serif font-bold text-visa-navy mb-4">
                  Meet Your New Administrators
                </h2>
                <p className="text-gray-700 mb-6">
                  Thank you to everyone who participated in the election! The new administration team 
                  will begin their term on January 1, 2025.
                </p>
                <Button className="bg-visa-blue hover:bg-visa-navy text-white">
                  Learn More About the Team
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminElectionPage;
