const images = [
  "0.jpeg",
  "1.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "8.jpeg",
  "9.jpeg",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
// <img> html 대신에 javascript로 요소 만들기

bgImage.src = `img/${chosenImage}`; // <img> 에 src 속성 만들어주고 그 안에 들어갈 랜덤한 이미지 넣어주기
bgImage.style.position = "fixed";
bgImage.style.top = "0";
bgImage.style.left = "0";
bgImage.style.width = "100%";
bgImage.style.height = "100%";
bgImage.style.zIndex = "-1";
bgImage.style.backgroundSize = "cover";

document.body.appendChild(bgImage);
// 랜덤한 이미지까지 추가한 변수를 body 안에 넣어줌으로써 최종적으로 보여주기
