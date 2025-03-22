
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, User, Search, Filter, ThumbsUp, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Sample feedback data
const sampleFeedback = [
  {
    id: "1",
    userName: "Ahmad Fauzi",
    rating: 5,
    comment: "Alhamdulillah, konten video ceramahnya sangat membantu dalam memahami ilmu agama dengan lebih baik. Penjelasannya mudah dipahami.",
    date: new Date(2023, 10, 15),
    contentTitle: "Memahami Shalat dengan Benar",
    contentType: "video",
  },
  {
    id: "2",
    userName: "Siti Aisyah",
    rating: 4,
    comment: "Materinya bagus, tapi mohon ditingkatkan lagi kualitas audionya agar lebih jelas. Secara keseluruhan sangat bermanfaat.",
    date: new Date(2023, 11, 23),
    contentTitle: "Ceramah Puasa Ramadhan",
    contentType: "audio",
  },
  {
    id: "3",
    userName: "Muhammad Ridwan",
    rating: 5,
    comment: "MasyaAllah, penjelasan hadist ini sangat detail dan disertai dengan dalil yang jelas. Sangat membantu untuk pemahaman.",
    date: new Date(2024, 0, 5),
    contentTitle: "HR. Bukhari: Tentang Kebersihan",
    contentType: "hadist",
  },
  {
    id: "4",
    userName: "Fatimah Zahra",
    rating: 3,
    comment: "Videonya cukup bagus, tapi kadang terlalu cepat penjelasannya. Mungkin bisa dibuat lebih detail untuk pemula.",
    date: new Date(2024, 1, 12),
    contentTitle: "Memahami Shalat dengan Benar",
    contentType: "video",
  },
  {
    id: "5",
    userName: "Abdullah Ibrahim",
    rating: 4,
    comment: "Penjelasan yang baik, menambah pemahaman saya tentang tema ini. Terima kasih atas ilmunya.",
    date: new Date(2024, 2, 8),
    contentTitle: "HR. Bukhari: Tentang Kebersihan",
    contentType: "hadist",
  },
];

const Feedback = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Filter feedbacks based on search and filters
  const filteredFeedback = sampleFeedback.filter(feedback => {
    const matchesSearch = feedback.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          feedback.contentTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = ratingFilter === "all" || feedback.rating.toString() === ratingFilter;
    const matchesType = typeFilter === "all" || feedback.contentType === typeFilter;
    
    return matchesSearch && matchesRating && matchesType;
  });

  // Statistics
  const totalFeedback = sampleFeedback.length;
  const averageRating = (sampleFeedback.reduce((sum, item) => sum + item.rating, 0) / totalFeedback).toFixed(1);
  const fiveStarRatings = sampleFeedback.filter(item => item.rating === 5).length;
  const videoFeedback = sampleFeedback.filter(item => item.contentType === "video").length;
  const audioFeedback = sampleFeedback.filter(item => item.contentType === "audio").length;
  const hadistFeedback = sampleFeedback.filter(item => item.contentType === "hadist").length;

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Render star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
      />
    ));
  };

  // Get badge color for content type
  const getContentTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-800";
      case "audio":
        return "bg-purple-100 text-purple-800";
      case "hadist":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Colorful header */}
      <div className="py-20 px-6 bg-gradient-to-r from-blue-400 via-purple-300 to-pink-300">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">Rating & Feedback</h1>
          <p className="text-purple-800 text-lg max-w-2xl">
            Pantau dan kelola ulasan pengguna terhadap konten di aplikasi perpustakaan digital Daarul Ilmi
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              <Star className="w-4 h-4 mr-1 fill-yellow-500" /> Rating: {averageRating}/5
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <ThumbsUp className="w-4 h-4 mr-1" /> {fiveStarRatings} Ulasan Terbaik
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              <MessageSquare className="w-4 h-4 mr-1" /> {totalFeedback} Total Ulasan
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-none shadow-md">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">Rating Rata-rata</h3>
                <p className="text-2xl font-bold text-yellow-900">{averageRating}/5</p>
              </div>
              <div className="bg-yellow-200 p-3 rounded-full">
                <Star className="text-yellow-700 h-6 w-6 fill-yellow-700" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-none shadow-md">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">Ulasan Video</h3>
                <p className="text-2xl font-bold text-blue-900">{videoFeedback}</p>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <Star className="text-blue-700 h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-none shadow-md">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-800">Ulasan Audio</h3>
                <p className="text-2xl font-bold text-purple-900">{audioFeedback}</p>
              </div>
              <div className="bg-purple-200 p-3 rounded-full">
                <Star className="text-purple-700 h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-none shadow-md">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-800">Ulasan Hadist</h3>
                <p className="text-2xl font-bold text-green-900">{hadistFeedback}</p>
              </div>
              <div className="bg-green-200 p-3 rounded-full">
                <Star className="text-green-700 h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm"
        >
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Cari ulasan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Rating</SelectItem>
                  <SelectItem value="5">5 Bintang</SelectItem>
                  <SelectItem value="4">4 Bintang</SelectItem>
                  <SelectItem value="3">3 Bintang</SelectItem>
                  <SelectItem value="2">2 Bintang</SelectItem>
                  <SelectItem value="1">1 Bintang</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tipe Konten" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="hadist">Hadist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedback.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <MessageSquare className="mx-auto h-16 w-16 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-500 mt-4">
                Tidak ada ulasan yang sesuai dengan filter
              </h3>
            </div>
          ) : (
            filteredFeedback.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover-lift">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-100 text-purple-800 rounded-full p-2">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{feedback.userName}</h3>
                          <div className="flex items-center mt-1">
                            {renderStars(feedback.rating)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {formatDate(feedback.date)}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mt-2">{feedback.comment}</p>
                    
                    <div className="mt-4 flex items-center gap-2">
                      <Badge 
                        className={`${getContentTypeColor(feedback.contentType)}`}
                      >
                        {feedback.contentType}
                      </Badge>
                      <span className="text-sm text-gray-500">Konten: {feedback.contentTitle}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-gray-50 px-6 py-3 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      Lihat Konten
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
