import {
  DocumentData,
  DocumentReference,
  Query,
  getDoc,
  getDocs,
} from "firebase/firestore";

export type GetFirestoreData = {
  doc?: DocumentReference;
  query?: Query<unknown, DocumentData>;
};
export const getFirestoreData = async ({ doc, query }: GetFirestoreData) => {
  if (doc) {
    const docSnap = await getDoc(doc);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } else if (query) {
    const querySnapshot = await getDocs(
      query as unknown as Query<unknown, DocumentData>
    );

    console.log({ querySnapshot });

    const data = [...querySnapshot.docs].map((doc) => {
      // doc.data() is never undefined for query doc snapshots
      return { id: doc.id, data: doc.data() };
    });

    return data;
  }
};
