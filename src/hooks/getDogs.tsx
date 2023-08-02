import { deadline, isValidTime } from "../helper/time"
const cache = new Map<string, string[]>();
const allBreeds = new Set<string>();
const time = new Map<string, Date>();


const getDogs = () => {

  const fetchingAllBreeds = async () => {
    "use server"
    if (allBreeds.size) {
      console.log("리스트 캐시 이용");
      return [...allBreeds];
    }
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/list/all`, { cache: 'no-store' });
      const data = await response.json();
      Object.keys(data.message).forEach(e => allBreeds.add(e))
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
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/3`, { cache: 'no-store' });
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
      console.log("패치 캐시 이용");
      return [...cache]
    }
    console.log("패치 시작 캐시에 저장된 데이터->", [...cache])
    const breeds = await getRandomBreeds();
    const contents = await Promise.allSettled(breeds.map(fetchingDogs)); //!breeds 배열을 돌며 fetchingDogs 함수 적용
    // Promise.all(breeds.map((breed) => (fetchingDogs(breed))));)
    const fulfilledContents = contents.filter(
      (result): result is PromiseFulfilledResult<any> => result.status === "fulfilled"
      //! 타입가드를 사용하는 이유 ?
      //! TypeScript does not know if the type is PromiseFulfilledResult / PromiseRejectedResult when checking types.
    );
    const rejectedContents = contents.filter(
      (result): result is PromiseRejectedResult => result.status === "rejected"
    );
    fulfilledContents.forEach((result, idx) => cache.set(breeds[idx], result.value));
    console.log("패치 완료 캐시에 저장된 데이터->", [...cache])
    //캐싱 만료 시간 설정
    time.set("deadline", deadline())
    return [...cache]
  };

  const cacheRevalidation = async () => {
    "use server"
    if (!isValidTime(time.get("deadline"))) {
      console.log("캐싱 만료")
      cache.clear()
      time.clear()
    }
    return fetchData();

  }


  const clearData = async () => {
    "use server"
    cache.clear()
    time.clear()
  };

  return { fetchData, clearData, cacheRevalidation };
};

export default getDogs;
