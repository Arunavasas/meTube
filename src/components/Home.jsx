import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import Homesidebar from "./homesidebar";

function Home(props) {
  const [isdata, setisdata] = useState(false);
  const [list, setlist] = useState([]);
  const [loadcom, setloadcom] = useState([]);
  const myState = useSelector((state) => state.setsearch);
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push(i);
    }
    setloadcom(arr);
  }, []);
  useEffect(() => {
    async function fetdata() {
      setisdata(false);

      const res = await fetch(
        `https://youtube.ankit5522.repl.co/video/${myState}`
      );
      const data = await res.json();
      setlist(data);

      setisdata(true);
    }
    fetdata();
  }, [myState]);

  return (
    <>
      <div className="main-container">
        <Homesidebar />
        {isdata && (
          <div className="flex">
            {list.map((list, index) => {
              return list.channelTitle === list.title ? null : (
                <Link key={index} to={`/video/${list.id}`}>
                  <div className="card">
                    <div className="image">
                      <img
                        loading="lazy"
                        src={list.thumbnails.high.url}
                        alt=""
                      />
                    </div>
                    <div className="lowertext">
                      <p className="title">
                        {list.title.length < 80
                          ? list.title
                          : list.title.substr(0, 50) + "..."}
                      </p>
                      <p className="channeltitle">{list.channelTitle}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {!isdata && (
          <div className="flex">
            <SkeletonTheme color="#cccbc8" highlightColor="#d9d6d0">
              {loadcom.map((indx) => {
                return <Skeleton key={indx} width={296} height={200} />;
              })}
            </SkeletonTheme>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
