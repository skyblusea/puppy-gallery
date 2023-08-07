import { useQueries, useQuery } from "@tanstack/react-query";

const placeholderData = {
  message: ["/NoPuppy.png", "/NoPuppy.png", "/NoPuppy.png"],
};

export const fetchAllBreeds = async () => {
  const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
  const data = await response.json();
  return Object.keys(data.message);
};

const fetchDogImg = async (breed: string) => {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/3`);
  const data = await response.json();
  return data.message;
};

export const getRandomBreeds = (allBreeds: string[]) => {
  let indexArr: number[] = [];
  //랜덤으로 인덱스 숫자 3개 뽑기
  while (indexArr.length < 3) {
    let randomNum = Math.floor(Math.random() * allBreeds.length);
    //중복 제거
    if (!indexArr.includes(randomNum)) {
      indexArr.push(randomNum);
    }
  }
  //인덱스 숫자를 품종으로 대체
  return indexArr.map((ele) => allBreeds[ele]);
};

export const useDogsQuery = () => {
  const { data: allBreeds } = useQuery(["allBreeds"], fetchAllBreeds);
  const randomBreeds = allBreeds ? getRandomBreeds(allBreeds) : [];
  const useDogsQueries = () =>
    useQueries({
      queries: randomBreeds.map((breed) => ({
        queryKey: ["dogs", breed],
        queryFn: () => fetchDogImg(breed),
      })),
    });
  
  const dogs = useDogsQueries().map((ele) => ele.data);
  console.log(dogs)
  return dogs;
};


