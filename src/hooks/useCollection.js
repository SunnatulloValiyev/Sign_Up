import { useEffect, useState } from "react";
import{db} from "../firebase/config"
import { collection, onSnapshot, snapshotEqual } from "firebase/firestore";


export function useCollection(e) {
    const [data, setData] = useState(null);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection
            (db, c), (snapshot) => {
                const data = [];
                snapshot.forEach((d) => {
                    data.push({id: d.id, ...d.data()});
                });
                setData(data)
            });
            return () => unsubscribe();
    }, [c]);
    return { data }
}