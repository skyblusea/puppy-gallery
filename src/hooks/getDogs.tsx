const cache = new Map<string,string[]>();
const allBreeds = new Set<string>();


const getDogs = () => {
  
  const fetchingAllBreeds = async () => {
    "use server"
    if (allBreeds.size) {
      return [...allBreeds];
    }
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
      const data = await response.json();
      Object.keys(data.message).forEach(e=> allBreeds.add(e))
      return [...allBreeds];
    } catch (error) {
      console.error("Error fetching dog breed lists", error);
      throw error;
    }
  };

  const getRandomBreeds = async () => {
    "use server"
    const allBreeds = await fetchingAllBreeds();
    let indexArr = [];
    //랜덤으로 인덱스 숫자 3개 뽑기
    while (indexArr.length < 3) {
      let randomNum = Math.floor(Math.random() * allBreeds.length);
      if (!indexArr.filter((ele) => ele === randomNum).length) {
        indexArr.push(randomNum);
      }
    }
    //인덱스 숫자를 품종으로 대체
    const randomBreeds = indexArr.map((ele) => allBreeds[ele]);
    return randomBreeds;
  };

  //품종별 사진 가져오기
  const fetchingDogs = async (breed: string) => {
    "use server"
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/3`);
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("Error fetching dog pictures:", error);
      //!error throw 시켜야 data.message 가능
      throw error;
    }
  };

  const fetchData = async () => {
    "use server"
    if (cache.size >= 3) {
      console.log("캐싱 이용");
      return [...cache]
    }
    const breeds = await getRandomBreeds();
    const contents = await Promise.allSettled(breeds.map(fetchingDogs)); //!breeds 배열을 돌며 fetchingDogs 함수 적용
    // Promise.all(breeds.map((breed) => (fetchingDogs(breed))));)
    const fulfilledContents = contents.filter(
      (result): result is PromiseFulfilledResult<any> => result.status === "fulfilled"
      //! 타입가드를 사용하는 이유 ?
      //! TypeScript does not know if the type is PromiseFulfilledResult / PromiseRejectedResult when checking types.
    );
    fulfilledContents.forEach((result, idx) => cache.set(breeds[idx], result.value));
    return [...cache]
  };

  const clearData = async() => {
    "use server"
    cache.clear()
  };

  return { fetchData, clearData };
};

export default getDogs;
