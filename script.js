const displayCard = document.querySelector('.displayContainte');
const navBtn = document.querySelector('.navButtons');
let url= "https://kitsu.io/api/edge/anime";
let Name,poster,coverPage,getCardData,coverPoster, getCoverData;

const DisplayImg = (async()=>
    {
        displayCard.innerHTML=" ";
        let gettingData = await fetch(`${url}`).catch(error => {alert(`There is some problem while fatching the Url: ${url}`)});
        let getData= await gettingData.json().catch(error => {alert(`There is some problem while fatching the Url: ${url}`)});
        let storeData = getData.data;
        for(let i=0; i<storeData.length; i++){

        coverPage= storeData[i].attributes;
        poster = coverPage.posterImage.large;
        Name = coverPage.titles.en_jp;

        let gettingData = 
                        `<div class="animeThumbnailContainer" onclick="moreInfo(${i})">
                                <img class="thumbnail" src="${poster}" alt="${poster}">
                                <div class="animeNameContainer">
                                    <h5 class="animeName">${Name}</h5>
                            </div>
                        </div>
                        `;
        getCardData = document.createElement('div');
        getCardData.setAttribute('class',`col-lg-2 col-md-3 col-sm-4 col-6 Container`);
        getCardData.innerHTML = gettingData;
        displayCard.append(getCardData);
    }
    navBtn.innerHTML =`
        <button class="btn m-2 btun1" id="button" type="button" onclick="First()">First</i></button>
        <button class="btn m-2 btun1" id="button" type="button" onclick="preAnime()"><i class="fas fa-chevron-circle-left"></i></button>
        <button class="btn m-2 btun2" id="button" type="button" onclick="nextAnime()"><i class="fas fa-chevron-circle-right"></i></button>
        <button class="btn m-2 btun1" id="button" type="button" onclick="Last()">Last</i></button>
        `;
});

const First = async () => 
    {   
        let gettingPreData = await fetch(`${url}`).catch(() => {alert(`There is some problem while fatching the Url: ${url}`)});
        let getPreData= await gettingPreData.json().catch(error => {alert(`There is some problem while fatching the Url: ${url}`)});
        let storePreData = getPreData.links;
        if(storePreData.prev==null)
        {
            alert(`Your are already on first page...!!!`);
            displayCard.innerHTML=" ";
            url = `https://kitsu.io/api/edge/anime`;
            DisplayImg();
        }
        else
        {   
            url=storePreData.first;
            displayCard.innerHTML=" ";
            DisplayImg();
        }
    }

const preAnime = async () => 
    {   
        let gettingPreData = await fetch(`${url}`).catch(() => {alert(`There is some problem while fatching the Url: ${url}`)});
        let getPreData= await gettingPreData.json().catch(error => {alert(`There is some problem while fatching the Url: ${url}`)});
        let storePreData = getPreData.links;
        url=storePreData.prev;
        if(storePreData.prev==null)
        {
            alert(`Your are already on first page...!!!`);
            displayCard.innerHTML=" ";
            url = `https://kitsu.io/api/edge/anime`;
            DisplayImg();
        }
        else
        {   
            displayCard.innerHTML=" ";
            DisplayImg();
        }
    }
   

const nextAnime = async() => 
    {   
        let gettingNextData = await fetch(`${url}`).catch(() => {alert(`There is some problem while fatching the Url: ${url}`)});
        let getNextData= await gettingNextData.json().catch(error => {alert(`There is some problem while fatching the Url: ${url}`)});
        let storeNextData = getNextData.links;      
        url=storeNextData.next;
        if(storeNextData.next==null)
        {
            alert(`Your are on the Last page...!!!`)
            url ="https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=17254";
            DisplayImg();
        }
        else
        {     
        displayCard.innerHTML=" ";
        DisplayImg();
        }
    }

const Last = async() => 
    {   
        let gettingNextData = await fetch(`${url}`).catch(() => {alert(`There is some problem while fatching the Url: ${url}`)});
        let getNextData= await gettingNextData.json().catch(error => {alert(`There is some problem while fatching the Url: ${url}`)});
        let storeNextData = getNextData.links; 
        if(storeNextData.next==null)
        {
            alert(`Your are on the Last page...!!!`)
            url ="https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=17254";
            DisplayImg();
        }
        else
        {          
        url=storeNextData.last;
        displayCard.innerHTML=" ";
        DisplayImg();
        }
    }

const moreInfo =async (n)=>{
    displayCard.innerHTML=" ";
    let gettingCoverInfo = await fetch(`${url}`).catch(error => {alert(`There is some problem while fatching the Url: ${url}`)});
    let getCoverData= await gettingCoverInfo.json().catch(error => {alert(`There is some problem while fatching the Url: ${url}`)});
    let storeCoverData = getCoverData.data;
    coverPage= storeCoverData[n].attributes;
    console.log(coverPage);

        if(coverPage.coverImage==null){
            coverPoster='https://media.moddb.com/cache/images/downloads/1/195/194908/thumb_620x2000/MOSHED-2020-2-20-22-48-16.gif';
        }
        else{
            coverPoster=  coverPage.coverImage.small;
        }

        let japName= coverPage.titles.ja_jp;
        let ageRatingGuide= coverPage.ageRatingGuide;
        let startDate= coverPage.startDate;
        let ageRating= coverPage.ageRating;
        let episodeCount = coverPage.episodeCount;
        let averageRating = coverPage.averageRating;
        let description = coverPage.description;
        Name = coverPage.titles.en_jp;
        navBtn.innerHTML ="";

    let gettingCoverData = 
                    `
                    <nav>
                        <img class="coverImg w-100 mt-1" src="${coverPoster}" alt="${coverPoster}">
                    </nav>
                    <div class="coverInfo  w-100">
                        <div class="coverTitleHead mt-3 m-1">
                            <h1 class="coverTitle align-self-end col-12 col-sm-9 col-md-7 col-lg-5">${Name}</h1><h3 class="col-12 col-sm-9 col-md-7 col-lg-5 coverTitle2 align-self-end">${japName}</h3>
                        </div>
                    </div>
                    <div class="m-2">
                        <div class="row"><h5 class="col-5 col-sm-5 col-md-4 col-lg-3 text-muted">${startDate}</h5><h5 class="col-7 col-sm-5 col-md-4 col-lg-3 text-muted">Avg. Rating${averageRating}</h5></div>
                        <div class="row"><h5 class="col-5 col-sm-5 col-md-4 col-lg-3 text-muted">Age Rating: ${ageRating}</h5><h5 class="col-7 col-sm-7 col-md-8 col-lg-8 text-muted">Age Rating Guide: ${ageRatingGuide}</h5></div>
                        <div class="row"><h4 class="col-9  text-muted">Totle Episodes: ${episodeCount}</h4></div>
                    </div>
                    <div class="discription">
                        <h5 class="m-2 text-muted">${description}</h5>
                    </div>
                    `;
    getCoverData = document.createElement('div');
    getCoverData.setAttribute('class',`CoverPageCreated`);
    navBtn.innerHTML =`<button class="btn m-2" id="button" type="button" onclick="DisplayImg()"><i class="fas fa-long-arrow-alt-left"></i></button>`;
    getCoverData.innerHTML = gettingCoverData;
    displayCard.append(getCoverData);
}

DisplayImg();

