import { FC } from "react";
import Dogs from "./Dogs";

interface SSRPuppyGalleryProps {
  dogs : [string, string[]][]
}

const CSRPuppyGallery: FC<SSRPuppyGalleryProps> = ({ dogs }) => {
  return (
    <div className="table">
    {dogs.map((dog) => {
      return (
        //! initialState 때문에 key값이 똑같은 경우가 있음
        !!dog && <Dogs key={dog[0]} dog={dog} />
      );
    })}
  </div>
  );
};

export default CSRPuppyGallery;
