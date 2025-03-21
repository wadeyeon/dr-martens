import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { get, getDatabase, ref, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

export function login() {
  try {
    signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error.message);
  }
}

export function logout() {
  try {
    signOut(auth);
  } catch (error) {
    console.error(error.message);
  }
}

export function onUserStateChange(callback) {
  // login(), logout() 호출되면 user 정보가 바뀐다.
  // user 상태가 바뀔때마다 onAuthStateChanged 메소드의 두번째 파라미터의 콜백함수인 관찰자 함수가 실행됨!
  onAuthStateChanged(auth, async (user) => {
    // Navbar 컴포넌트가 마운트시 useEffect 훅의 콜백함수가 호출되어
    // onUserStateChange(setUser)를 통해 setUser를 콜백함수로 전달됨.
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser); // setUser(user) 실행! -> login(), logout() 함수에서 user 정보를 리턴할 필요 없어짐.
  });
}

export async function adminUser(user) {
  try {
    const snapshot = await get(ref(database, 'admins'));
    if (snapshot.exists()) {
      const admins = snapshot.val();
      return { ...user, isAdmin: admins.includes(user.uid) };
    }
    return user;
  } catch (error) {
    console.error(error.message);
  }
}

export async function addNewProduct(product, image) {
  const id = uuid();
  set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    size: product.size.split(','),
  });
}

export async function getProducts() {
  try {
    const snapshot = await get(ref(database, 'products'));
    if (snapshot.exists()) {
      const products = snapshot.val();
      return Object.values(products);
    }
    return [];
  } catch (error) {
    console.error(error.message);
  }
}

export async function addOrUpdateToCart(userId, product) {
  set(ref(database, `carts/${userId}/${product.id}`), product);
}
