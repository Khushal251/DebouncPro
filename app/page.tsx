

'use client'

import axios from "axios";
// import Image from "next/image";
import { useEffect, useState } from "react";

interface DataItem {
  id: number;
  name: string;
  data: {
    color: string;
    capacity: number;
  };
  time?: string;
  elapsedTime?: number;
}

export default function Home() {

  const [details, setDetails] = useState<DataItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState<DataItem[]>([]);


  const fetchData = async () => {
    // try {
      const response = await axios.get('https://api.restful-api.dev/objects');
      setDetails(response.data);
    // } catch (error) {
    //   console.error("Error Fetiching Data")
    // }
  }

  const printItemwithDelay = (items: DataItem[]) => {
    let index = 0;
    let startTime = Date.now();

    const displayNextItem = () => {
      if (index < items.length) {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);

        startTime = currentTime;

        const currentItem = {
          ...items[index],
          time: new Date().toLocaleDateString(),
          elapsedTime: elapsedTime,
        }

        setDisplayedItems((prev) => [...prev, currentItem]);

        index++;
        setTimeout(displayNextItem, 1000);

      }
    };
    displayNextItem();
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (details.length) {
      printItemwithDelay(details);
    }
  }, [details]);


  return (

    <div >

        <h1 >Debounce AIP Tester</h1>
      <div>
        <ul>
          {displayedItems.map((item, idx) => (

            <li key={item.id}>
              <p><strong>Step:</strong>{idx + 1}</p>
              <p><strong>ID:</strong>{item.id}</p>
              <p><strong>Name:</strong>{item.name}</p>
              <p ><strong>Color:</strong>{item.data?.color || 'Unknown'}</p>
              <p><strong>Capacity:</strong>{item.data?.capacity || 0}</p>
              <p><strong>Displayed At:</strong>{item.time}</p>
              <p><strong>Since Last:</strong>{item.elapsedTime}s</p>

            </li>
          ))}

        </ul>
      </div>
    </div>
  );
}
