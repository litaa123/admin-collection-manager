
import React, { useState } from "react";
import { Star, StarOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";

// Mock feedback data type
interface Feedback {
  id: string;
  username: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
}

const Feedback = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock feedback data
  const feedbackData: Feedback[] = [
    {
      id: "feed1",
      username: "Ahmad Fajar",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      comment: "Alhamdulillah, konten-konten yang disajikan sangat bermanfaat dan mudah dipahami.",
      date: new Date("2023-11-15T08:30:00")
    },
    {
      id: "feed2",
      username: "Siti Nurhaliza",
      userAvatar: "https://i.pravatar.cc/150?img=5",
      rating: 4,
      comment: "Saya suka dengan pembahasan hadist-hadistnya, tapi mungkin bisa ditambahkan referensi tambahan.",
      date: new Date("2023-11-10T14:20:00")
    },
    {
      id: "feed3",
      username: "Budi Santoso",
      rating: 5,
      comment: "Ceramah audio sangat jelas dan inspiratif. Sangat membantu saya memahami ajaran Islam lebih baik.",
      date: new Date("2023-10-28T19:45:00")
    },
    {
      id: "feed4",
      username: "Anisa Rahman",
      userAvatar: "https://i.pravatar.cc/150?img=9",
      rating: 3,
      comment: "Videonya bagus tapi kadang buffering. Mungkin bisa dioptimalkan ukuran filenya.",
      date: new Date("2023-10-20T11:15:00")
    },
    {
      id: "feed5",
      username: "Yoga Pratama",
      rating: 5,
      comment: "MasyaAllah, sangat membantu untuk pembelajaran sehari-hari. Terima kasih Daarul Ilmi!",
      date: new Date("2023-10-15T16:30:00")
    },
    {
      id: "feed6",
      username: "Fatimah Azzahra",
      userAvatar: "https://i.pravatar.cc/150?img=6",
      rating: 5,
      comment: "Konten hadist sangat mudah dipahami dan diterapkan dalam kehidupan sehari-hari.",
      date: new Date("2023-10-12T10:15:00")
    },
    {
      id: "feed7",
      username: "Ridwan Kamil",
      userAvatar: "https://i.pravatar.cc/150?img=10",
      rating: 4,
      comment: "Sebagai pengajar, saya merasa terbantu dengan konten-konten yang disediakan untuk bahan ajar.",
      date: new Date("2023-10-10T08:20:00")
    },
    {
      id: "feed8",
      username: "Nurul Huda",
      rating: 5,
      comment: "Alhamdulillah, konten audio ceramahnya sangat menginspirasi dan memberikan pemahaman yang mendalam.",
      date: new Date("2023-09-28T14:30:00")
    },
    {
      id: "feed9",
      username: "Rizky Febian",
      userAvatar: "https://i.pravatar.cc/150?img=15",
      rating: 4,
      comment: "Aplikasinya sangat membantu untuk belajar agama di sela-sela kesibukan.",
      date: new Date("2023-09-22T16:45:00")
    },
    {
      id: "feed10",
      username: "Dewi Safitri",
      rating: 5,
      comment: "Sangat bagus dan bermanfaat, kontennya selalu update dan relevan dengan kebutuhan saat ini.",
      date: new Date("2023-09-18T09:10:00")
    },
    {
      id: "feed11",
      username: "Muhammad Iqbal",
      userAvatar: "https://i.pravatar.cc/150?img=20",
      rating: 3,
      comment: "Kontennya bagus tapi tampilan aplikasi masih bisa ditingkatkan untuk pengalaman yang lebih baik.",
      date: new Date("2023-09-15T11:25:00")
    },
    {
      id: "feed12",
      username: "Aisyah Putri",
      rating: 5,
      comment: "MasyaAllah, sangat membantu dalam memahami hadist dan penerapannya. Jazakumullah khairan katsiran.",
      date: new Date("2023-09-10T15:40:00")
    }
  ];

  // Sort feedback by date, newest first
  const sortedFeedback = [...feedbackData].sort((a, b) => b.date.getTime() - a.date.getTime());

  // Calculate average rating
  const averageRating = feedbackData.reduce((sum, item) => sum + item.rating, 0) / feedbackData.length;
  const roundedAverage = Math.round(averageRating * 10) / 10; // Round to 1 decimal place

  // Pagination logic
  const totalPages = Math.ceil(sortedFeedback.length / itemsPerPage);
  const currentItems = sortedFeedback.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to render star rating
  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />);
      } else {
        stars.push(<StarOff key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return <div className="flex">{stars}</div>;
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-yellow-100 px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft size={20} />
            <span>Kembali ke Beranda</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-purple-900 mb-2">Semua Feedback Pengguna</h1>
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="text-purple-900 font-medium">{roundedAverage} dari 5</span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-purple-900 font-medium">{feedbackData.length} feedback</span>
            </div>
          </motion.div>
        </div>

        <Card className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="divide-y divide-gray-100">
            {currentItems.map((feedback) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 hover:bg-purple-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border border-purple-100">
                    {feedback.userAvatar ? (
                      <AvatarImage src={feedback.userAvatar} alt={feedback.username} />
                    ) : (
                      <AvatarFallback className="bg-purple-200 text-purple-800">
                        {feedback.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between gap-2">
                      <h3 className="font-medium text-gray-900">{feedback.username}</h3>
                      <div className="text-xs text-gray-500">{formatDate(feedback.date)}</div>
                    </div>
                    <div className="mt-1">{renderStarRating(feedback.rating)}</div>
                    <p className="mt-2 text-gray-600">{feedback.comment}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(prev => Math.max(prev - 1, 1));
                    }} 
                  />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Only show a limited number of pages to avoid cluttering
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                
                // Add ellipsis for skipped pages
                if (
                  (page === 2 && currentPage > 3) ||
                  (page === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return <PaginationEllipsis key={`ellipsis-${page}`} />;
                }
                
                return null;
              })}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(prev => Math.min(prev + 1, totalPages));
                    }} 
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default Feedback;
