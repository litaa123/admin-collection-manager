
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCollectionStore } from "@/lib/store";
import { Category, CollectionFormData } from "@/lib/types";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Check, Film, Music, Book, FileVideo, FileAudio, File, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const initialFormData: CollectionFormData = {
  title: "",
  category: "video",
  link: "",
  summary: "",
  coverImage: "",
  speaker: "",
  mediaFile: "",
};

const Create = () => {
  const navigate = useNavigate();
  const addCollection = useCollectionStore((state) => state.addCollection);
  const [formData, setFormData] = useState<CollectionFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaFilePreview, setMediaFilePreview] = useState<string | null>(null);
  
  // Create ref for file input
  const mediaFileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: Category) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Ukuran file terlalu besar (maksimal 10MB)");
      return;
    }

    // Validate file type
    const isAudio = file.type.match(/audio\/(mp3|mpeg)/i);
    const isVideo = file.type.match(/video\/(mp4)/i);
    if (!isAudio && !isVideo) {
      toast.error("Format file tidak valid. Gunakan MP3 atau MP4");
      return;
    }

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    
    setMediaFilePreview(objectUrl);
    setFormData(prev => ({ ...prev, mediaFile: file.name }));
    
    // In a real app, you would upload this file to a server and get back a URL
    toast.success(`File ${file.name} siap diupload`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simple validation
    if (!formData.title || !formData.speaker) {
      toast.error("Mohon lengkapi semua field yang diperlukan");
      setIsSubmitting(false);
      return;
    }

    try {
      // Set default cover image based on category
      let defaultCoverImage = "";
      switch (formData.category) {
        case "video":
          defaultCoverImage = "https://images.unsplash.com/photo-1564694202883-46e7448c1b26?q=80&w=1000&auto=format&fit=crop";
          break;
        case "audio":
          defaultCoverImage = "https://images.unsplash.com/photo-1542816050-4b5eb09f2ab9?q=80&w=1000&auto=format&fit=crop";
          break;
        case "hadist":
          defaultCoverImage = "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop";
          break;
      }
      
      // Update form data with default cover image
      const updatedFormData = {
        ...formData,
        coverImage: defaultCoverImage
      };

      addCollection(updatedFormData);
      toast.success("Koleksi berhasil ditambahkan!");
      navigate("/collections");
    } catch (error) {
      console.error("Error adding collection:", error);
      toast.error("Terjadi kesalahan saat menambahkan koleksi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const getMediaTypeLabel = () => {
    switch (formData.category) {
      case "video": return "Video (MP4)";
      case "audio": return "Audio (MP3)";
      case "hadist": return "Dokumen";
      default: return "Media";
    }
  };

  const getMediaTypeIcon = () => {
    switch (formData.category) {
      case "video": return <FileVideo className="h-4 w-4" />;
      case "audio": return <FileAudio className="h-4 w-4" />;
      case "hadist": return <File className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  return (
    <Layout title="Tambah Koleksi Baru" hideHeader={true}>
      {/* Integrated Header Banner */}
      <div className="mb-12 py-14 px-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-lg shadow-lg text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Tambah Koleksi Baru</h1>
          <p className="text-blue-100 text-lg max-w-3xl">
            Tambahkan konten baru ke dalam sistem perpustakaan digital Anda
          </p>
          
          <div className="h-px bg-gradient-to-r from-blue-200/30 via-white/60 to-blue-200/30 my-4"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3">
            <div>
              <h3 className="text-xl font-medium text-white">Perpustakaan Digital</h3>
              <p className="text-blue-100 text-sm mt-1">
                Koleksi konten Islam berkualitas untuk meningkatkan ilmu dan pemahaman Anda
              </p>
            </div>
            
            <div className="flex gap-3 mt-4 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-700/50 text-white">
                <Film className="w-4 h-4 mr-1" /> Video
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-700/50 text-white">
                <Music className="w-4 h-4 mr-1" /> Audio
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-700/50 text-white">
                <Book className="w-4 h-4 mr-1" /> Hadist
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <Card className="glass-card border-none shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 border-b border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800">Detail Koleksi</h3>
          </div>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div className="space-y-2" variants={fadeIn} custom={1}>
                <Label htmlFor="title" className="text-sm font-medium">
                  Judul
                </Label>
                <div className="relative">
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Masukkan judul konten"
                    className="pl-9 transition-all focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span className="absolute left-3 top-2.5 text-blue-500">
                    <Book className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={fadeIn} custom={2}>
                <Label className="text-sm font-medium">Kategori</Label>
                <ToggleGroup
                  type="single"
                  value={formData.category}
                  onValueChange={(value) => handleCategoryChange(value as Category)}
                  className="grid grid-cols-3 gap-2"
                >
                  <ToggleGroupItem 
                    value="video" 
                    aria-label="Video"
                    className={`flex items-center justify-center py-2 ${formData.category === 'video' ? 'bg-blue-100 text-blue-700' : ''}`}
                  >
                    <Film className="h-4 w-4 mr-2" />
                    <span>Video</span>
                  </ToggleGroupItem>
                  
                  <ToggleGroupItem 
                    value="audio" 
                    aria-label="Audio"
                    className={`flex items-center justify-center py-2 ${formData.category === 'audio' ? 'bg-purple-100 text-purple-700' : ''}`}
                  >
                    <Music className="h-4 w-4 mr-2" />
                    <span>Audio</span>
                  </ToggleGroupItem>
                  
                  <ToggleGroupItem 
                    value="hadist" 
                    aria-label="Hadist"
                    className={`flex items-center justify-center py-2 ${formData.category === 'hadist' ? 'bg-green-100 text-green-700' : ''}`}
                  >
                    <Book className="h-4 w-4 mr-2" />
                    <span>Hadist</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </motion.div>

              <motion.div className="space-y-2" variants={fadeIn} custom={3}>
                <Label htmlFor="summary" className="text-sm font-medium">
                  Rangkuman
                </Label>
                <Textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Masukkan rangkuman konten"
                  className="resize-none h-24 transition-all focus:ring-2 focus:ring-blue-500"
                  required
                />
              </motion.div>

              <motion.div className="space-y-2" variants={fadeIn} custom={4}>
                <Label htmlFor="speaker" className="text-sm font-medium">
                  Pemateri
                </Label>
                <div className="relative">
                  <Input
                    id="speaker"
                    name="speaker"
                    value={formData.speaker}
                    onChange={handleChange}
                    placeholder="Nama pemateri"
                    className="pl-9 transition-all focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span className="absolute left-3 top-2.5 text-blue-500">
                    <User className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>

              {/* Media File Upload Field */}
              <motion.div className="space-y-2" variants={fadeIn} custom={5}>
                <Label htmlFor="mediaFile" className="text-sm font-medium">
                  {getMediaTypeLabel()}
                </Label>
                <div className="relative">
                  <Input
                    type="file"
                    id="mediaFile"
                    ref={mediaFileInputRef}
                    className="hidden"
                    accept={formData.category === 'video' ? ".mp4" : 
                           formData.category === 'audio' ? ".mp3" : 
                           ".pdf,.doc,.docx"}
                    onChange={handleFileUpload}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <Input
                        value={formData.mediaFile || ""}
                        placeholder={`Pilih file ${formData.category}`}
                        className="pl-9 transition-all focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                      <span className="absolute left-3 top-2.5 text-blue-500">
                        {getMediaTypeIcon()}
                      </span>
                    </div>
                    <Button 
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => mediaFileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      Pilih File
                    </Button>
                  </div>
                </div>
                {mediaFilePreview && formData.category === 'video' && (
                  <div className="mt-2 bg-gray-50 p-3 rounded-md">
                    <video 
                      controls 
                      className="w-full h-auto rounded-md" 
                      src={mediaFilePreview}
                    />
                  </div>
                )}
                {mediaFilePreview && formData.category === 'audio' && (
                  <div className="mt-2 bg-gray-50 p-3 rounded-md">
                    <audio 
                      controls 
                      className="w-full"
                      src={mediaFilePreview}
                    />
                  </div>
                )}
              </motion.div>

              <motion.div className="pt-2" variants={fadeIn} custom={6}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2 transition-all hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Menyimpan..."
                  ) : (
                    <>
                      <Check className="h-4 w-4" /> Simpan Koleksi
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Create;
