import { doc, getDoc } from "firebase/firestore";
import { db } from "./setup";

export type GetFirestoreData = {
  collectionName: string;
  document: string;
};
export const getFirestoreData = async ({
  collectionName,
  document,
}: GetFirestoreData) => {
  const docRef = doc(db, collectionName, document);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
