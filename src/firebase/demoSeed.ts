import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  type QueryConstraint,
} from 'firebase/firestore';
import { db, firebaseConfigured } from './firebase';

const ensureConfigured = () => {
  if (!firebaseConfigured) {
    throw new Error('FIREBASE CONNECTION REQUIRED');
  }
};

const transformDoc = (snapshot: any) => ({ id: snapshot.id, ...snapshot.data() });

export const dataProvider = {
  getList: async ({ resource, pagination, sort, filters }: any) => {
    ensureConfigured();
    const ref = collection(db, resource);
    const constraints: QueryConstraint[] = [];

    if (filters && Array.isArray(filters)) {
      filters.forEach((filter: any) => {
        if (filter.field && filter.operator === 'eq') {
          constraints.push(where(filter.field, '==', filter.value));
        }
      });
    }

    const snapshot = await getDocs(query(ref, ...constraints));
    const items = snapshot.docs.map((item) => transformDoc(item));

    const sorted = sort && sort.field
      ? [...items].sort((a, b) => {
          const modifier = sort.order === 'desc' ? -1 : 1;
          const left = a[sort.field] ?? '';
          const right = b[sort.field] ?? '';
          return (left > right ? 1 : -1) * modifier;
        })
      : items;

    const page = pagination?.current || 1;
    const pageSize = pagination?.pageSize || 25;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      data: sorted.slice(start, end),
      total: sorted.length,
    };
  },

  getOne: async ({ resource, id }: any) => {
    ensureConfigured();
    const ref = doc(db, resource, id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
      throw new Error('Record not found');
    }
    return { data: transformDoc(snapshot) };
  },

  create: async ({ resource, variables }: any) => {
    ensureConfigured();
    const ref = await addDoc(collection(db, resource), {
      ...variables,
      createdAt: new Date().toISOString(),
    });
    return { data: { id: ref.id, ...variables } };
  },

  update: async ({ resource, id, variables }: any) => {
    ensureConfigured();
    const ref = doc(db, resource, id);
    await updateDoc(ref, variables);
    const updated = await getDoc(ref);
    return { data: transformDoc(updated) };
  },

  deleteOne: async ({ resource, id }: any) => {
    ensureConfigured();
    await deleteDoc(doc(db, resource, id));
    return { data: { id } };
  },

  getMany: async ({ resource, ids }: any) => {
    ensureConfigured();
    const results = await Promise.all(
      ids.map(async (id: string) => {
        const snapshot = await getDoc(doc(db, resource, id));
        return snapshot.exists() ? transformDoc(snapshot) : null;
      }),
    );
    return { data: results.filter(Boolean) };
  },

  getApiUrl: () => '/api',
  createMany: async ({ resource, variables }: any) => {
    ensureConfigured();
    const created = await Promise.all(
      variables.map(async (item: any) => {
        const ref = await addDoc(collection(db, resource), {
          ...item,
          createdAt: new Date().toISOString(),
        });
        return { id: ref.id, ...item };
      }),
    );
    return { data: created };
  },
};

export const firestoreUpsert = async (resource: string, payload: Record<string, any>, id?: string) => {
  ensureConfigured();
  if (id) {
    const ref = doc(db, resource, id);
    await setDoc(ref, payload, { merge: true });
    return id;
  }

  const ref = await addDoc(collection(db, resource), payload);
  return ref.id;
};

export const firestoreQuery = async (resource: string) => {
  ensureConfigured();
  const snapshot = await getDocs(collection(db, resource));
  return snapshot.docs.map((item) => transformDoc(item));
};
