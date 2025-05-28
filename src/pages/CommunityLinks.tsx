import React from 'react';
import { MessageCircle, Users, FileText, Facebook, Send, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const CommunityLinks = () => {
  const communityLinks = [
    {
      title: "Main Discussion Group",
      description: "Join our main Telegram group for F1 visa discussions and mock interviews",
      icon: <MessageCircle className="w-8 h-8 text-visa-blue" />,
      link: "https://t.me/SpringfallUSA",
      type: "Telegram"
    },
    {
      title: "I-20 Discussion Group",
      description: "Specific group for I-20 related queries and discussions",
      icon: <FileText className="w-8 h-8 text-visa-blue" />,
      link: "https://t.me/+F9gKQtfligIwZTRl",
      type: "Telegram"
    },
    {
      title: "Slot Discussion Group",
      description: "Get updates and discuss visa interview slot availability",
      icon: <MessageCircle className="w-8 h-8 text-visa-blue" />,
      link: "https://t.me/+Hc4OIt8WPPAwZjk9",
      type: "Telegram"
    },
    {
      title: "Visa Experience Group",
      description: "Read and share real visa interview experiences",
      icon: <Users className="w-8 h-8 text-visa-blue" />,
      link: "https://t.me/sprinfallvisaexperience",
      type: "Telegram"
    },
    {
      title: "Facebook Community",
      description: "Join our Facebook group for additional resources and discussions",
      icon: <Facebook className="w-8 h-8 text-[#1877F2]" />,
      link: "https://www.facebook.com/groups/3600099270261022/",
      type: "Facebook Group"
    },
    {
      title: "Facebook Page",
      description: "Follow our official Facebook page for updates and announcements",
      icon: <Facebook className="w-8 h-8 text-[#1877F2]" />,
      link: "https://www.facebook.com/profile.php?id=61575208839897",
      type: "Facebook Page"
    },
    {
      title: "TikTok",
      description: "Follow us on TikTok for visa tips and student stories",
      icon: <Video className="w-8 h-8 text-black" />,
      link: "https://www.tiktok.com/@springfallus.org",
      type: "TikTok"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-visa-light to-white pt-28 pb-16">
      <div className="container-custom mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-visa-navy mb-4">
            Join Our Community
          </h1>
          <p className="text-lg text-gray-600">
            Connect with us across different platforms and join our vibrant community of international students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityLinks.map((item, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-gray-50 rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-visa-navy">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <Button 
                  className="w-full mt-2 bg-visa-blue hover:bg-visa-navy text-white"
                  onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')}
                >
                  {item.type === "Telegram" ? <Send className="w-4 h-4 mr-2" /> : null}
                  Join {item.type}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-gray-600">
            By joining our community, you'll get access to free resources, expert guidance, 
            and support from fellow students on their F-1 visa journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityLinks; 