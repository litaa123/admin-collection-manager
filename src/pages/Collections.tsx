
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollectionStore } from "@/lib/store";
import { Collection } from "@/lib/types";
import Layout from "@/components/Layout";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { motion } from "framer-motion";
import { Edit, Trash2, Video, Music, BookOpen, External } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Collections = () => {
  const navigate = useNavigate();
  const collections = useCollectionStore((state) => state.collections);
  const deleteCollection = useCollectionStore((state) => state.deleteCollection);
  
  const [collectionToDelete, setCollectionToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  return (
    <Layout
      title="Semua Koleksi"
      subtitle="Kelola semua konten yang telah ditambahkan"
    >
      <div className="space-y-8">
        {collections.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-500">
              Belum ada koleksi yang ditambahkan
            </h3>
            <Button
              onClick={() => navigate("/create")}
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Tambah Koleksi Baru
            </Button>
          </div>
        ) : (
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
                        <External size={14} />
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
        )}
      </div>

      <DeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </Layout>
  );
};

export default Collections;
