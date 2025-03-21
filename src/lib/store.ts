
import { create } from 'zustand';
import { Collection, CollectionFormData } from './types';
import { toast } from 'sonner';

interface CollectionStore {
  collections: Collection[];
  addCollection: (data: CollectionFormData) => void;
  updateCollection: (id: string, data: CollectionFormData) => void;
  deleteCollection: (id: string) => void;
  getCollection: (id: string) => Collection | undefined;
}

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

export const useCollectionStore = create<CollectionStore>((set, get) => ({
  collections: [
    {
      id: "sample1",
      title: "Memahami Shalat dengan Benar",
      category: "video",
      link: "https://example.com/video1",
      summary: "Pembahasan tentang tata cara shalat yang benar sesuai dengan sunah.",
      coverImage: "https://images.unsplash.com/photo-1564694202883-46e7448c1b26?q=80&w=1000&auto=format&fit=crop",
      speaker: "Ustadz Abdul Somad",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "sample2",
      title: "Ceramah Puasa Ramadhan",
      category: "audio",
      link: "https://example.com/audio1",
      summary: "Kajian tentang keutamaan puasa di bulan Ramadhan.",
      coverImage: "https://images.unsplash.com/photo-1542816050-4b5eb09f2ab9?q=80&w=1000&auto=format&fit=crop",
      speaker: "Ustadz Adi Hidayat",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "sample3",
      title: "HR. Bukhari: Tentang Kebersihan",
      category: "hadist",
      link: "https://example.com/hadith1",
      summary: "Hadist riwayat Bukhari tentang pentingnya menjaga kebersihan.",
      coverImage: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop",
      speaker: "Imam Bukhari",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  addCollection: (data) => {
    const newCollection: Collection = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      collections: [newCollection, ...state.collections],
    }));

    toast.success("Koleksi berhasil ditambahkan");
    return newCollection.id;
  },

  updateCollection: (id, data) => {
    set((state) => ({
      collections: state.collections.map((collection) =>
        collection.id === id
          ? {
              ...collection,
              ...data,
              updatedAt: new Date(),
            }
          : collection
      ),
    }));

    toast.success("Koleksi berhasil diperbarui");
  },

  deleteCollection: (id) => {
    set((state) => ({
      collections: state.collections.filter((collection) => collection.id !== id),
    }));

    toast.success("Koleksi berhasil dihapus");
  },

  getCollection: (id) => {
    return get().collections.find((collection) => collection.id === id);
  },
}));
