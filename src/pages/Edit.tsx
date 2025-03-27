import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCollectionStore } from "@/lib/store";
import { Category, CollectionFormData } from "@/lib/types";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Check, Film, Music, Book, ImagePlus, Link as LinkIcon, User, Upload, FileVideo, FileAudio, File, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Edit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getCollection = useCollectionStore((state) => state.getCollection);
  const updateCollection = useCollectionStore((state) => state.updateCollection);
  
  const [formData, setFormData] = useState<CollectionFormData>({
    title: "",
    category: "video",
    link: "",
    summary: "",
    coverImage: "",
    speaker: "",
    mediaFile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mediaFilePreview, setMediaFilePreview] = useState<string | null>(null);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const mediaFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      const collection = getCollection(id);
      if (collection) {
        setFormData({
          title: collection.title,
          category: collection.category,
          link: collection.link,
          summary: collection.summary,
          coverImage: collection.coverImage,
          speaker: collection.speaker,
          mediaFile: collection.mediaFile || "",
        });
        setImagePreview(collection.coverImage);
      } else {
        toast.error("Koleksi tidak ditemukan");
        navigate("/collections");
      }
    }
  }, [id, getCollection, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === "coverImage" && value) {
      setImagePreview(value);
    }
  };

  const handleCategoryChange = (value: Category) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'image' | 'media') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Ukuran file terlalu besar (maksimal 10MB)");
      return;
    }

    if (fileType === 'image' && !file.type.match(/image\/(jpeg|jpg|png|gif)/i)) {
      toast.error("Format file tidak valid. Gunakan PNG, JPG, atau GIF");
      return;
    }

    if (fileType === 'media') {
      const isAudio = file.type.match(/audio\/(mp3|mpeg)/i);
      const isVideo = file.type.match(/video\/(mp4)/i);
      if (!isAudio && !isVideo) {
        toast.error("Format file tidak valid. Gunakan MP3 atau MP4");
        return;
      }
    }

    const objectUrl = URL.createObjectURL(file);
    
    if (fileType === 'image') {
      setImagePreview(objectUrl);
      setFormData(prev => ({ ...prev, coverImage: file.name }));
    } else {
      setMediaFilePreview(objectUrl);
      setFormData(prev => ({ ...prev, mediaFile: file.name }));
    }
    
    toast.success(`File ${file.name} siap diupload`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title || !formData.coverImage || !formData.speaker) {
      toast.error("Mohon lengkapi semua field yang diperlukan");
      setIsSubmitting(false);
      return;
    }

    try {
      if (id) {
        updateCollection(id, formData);
        toast.success("Koleksi berhasil diperbarui");
        navigate("/collections");
      }
    } catch (error) {
      console.error("Error updating collection:", error);
      toast.error("Terjadi kesalahan saat memperbarui koleksi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/collections");
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
    <Layout title="Edit Koleksi" hideHeader={true}>
      {/* Integrated Header Banner */}
      <div className="mb-12 py-14 px-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-lg shadow-lg text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Edit Koleksi</h1>
          <p className="text-blue-100 text-lg max-w-3xl">
            Perbarui informasi koleksi yang telah ada
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
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0}
            className="flex flex-col space-y-6"
          >
            <Card className="glass-card border-none shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 border-b border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800">Detail Koleksi</h3>
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
                        className="pl-9 transition-all focus:ring-2 focus:ring-purple-500"
                        required
                      />
                      <span className="absolute left-3 top-2.5 text-purple-500">
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
                        className={`flex items-center justify-center py-2 ${formData.category === 'video' ? 'bg-yellow-100 text-yellow-700' : ''}`}
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
                        className={`flex items-center justify-center py-2 ${formData.category === 'hadist' ? 'bg-pink-100 text-pink-700' : ''}`}
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
                      className="resize-none h-24 transition-all focus:ring-2 focus:ring-purple-500"
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
                        className="pl-9 transition-all focus:ring-2 focus:ring-purple-500"
                        required
                      />
                      <span className="absolute left-3 top-2.5 text-purple-500">
                        <User className="h-4 w-4" />
                      </span>
                    </div>
                  </motion.div>

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
                        onChange={(e) => handleFileUpload(e, 'media')}
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2">
                          <Input
                            value={formData.mediaFile || ""}
                            placeholder={`Pilih file ${formData.category}`}
                            className="pl-9 transition-all focus:ring-2 focus:ring-purple-500"
                            readOnly
                          />
                          <span className="absolute left-3 top-2.5 text-purple-500">
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

                  <motion.div className="pt-2 flex gap-3" variants={fadeIn} custom={7}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2 transition-all hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        "Menyimpan..."
                      ) : (
                        <>
                          <Check className="h-4 w-4" /> Perbarui Koleksi
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" /> Kembali
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={1}
            className="flex flex-col space-y-6"
          >
            <Card className="glass-card border-none shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 border-b border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800">Pratinjau Gambar</h3>
              </div>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label htmlFor="coverImage" className="text-sm font-medium">
                    Gambar Cover
                  </Label>
                  <div className="relative">
                    <Input
                      type="file"
                      id="coverImage"
                      ref={imageInputRef}
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, 'image')}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <Input
                          name="coverImage"
                          value={formData.coverImage || ""}
                          placeholder="Unggah gambar cover"
                          onChange={handleChange}
                          className="pl-9 transition-all focus:ring-2 focus:ring-yellow-500"
                        />
                        <span className="absolute left-3 top-2.5 text-yellow-500">
                          <ImagePlus className="h-4 w-4" />
                        </span>
                      </div>
                      <Button 
                        type="button"
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => imageInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4" />
                        Unggah
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <Label className="text-sm font-medium mb-2 block">Pratinjau Gambar</Label>
                    <div className="aspect-video relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={() => setImagePreview(null)}
                        />
                      ) : (
                        <div className="text-center p-4">
                          <ImagePlus className="h-12 w-12 mx-auto text-gray-400" />
                          <p className="text-sm text-gray-500 mt-2">
                            Unggah gambar untuk melihat pratinjau
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-purple-700 mb-2">Tips Mengedit Koleksi</h4>
                    <ul className="text-sm text-purple-600 space-y-2">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        Pastikan judul ringkas namun menjelaskan isi konten
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        Gunakan gambar beresolusi tinggi untuk cover
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        Format file yang didukung: MP4, MP3, JPG, PNG
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        Ukuran file maksimum adalah 10MB
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
