import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  limit,
  Timestamp,
  increment,
  DocumentReference
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './config';

// Types
export type PostStatus = 'draft' | 'published';
export type PostType = 'article' | 'video';

export interface PostData {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tiktokUrl?: string;
  slug: string;
  status: PostStatus;
  type: PostType;
  tags: string[];
  publishedAt?: Timestamp;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  featured: boolean;
  pinned: boolean;
}

export interface CommentData {
  id?: string;
  postId: string;
  name: string;
  email: string;
  content: string;
  approved: boolean;
  createdAt?: Timestamp;
}

// Generate slug from title
export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

// POSTS OPERATIONS

// Get all posts (optionally filtered by status)
export const getPosts = async (postStatus?: PostStatus, postType?: PostType) => {
  try {
    let postsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc')
    );
    
    if (postStatus) {
      postsQuery = query(
        postsQuery,
        where('status', '==', postStatus)
      );
    }
    
    if (postType) {
      postsQuery = query(
        postsQuery,
        where('type', '==', postType)
      );
    }
    
    const snapshot = await getDocs(postsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PostData));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Get featured posts
export const getFeaturedPosts = async () => {
  try {
    const postsQuery = query(
      collection(db, 'posts'),
      where('featured', '==', true),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc'),
      limit(6)
    );
    
    const snapshot = await getDocs(postsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PostData));
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
};

// Get a post by id
export const getPostById = async (id: string) => {
  try {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as PostData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

// Get a post by slug
export const getPostBySlug = async (slug: string) => {
  try {
    const postsQuery = query(
      collection(db, 'posts'),
      where('slug', '==', slug),
      limit(1)
    );
    
    const snapshot = await getDocs(postsQuery);
    
    if (!snapshot.empty) {
      const docData = snapshot.docs[0];
      return {
        id: docData.id,
        ...docData.data()
      } as PostData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
};

// Create a new post
export const createPost = async (postData: Omit<PostData, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      publishedAt: postData.status === 'published' ? serverTimestamp() : null,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0
    });
    
    return { id: docRef.id, success: true, error: null };
  } catch (error) {
    console.error('Error creating post:', error);
    return { id: null, success: false, error: 'Error al crear la publicación' };
  }
};

// Update an existing post
export const updatePost = async (id: string, postData: Partial<PostData>) => {
  try {
    const docRef = doc(db, 'posts', id);
    
    // If post is being published now, set publishedAt
    const updates = {
      ...postData,
      updatedAt: serverTimestamp()
    };
    
    if (postData.status === 'published') {
      const docSnap = await getDoc(docRef);
      const currentData = docSnap.data();
      
      if (currentData && currentData.status !== 'published') {
        updates.publishedAt = serverTimestamp();
      }
    }
    
    await updateDoc(docRef, updates);
    return { success: true, error: null };
  } catch (error) {
    console.error('Error updating post:', error);
    return { success: false, error: 'Error al actualizar la publicación' };
  }
};

// Delete a post
export const deletePost = async (id: string, coverImage?: string) => {
  try {
    // Delete the document
    await deleteDoc(doc(db, 'posts', id));
    
    // Delete the cover image if it exists
    if (coverImage) {
      try {
        const imageRef = ref(storage, coverImage);
        await deleteObject(imageRef);
      } catch (imageError) {
        console.error('Error deleting image:', imageError);
        // Continue anyway since the post is deleted
      }
    }
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, error: 'Error al eliminar la publicación' };
  }
};

// Upload an image
export const uploadImage = async (file: File, path: string) => {
  return new Promise<{ url: string | null, error: string | null }>((resolve) => {
    try {
      const storageRef = ref(storage, `${path}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress monitoring if needed
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Error handling
          console.error('Error uploading image:', error);
          resolve({ url: null, error: 'Error al subir la imagen' });
        },
        async () => {
          // Upload completed successfully
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ url: downloadURL, error: null });
        }
      );
    } catch (error) {
      console.error('Error initializing upload:', error);
      resolve({ url: null, error: 'Error al iniciar la subida' });
    }
  });
};

// Increment view count
export const incrementViewCount = async (id: string) => {
  try {
    const docRef = doc(db, 'posts', id);
    await updateDoc(docRef, {
      viewCount: increment(1)
    });
    return { success: true };
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return { success: false };
  }
};

// COMMENTS OPERATIONS

// Get comments for a post
export const getComments = async (postId: string, onlyApproved: boolean = true) => {
  try {
    let commentsQuery = query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'desc')
    );
    
    if (onlyApproved) {
      commentsQuery = query(
        commentsQuery,
        where('approved', '==', true)
      );
    }
    
    const snapshot = await getDocs(commentsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as CommentData));
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

// Add a comment
export const addComment = async (commentData: Omit<CommentData, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'comments'), {
      ...commentData,
      createdAt: serverTimestamp()
    });
    
    // Increment comment count on the post
    const postRef = doc(db, 'posts', commentData.postId);
    await updateDoc(postRef, {
      commentCount: increment(1)
    });
    
    return { id: docRef.id, success: true, error: null };
  } catch (error) {
    console.error('Error adding comment:', error);
    return { id: null, success: false, error: 'Error al añadir el comentario' };
  }
};

// Approve or reject a comment
export const updateCommentStatus = async (id: string, approved: boolean) => {
  try {
    const docRef = doc(db, 'comments', id);
    await updateDoc(docRef, { approved });
    return { success: true, error: null };
  } catch (error) {
    console.error('Error updating comment status:', error);
    return { success: false, error: 'Error al actualizar el estado del comentario' };
  }
};

// Delete a comment
export const deleteComment = async (id: string, postId: string) => {
  try {
    await deleteDoc(doc(db, 'comments', id));
    
    // Decrement comment count on the post
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      commentCount: increment(-1)
    });
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting comment:', error);
    return { success: false, error: 'Error al eliminar el comentario' };
  }
};