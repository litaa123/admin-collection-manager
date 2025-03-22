
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollectionStore } from "@/lib/store";
import { Category, Collection } from "@/lib/types";
import Layout from "@/components/Layout";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { motion } from "framer-motion";
import { Edit, Trash2, Video, Music, BookOpen, ExternalLink, Search, Filter, Library, BarChart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Collections = () => {
  const navigate = useNavigate();
  const collections = useCollectionStore((state) => state.collections);
  const deleteCollection = useCollectionStore((state) => state.deleteCollection);
  
  const [collectionToDelete, setCollectionToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const handleDelete = (id: string) => {
    setCollectionToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (collectionToDelete) {
      deleteCollection(collectionToDelete);
      setIsDeleteDialogOpen(false);
      setCollectionToDelete(null);
    }
  };

  // Count by category for statistics
  const videoCount = collections.filter(c => c.category === 'video').length;
  const audioCount = collections.filter(c => c.category === 'audio').length;
  const hadistCount = collections.filter(c => c.category === 'hadist').length;

  // Group collections by category
  const videoCollections = collections.filter(c => c.category === 'video');
  const audioCollections = collections.filter(c => c.category === 'audio');
  const hadistCollections = collections.filter(c => c.category === 'hadist');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "video":
        return <Video size={16} />;
      case "audio":
        return <Music size={16} />;
      case "hadist":
        return <BookOpen size={16} />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "video":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "audio":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "hadist":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Filter and search collections
  const filterCollections = (collections: Collection[]) => {
    return collections.filter(collection => {
      const matchesSearch = collection.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            collection.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            collection.summary.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || collection.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  };

  const filteredVideoCollections = filterCollections(videoCollections);
  const filteredAudioCollections = filterCollections(audioCollections);
  const filteredHadistCollections = filterCollections(hadistCollections);
  const allFilteredCollections = filterCollections(collections);

  // Determine which tab to show based on filters
  const getDefaultTab = () => {
    if (categoryFilter === "video") return "video";
    if (categoryFilter === "audio") return "audio";
    if (categoryFilter === "hadist") return "hadist";
    return "all";
  }

  const renderCollectionCards = (collections: Collection[]) => {
    if (collections.length === 0) {
      return (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Library className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-500 mt-4">
            Tidak ada koleksi yang sesuai dengan filter
          </h3>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover-lift h-full glass-card border-none">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={collection.coverImage}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
                <div className="absolute top-2 right-2">
                  <Badge 
                    className={`flex items-center gap-1 px-2 py-1 font-medium ${getCategoryColor(collection.category)}`}
                  >
                    {getCategoryIcon(collection.category)}
                    {collection.category.charAt(0).toUpperCase() + collection.category.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="pt-4">
                <h3 className="font-bold text-lg line-clamp-1">{collection.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Pemateri: {collection.speaker}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Ditambahkan: {formatDate(collection.createdAt)}
                </p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {collection.summary}
                </p>
                
                <div className="mt-4">
                  <a
                    href={collection.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <ExternalLink size={14} />
                    Buka Tautan
                  </a>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-0 pb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/edit/${collection.id}`)}
                  className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Edit size={14} />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(collection.id)}
                  className="flex items-center gap-1 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={14} />
                  Hapus
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      {/* Integrated header */}
      <div className="py-20 px-6 bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold text-purple-900 mb-2">Semua Koleksi</h1>
              <p className="text-purple-800 text-lg max-w-2xl">
                Kelola semua konten yang telah ditambahkan dalam perpustakaan digital Daarul Ilmi
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <div className="flex gap-3 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Video className="w-4 h-4 mr-1" /> {videoCount} Video
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <Music className="w-4 h-4 mr-1" /> {audioCount} Audio
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <BookOpen className="w-4 h-4 mr-1" /> {hadistCount} Hadist
                </span>
              </div>
              <Button
                onClick={() => navigate("/create")}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Tambah Koleksi Baru
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-12 px-4">
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm"
          >
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Cari koleksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Semua Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="hadist">Hadist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Collection Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-none shadow-md">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">Video</h3>
                  <p className="text-2xl font-bold text-blue-900">{videoCount}</p>
                </div>
                <div className="bg-blue-200 p-3 rounded-full">
                  <Video className="text-blue-700 h-6 w-6" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-none shadow-md">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-purple-800">Audio</h3>
                  <p className="text-2xl font-bold text-purple-900">{audioCount}</p>
                </div>
                <div className="bg-purple-200 p-3 rounded-full">
                  <Music className="text-purple-700 h-6 w-6" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-none shadow-md">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Hadist</h3>
                  <p className="text-2xl font-bold text-green-900">{hadistCount}</p>
                </div>
                <div className="bg-green-200 p-3 rounded-full">
                  <BookOpen className="text-green-700 h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </div>

          {collections.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Library className="mx-auto h-16 w-16 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-500 mt-4">
                Belum ada koleksi yang ditambahkan
              </h3>
              <Button
                onClick={() => navigate("/create")}
                className="mt-4 bg-purple-600 hover:bg-purple-700"
              >
                Tambah Koleksi Baru
              </Button>
            </div>
          ) : (
            <Tabs defaultValue={getDefaultTab()} className="w-full">
              <TabsList className="w-full mb-6 bg-white/70 p-1">
                <TabsTrigger value="all" className="flex-1">Semua Koleksi</TabsTrigger>
                <TabsTrigger value="video" className="flex-1">
                  <Video size={16} className="mr-1"/> Video ({videoCollections.length})
                </TabsTrigger>
                <TabsTrigger value="audio" className="flex-1">
                  <Music size={16} className="mr-1"/> Audio ({audioCollections.length})
                </TabsTrigger>
                <TabsTrigger value="hadist" className="flex-1">
                  <BookOpen size={16} className="mr-1"/> Hadist ({hadistCollections.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="bg-white/50 p-6 rounded-lg">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Semua Koleksi</h2>
                  {renderCollectionCards(allFilteredCollections)}
                </div>
              </TabsContent>

              <TabsContent value="video" className="mt-0">
                <div className="bg-blue-50/50 p-6 rounded-lg">
                  <h2 className="text-xl font-bold text-blue-800 mb-4">
                    <Video className="inline mr-2" size={20} />
                    Koleksi Video
                  </h2>
                  {renderCollectionCards(filteredVideoCollections)}
                </div>
              </TabsContent>

              <TabsContent value="audio" className="mt-0">
                <div className="bg-purple-50/50 p-6 rounded-lg">
                  <h2 className="text-xl font-bold text-purple-800 mb-4">
                    <Music className="inline mr-2" size={20} />
                    Koleksi Audio
                  </h2>
                  {renderCollectionCards(filteredAudioCollections)}
                </div>
              </TabsContent>

              <TabsContent value="hadist" className="mt-0">
                <div className="bg-green-50/50 p-6 rounded-lg">
                  <h2 className="text-xl font-bold text-green-800 mb-4">
                    <BookOpen className="inline mr-2" size={20} />
                    Koleksi Hadist
                  </h2>
                  {renderCollectionCards(filteredHadistCollections)}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>

      <DeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Collections;
