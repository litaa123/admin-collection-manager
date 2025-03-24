
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, FileText, Edit, Users, Video, Music, BookOpen, Bell, Mail, LogOut, Star, StarOff, MessageCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { 
  Bar, 
  BarChart,
  Line, 
  LineChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from "recharts";
import { useCollectionStore } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Feedback {
  id: string;
  username: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
}

const Index = () => {
  const collections = useCollectionStore((state) => state.collections);
  const navigate = useNavigate();
  
  const videosCount = collections.filter(c => c.category === "video").length;
  const audioCount = collections.filter(c => c.category === "audio").length;
  const hadistCount = collections.filter(c => c.category === "hadist").length;

  const handleLogout = () => {
    toast.success("Anda berhasil logout", {
      description: "Terima kasih telah menggunakan Admin Daarul Ilmi"
    });
    
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const visitorData = [
    { name: "Sen", visitors: 120 },
    { name: "Sel", visitors: 230 },
    { name: "Rab", visitors: 310 },
    { name: "Kam", visitors: 270 },
    { name: "Jum", visitors: 350 },
    { name: "Sab", visitors: 410 },
    { name: "Ming", visitors: 320 }
  ];

  const monthlyData = [
    { name: "Jan", visitors: 1200 },
    { name: "Feb", visitors: 1900 },
    { name: "Mar", visitors: 2100 },
    { name: "Apr", visitors: 2400 },
    { name: "Mei", visitors: 1800 },
    { name: "Jun", visitors: 2800 }
  ];

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
    }
  ];

  const sortedFeedback = [...feedbackData].sort((a, b) => b.date.getTime() - a.date.getTime());

  const averageRating = feedbackData.reduce((sum, item) => sum + item.rating, 0) / feedbackData.length;
  const roundedAverage = Math.round(averageRating * 10) / feedbackData.length;

  const collectionTypeData = [
    { name: "Video", value: videosCount, fill: "#3b82f6" },
    { name: "Audio", value: audioCount, fill: "#8b5cf6" },
    { name: "Hadist", value: hadistCount, fill: "#22c55e" }
  ];

  const features = [
    {
      title: "Tambah Koleksi",
      description: "Menambahkan koleksi baru untuk konten video, audio, dan hadist.",
      icon: PlusCircle,
      color: "bg-yellow-500",
      link: "/create",
    },
    {
      title: "Lihat Koleksi",
      description: "Melihat semua koleksi yang telah ditambahkan.",
      icon: FileText,
      color: "bg-purple-500",
      link: "/collections",
    },
    {
      title: "Edit Koleksi",
      description: "Mengedit koleksi yang sudah ada.",
      icon: Edit,
      color: "bg-pink-500",
      link: "/collections",
    },
  ];

  const statsCards = [
    {
      title: "Koleksi Video",
      value: videosCount,
      color: "bg-yellow-400",
      percent: "83%",
      icon: Video
    },
    {
      title: "Koleksi Audio",
      value: audioCount,
      color: "bg-purple-500",
      percent: "77%",
      icon: Music
    },
    {
      title: "Koleksi Hadist",
      value: hadistCount,
      color: "bg-pink-500",
      percent: "91%",
      icon: BookOpen
    },
    {
      title: "Total Pengunjung",
      value: "126",
      color: "bg-purple-300",
      percent: "",
      icon: Users
    }
  ];

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
    <div className="min-h-screen bg-white px-4 pt-10 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white p-2 rounded-lg font-bold">Admin</span>
            <span className="font-bold text-xl text-blue-800">Daarul Ilmi</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-white/80 hover:bg-white shadow">
              <Mail size={20} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-white/80 hover:bg-white shadow">
              <Bell size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2 bg-blue-100 p-1 pl-2 pr-3 rounded-full">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                A
              </div>
              <span className="text-sm font-medium text-blue-900">Admin</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1.5 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-100 rounded-xl p-6 mb-8 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div className="z-10 md:w-full">
              <h1 className="text-3xl font-bold text-blue-900">Hi, Admin</h1>
              <p className="mt-2 text-blue-800">
                Siap untuk mengelola konten Daarul Ilmi hari ini?
              </p>
              <Link to="/create" className="mt-4 inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                <PlusCircle size={18} />
                Tambah Koleksi Baru
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`bg-blue-500 border-none shadow-md hover:shadow-lg transition-shadow`}>
                <CardContent className="p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-white/90 font-medium">{stat.title}</div>
                    <stat.icon className="text-white/80" size={18} />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  {stat.percent && (
                    <div className="text-sm text-white/90 mt-1">{stat.percent} Selesai</div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-blue-900 mb-4">Kelola Konten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link to={feature.link} className="block">
                  <div className="bg-white rounded-xl p-6 h-full transition-all overflow-hidden group border border-blue-100 hover:border-blue-200 shadow-sm hover:shadow-md">
                    <div
                      className={`bg-blue-500 rounded-full p-3 inline-flex mb-4 text-white shadow-md`}
                    >
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-900">Feedback Pengguna</h2>
            <div className="flex items-center gap-2">
              <MessageCircle className="text-blue-500" size={18} />
              <span className="text-blue-900 font-medium">{feedbackData.length} feedback</span>
              <span className="mx-2 text-gray-400">|</span>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="text-blue-900 font-medium">{roundedAverage}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100">
            <div className="divide-y divide-blue-100">
              {sortedFeedback.map((feedback) => (
                <div key={feedback.id} className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 border border-blue-100">
                      {feedback.userAvatar ? (
                        <AvatarImage src={feedback.userAvatar} alt={feedback.username} />
                      ) : (
                        <AvatarFallback className="bg-blue-200 text-blue-800">
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
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-blue-50 border-t border-blue-100">
              <Link to="/feedback" className="w-full flex justify-center items-center gap-2 py-3 px-4 text-blue-700 font-medium hover:bg-blue-100 rounded-lg transition-colors">
                LIHAT SEMUA FEEDBACK
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-900">Konten Terbaru</h2>
            <Link to="/collections" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Lihat Semua
            </Link>
          </div>
          
          {collections.length > 0 ? (
            <div className="space-y-4">
              {collections.slice(0, 3).map((collection) => (
                <div key={collection.id} className="bg-white rounded-lg shadow-sm hover:shadow-md p-4 transition-shadow border border-blue-100">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <img 
                        src={collection.coverImage} 
                        alt={collection.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/80";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{collection.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{collection.summary}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-block w-2 h-2 rounded-full ${
                          collection.category === 'video' ? 'bg-blue-400' : 
                          collection.category === 'audio' ? 'bg-blue-600' : 'bg-blue-800'
                        }`}></span>
                        <span className="text-xs capitalize text-gray-600">{collection.category}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link 
                        to={`/edit/${collection.id}`} 
                        className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
                      >
                        <Edit size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center border border-blue-100">
              <div className="text-gray-500">Belum ada koleksi yang ditambahkan</div>
              <Link 
                to="/create"
                className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <PlusCircle size={18} />
                Tambah Koleksi
              </Link>
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-900">Statistik Kunjungan</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Kunjungan Mingguan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ChartContainer 
                    config={{
                      visitors: {
                        label: "Pengunjung",
                        color: "#3b82f6"
                      }
                    }}
                  >
                    <BarChart data={visitorData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip 
                        content={<ChartTooltipContent />} 
                        cursor={{fill: 'rgba(59, 130, 246, 0.1)'}} 
                      />
                      <Bar 
                        dataKey="visitors" 
                        name="visitors" 
                        fill="var(--color-visitors, #3b82f6)" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-blue-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Tren Kunjungan Bulanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ChartContainer 
                    config={{
                      visitors: {
                        label: "Pengunjung",
                        color: "#1d4ed8"
                      }
                    }}
                  >
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip 
                        content={<ChartTooltipContent />} 
                        cursor={{fill: 'rgba(29, 78, 216, 0.1)'}} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="visitors" 
                        name="visitors" 
                        stroke="var(--color-visitors, #1d4ed8)" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
