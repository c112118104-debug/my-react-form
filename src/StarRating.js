import React, {useState} from 'react';
import { FaStarOfDavid } from "react-icons/fa";

// 建立一個指定長度的陣列
const createArray = length => [...Array(length)];

// 單一星星的元件
const Star = ({ selected = false, onSelect = f => f }) => (
  <FaStarOfDavid color={selected ? "red" : "grey"} onClick={onSelect} />
);

export default function StartRating({totalStars = 5}){
  // 紀錄目前選擇的星星數量
  const [selectedStars, setSelectedStars] = useState(2); 

  return(
    <>
      {createArray(totalStars).map((_, i) =>(
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </>
  );
}