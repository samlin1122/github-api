import { useEffect, useRef, useState } from "react";
import Repo from "./components/repo";
import DropDown from "./components/dropdown";
import http from "./http";
import loadingSVG from "./assets/loading.svg";

const org = "Dcard";

const typeList = [
  "all",
  "public",
  "private",
  "forks",
  "sources",
  "member",
  "internal",
];
const sortList = ["created", "updated", "pushed", "full_name"];
const directionList = ["asc", "desc"];

const initalParams = {
  type: typeList[0],
  sort: sortList[0],
  direction: directionList[0],
  per_page: 15,
};

function App() {
  const [state, setState] = useState();
  const [params, setParams] = useState();
  const [loading, setLoading] = useState(!false);
  const [errors, setErrors] = useState();
  const ref = useRef();

  ref.current = { params, state };

  useEffect(() => {
    setParams(initalParams);

    const handleScroll = () => {
      let app = document.querySelector(".App");
      if (window.scrollY + window.innerHeight > app.scrollHeight - 500) {
        if (ref.current.state?.length >= ref.current.params.per_page) {
          let payload = {
            ...ref.current.params,
            per_page: ref.current.params.per_page + 15,
          };
          setParams(payload);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const dispatchReops = async () => {
      try {
        setErrors();
        setLoading(true);
        await http.get(`/orgs/${org}/repos`, { params }).then((res) => {
          console.log("success : ", res);
          setState(res);
        });
      } catch (error) {
        console.error(error.data);
        setState();
        setErrors(error.data);
      } finally {
        setLoading(false);
      }
    };

    if (params) dispatchReops();
  }, [params]);

  const handleSelect = (id, value) => {
    if (params[id] !== value) {
      setParams({ ...params, [id]: value });
    }
  };

  return (
    <div className="App">
      {loading && (
        <div className="App__loading">
          <img src={loadingSVG} alt="loading" />
        </div>
      )}

      <div className="App__search">
        <DropDown
          id="type"
          list={typeList}
          handleSelect={handleSelect}
          value={params}
        />
        <DropDown
          id="sort"
          list={sortList}
          handleSelect={handleSelect}
          value={params}
        />
        <DropDown
          id="direction"
          list={directionList}
          handleSelect={handleSelect}
          value={params}
        />
      </div>
      {state && state.length ? (
        <div className="App__repo">
          {state?.map((item) => (
            <Repo key={`${item.id}`} {...item} />
          ))}
        </div>
      ) : (
        <div>
          {errors ? (
            <a href={errors.documentation_url} rel="noreferrer" target="_blank">
              {errors.message}
            </a>
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
