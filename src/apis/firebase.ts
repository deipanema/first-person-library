import { initializeApp } from 'firebase/app';
import {
  User,
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getDatabase,
  set,
  ref,
  get,
  equalTo,
  query,
  orderByChild,
  remove,
} from 'firebase/database';
import { v4 as uuid } from 'uuid';
import { Book, Comment, Suggest } from '../types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});
const auth = getAuth();
const database = getDatabase(app);

export async function login() {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
}

export async function onUserStateChange(callback: (user: User | null) => void) {
  onAuthStateChanged(auth, callback);
}

export async function addNewComment(comment: Comment, book: Book) {
  const id = uuid();
  let uid;

  await onUserStateChange(async (user) => {
    uid = user?.uid;
  });

  try {
    await set(ref(database, `comments/${id}`), {
      ...comment,
      id,
      uid,
      createdAt: Date(),
      updatedAt: '',
      book,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getComments({
  title,
}: {
  title?: string;
}): Promise<Comment[]> {
  return title ? getSelectedComments({ title }) : getAllComments();
}

export async function getMyComments(): Promise<Comment[]> {
  try {
    let uid = null;

    await onUserStateChange(async (user) => {
      uid = user?.uid;
    });

    return await get(
      query(ref(database, 'comments'), orderByChild('uid'), equalTo(uid))
    ).then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAllComments() {
  return await get(ref(database, 'comments')).then((snapshot) => {
    const data: Comment[] = Object.values(snapshot.val());

    const sortedData = data.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    if (sortedData.length !== 0) {
      return sortedData;
    }

    return [];
  });
}

export async function getSelectedComments({
  title,
}: {
  title?: string;
}): Promise<Comment[]> {
  return await get(
    query(
      ref(database, 'comments'),
      orderByChild('book/title'),
      equalTo(title!)
    )
  ).then((snapshot) => {
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
  });
}

export async function getSuggestBooks(): Promise<Suggest[]> {
  return await get(ref(database, 'suggest')).then((snapshot) => {
    if (snapshot.exists()) return Object.values(snapshot.val());
    return [];
  });
}

export async function updateMyComment(comment: Comment) {
  try {
    await set(ref(database, 'comments/' + comment.id), {
      ...comment,
      updatedAt: Date(),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteMyComment(id: string) {
  try {
    await remove(ref(database, 'comments/' + id));
  } catch (error) {
    console.error(error);
  }
}
