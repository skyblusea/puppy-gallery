const getDogs = () => {
  const fetchingBreeds = async (): Promise<string[]> => {
    try {
      //전체 리스트 받기
      const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
      const data = await response.json();
      const allBreeds = Object.keys(data.message);
      //랜덤으로 인덱스 숫자 3개 뽑기
      let indexArr = [];
      while (indexArr.length < 3) {
        let randomNum = Math.floor(Math.random() * allBreeds.length);
        if (!indexArr.filter((ele) => ele === randomNum).length) {
          indexArr.push(randomNum);
        }
      }
      //인덱스 숫자를 품종으로 대체
      const randomBreeds = indexArr.map((ele) => allBreeds[ele]);
      return randomBreeds;
    } catch (error) {
      console.error("Error fetching dog breeds:", error);
      throw error;
    }
  };
  //품종별 사진 가져오기
  const fetchingDogs = async (breed: string) => {
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
    const breeds = await fetchingBreeds();
    const contents = await Promise.allSettled(breeds.map(fetchingDogs)); //!breeds 배열을 돌며 fetchingDogs 함수 적용
    // Promise.all(breeds.map((breed) => (fetchingDogs(breed))));)
    const fulfilledContents = contents.filter(
      (result): result is PromiseFulfilledResult<any> => result.status === "fulfilled"
      //! 타입가드를 사용하는 이유 ?
      //! TypeScript does not know if the type is PromiseFulfilledResult / PromiseRejectedResult when checking types.
    );
    const dogsData = fulfilledContents.map((result, idx) => ({
      breed: breeds[idx],
      urls: result.value,
    }));
    return dogsData
  };
  const data = fetchData();

  return data;
};

export default getDogs;
