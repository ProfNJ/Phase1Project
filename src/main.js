let userSongs = [];
document.body.style.overflow = "hidden";
document.body.style.userSelect = "none";

function getSong(song) {
  if (typeof song != "string") {
    return console.log("please enter the track name");
  }
  let obj = "";

  fetch(
    `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${song}&api_key=${key}&limit=15&format=json`
  )
    .then((rsp) => rsp.json())
    .then((data) => {
      obj = data["results"]["trackmatches"];
      console.log(obj);
      return obj;
    });
}

function getPicture(mbid) {
  let id = "";
  let cover = "";
  fetch(
    `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${key}&mbid=${mbid}&format=json`
  )
    .then((rsp) => rsp.json())
    .then((data) => {
      id = data["track"]["album"]["mbid"];
      console.log(id);
      fetch(
        `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${key}&mbid=${id}&format=json`
      )
        .then((rsp) => rsp.json())
        .then((data) => {
          cover = data.album.image[4]["#text"];
          console.log(cover);
        });
    });
}
