import 'firebase/firestore';
import { doc, collection, query } from 'firebase/firestore';
import { useFirestoreDocData, useFirestore, useFirestoreCollectionData } from 'reactfire';


interface Props {
    
  }
  
  export const Test: React.FunctionComponent<Props> = ({  }) => {
    // easily access the Firestore library
    const testRef = doc(useFirestore(), 'beauhaus', 'HImk6NhCoxaDon3tv0dq');
    const { status, data } = useFirestoreDocData(testRef, {idField: 'id',});
    const firestore = useFirestore();

    const testCollection = collection(firestore, 'beauhaus');
   
    const testQuery = query(testCollection);
    const testDoc = doc(useFirestore(), 'beauhaus', 'HImk6NhCoxaDon3tv0dq');
   const notesCollection = collection(firestore, `beauhaus/${data?.id}/notes`);
   
    const notesQuery = query(notesCollection)

    const { status: collectionStatus, data: collectionData } = useFirestoreCollectionData(testQuery, {
      idField: 'id',
    });

    const { status: notesStatus, data: notesData } = useFirestoreCollectionData(notesQuery, {
      idField: 'id',
    });
  
    // subscribe to a document for realtime updates. just one line!
    
    console.log(data?.firstName)

    if(collectionData) {
      console.log(collectionData[0])
    }

    if(notesData) {
      console.log(notesData)
      console.log(notesData[0].date.toDate())
    }
    
  
    // easily check the loading status
    if (status === 'loading') {
      return <p>Fetching data...</p>;
    }
  
    return <p>First Name: {data.firstName}</p>;
  }

  export default Test