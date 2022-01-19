
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let api_key ="";

fetch(video_http + new URLSearchParams({ // use URLSearchParam to add parameters
    key:api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'CA'
}))
.then(res=>res.json()) //after fetching convert to json
.then(data=>{
    data.items.forEach(item=> { //after getting json data. loop through the data to get channel icon
        getChannelIcon(item);
    })
})
.catch(err=>console.log(err));

let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

const getchannelIcon = (video_data) =>{
    fetch(channel_http + new URLSearchParams({
        key : api_key,
        part: 'snippet',
        id: video_data.snippet.channel1Id
    }))
    .then(res=>res.json())
    .then(data=>{
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const videoCardContainer = document.querySelector('.video-container');

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
    < img src = "${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
    <div class="content">
    <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})

function w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
    document.querySelector(".filters").style.left = "250px";
    document.querySelector(".filters").style.width = "calc(100% - 250px)";
    document.querySelector("side-bar").style.transition = "1s";
  }
  function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
    document.querySelector(".filters").style.left = "0px";
    document.querySelector(".filters").style.width = "calc(100% - 0px)";
  }
