import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ytdl from "ytdl-core";
import { useRef } from "react";
import Plyr from "plyr";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
// Render a YouTube video player

function Video(props) {
  // ytdl.getInfo("https://www.youtube.com/watch?v=mS60nG6bJwo").then((res) => {
  //   console.log(res);
  // });
  const { id } = useParams();
  const display = useRef();
  const [name, setname] = useState("name");
  const [isdata, setisdata] = useState(false);
  const [size, setsize] = useState("More");
  const [data, setdata] = useState([]);
  const [display2, setDisplay] = useState("arrow");
  const [align, setAlign] = useState("center");
  const [position, setPosition] = useState("anchor");
  const [viewScroll, setViewScroll] = useState("auto");
  const [direction, setdir] = useState("top");
  const [audio, setaudio] = useState("");

  const [height, setheight] = useState("");

  const disc = useRef();

  useEffect(() => {
    const temp = document.documentElement.clientWidth;
    if (temp < 400) {
      setheight("280px");
    } else {
      setheight("490px");
    }
  }, [height]);
  useEffect(() => {
    async function fetchdata() {
      const res = await fetch(
        `https://youtube.ankit5522.repl.co/link/?link=https://www.youtube.com/watch?v=${id}`
      );
      const result = await res.json();
      console.log(result);
      setdata(result);

      setisdata(true);
      display.current.style.display = "flex";
      const player = new Plyr("#player");
      result.formats.map((ele) => {
        if (ele.itag === 140) {
          setaudio(
            `https://youtube.ankit5522.repl.co/download-video/?url=${encodeURIComponent(
              ele.url
            )}`
          );
        }
      });
    }
    fetchdata();
  }, [id]);

  return (
    <>
      <div className="mainarea" ref={display}>
        <div className="videosection">
          <div className="video">
            {isdata && (
              <>
                <video id="player" controls>
                  {data.formats.map((ele) => {
                    if (ele.hasAudio === true && ele.hasVideo === true) {
                      return (
                        <>
                          <source
                            key={ele.itag}
                            src={`https://youtube.ankit5522.repl.co/download-video/?url=${encodeURIComponent(
                              ele.url
                            )}&length=${ele.contentLength}`}
                            size={ele.height}
                            type="video/mp4"
                          />
                        </>
                      );
                    }
                  })}
                </video>
              </>
            )}
          </div>
          <div className="select">
            <div className="details" onClick={() => {}}>
              Details
            </div>
            <div className="related inactive">Related</div>
          </div>
          <div className="info">
            {isdata && (
              <>
                {" "}
                <p className="vtitle">{data.videoDetails.title}</p>
                <div className="views">
                  <p className="viewsnumber">
                    {data.videoDetails.viewCount} views .
                    {data.videoDetails.uploadDate}
                  </p>
                  <div className="like">
                    <i className="far fa-thumbs-up">
                      {data.videoDetails.likes}
                    </i>
                    <i className="far fa-thumbs-down">
                      {data.videoDetails.dislikes}
                    </i>
                    <Menu
                      menuButton={
                        <button className="download">Download</button>
                      }
                      key={direction}
                      direction={direction}
                      align={align}
                      position={position}
                      viewScroll={viewScroll}
                      arrow={display2 === "arrow"}
                      offsetX={
                        display2 === "offset" &&
                        (direction === "left" || direction === "right")
                          ? 12
                          : 0
                      }
                      offsetY={
                        display2 === "offset" &&
                        (direction === "top" || direction === "bottom")
                          ? 12
                          : 0
                      }
                    >
                      {data.formats.map((ele) => {
                        if (
                          ele.itag === 399 ||
                          ele.itag === 398 ||
                          ele.itag === 397 ||
                          ele.itag === 396 ||
                          ele.itag === 395 ||
                          ele.itag === 394
                        ) {
                          const shorturl2 = ele.url;
                          const lenghtof = shorturl2.length;
                          const index = shorturl2.indexOf("videoplayback");
                          const url = shorturl2.substring(index, lenghtof);
                          const mainurl = "/downloadapi/" + url;

                          return (
                            <MenuItem
                              key={ele.itag}
                              styles={{ color: "black" }}
                            >
                              <a
                                style={{ color: "black", width: "100% " }}
                                href={`https://youtube.ankit5522.repl.co/download-video/?url=${encodeURIComponent(
                                  ele.url
                                )}&length=256`}
                              >
                                {ele.qualityLabel}
                              </a>
                            </MenuItem>
                          );
                        }
                      })}
                    </Menu>
                  </div>
                </div>
                <div className="channel">
                  <div className="avatar">
                    <img
                      src={data.videoDetails.author.thumbnails[2].url}
                      alt=""
                    />
                  </div>
                  <div className="subs">
                    <p className="channelName">
                      {data.videoDetails.author.name}
                    </p>
                    <p className="subcount">
                      {data.videoDetails.author.subscriber_count} subscriber
                    </p>
                  </div>
                </div>
                <div className="discription" ref={disc}>
                  <p className="dis-t">Discription</p>
                  <div className="dis">
                    <p>{data.videoDetails.description}</p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    if (size === "More") {
                      disc.current.style.height = "fit-content";
                      setsize("Less");
                    } else {
                      disc.current.style.height = "60px";
                      setsize("More");
                    }
                  }}
                  className="more"
                >
                  {size}
                </div>
              </>
            )}
          </div>
        </div>
        {/* {//SUGGESTION AREA */}
        <div className="suggestion">
          <p className="related">Related</p>
          <div className="videos">
            {isdata && (
              <>
                {data.related_videos.map((related, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/video/${related.id}`}
                      onClick={() => {
                        setTimeout(() => {
                          window.location.reload();
                        }, 500);
                      }}
                    >
                      <div className="container">
                        <div className="simage">
                          <img src={related.thumbnails[1].url} alt="" />
                        </div>
                        <div className="sinfo">
                          <p className="stitle">
                            {related.title.length < 80
                              ? related.title
                              : related.title.substr(0, 50) + "..."}
                          </p>
                          <p className="schannel">{related.author.name}</p>
                          <p className="sview">{related.view_count}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Video;
