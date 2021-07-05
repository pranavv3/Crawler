// profile elements
const apiURL = 'https://codeforces.com/api/';

window.addEventListener('load', () => {
    const CFHandleVal = localStorage.getItem('cfval');
    fetch(`${apiURL}user.info?handles=${CFHandleVal}`)
    .then(res => {
        if(res.ok){
            console.log("SUCCESS");
            return res.json();
        }
        else{
            console.log("UNSUCCESSFULL");
        }
    })
    .then((data) =>{
        console.log(data.result[0]);
        const allDetails = data.result[0];
        showDetails(allDetails);
    })
    .catch(() =>{
        console.log('ERROR');
    });
});

const titlephoto = document.querySelector(".titlephoto")
const avatar = document.querySelector(".avatar")
const handle = document.querySelector(".profile-handle")
const email = document.querySelector(".email")
const fullname = document.querySelector(".fullname")
const rating = document.querySelector(".rating")
const maxrating = document.querySelector(".maxrating")
const countrycity = document.querySelector(".countrycity")
const organisatation = document.querySelector(".organisatation")
const contribution = document.querySelector(".contribution")
const lastseen = document.querySelector(".lastseen")
const friendof = document.querySelector(".friendof")
const userdesc = document.querySelector(".userdesc")

function showDetails(info){

    strrating(info.rating);
    
    renderImage(info.titlePhoto, titlephoto);
    // renderImage(info.avatar, avatar);
    if(info.handle != undefined){
        ratingColor(info.rating, handle);
        handle.innerHTML = `${info.handle}`;
    }
    if(info.email != undefined){
        email.innerHTML = `${info.email}`;
    }
    if(info.firstName != undefined){
        ratingColor(info.firstName, fullname);
        fullname.innerHTML = `${info.firstName} `;
        if(info.lastName != undefined){
            ratingColor(info.lastName, fullname);
            fullname.innerHTML += `${ info.lastName }`;
        }
    }
    if(info.rating != undefined){
        userdesc.style.color = ratingColor(info.rating, rating);
        rating.innerHTML += `${info.rating}`;
    }
    if(info.maxRating != undefined){
        ratingColor(info.maxRating, maxrating);
        maxrating.innerHTML = `${info.maxRating}`;
    }
    // add city
    if(info.country != undefined){
        countrycity.innerHTML = `${info.country}`;
    }
    if(info.organizataion != undefined){
        organisatation.innerHTML = `${info.organizatation}`;
    }
    if(info.contribution != undefined){
        contribution.innerHTML = `${info.contribution}`;
    }
    if(info.lastOnlineTimeSeconds != undefined){
        lastseen.innerHTML = `${normalTime(info.lastOnlineTimeSeconds)}`;
    }
    if(info.friendOfCount != undefined){
        friendof.innerHTML = `${info.friendOfCount}`;
    }
}

function ratingColor(userRating, ele){
    var usercolor = '';
    if (userRating <= 1199) { usercolor = "#808080"; userdesc.innerHTML = `Newbie`}
    else if (userRating <= 1399 && userRating >= 1200) { usercolor = "#008000"; userdesc.innerHTML = `Pupil`}
    else if (userRating <= 1599 && userRating >= 1400) { usercolor = "#03A89E"; userdesc.innerHTML = `Specialist`}
    else if (userRating <= 1899 && userRating >= 1600) { usercolor = "#0000FF"; userdesc.innerHTML = `Expert`}
    else if (userRating <= 2199 && userRating >= 1900) { usercolor = "#AA00AA"; userdesc.innerHTML = `Candidate Master`}
    else if (userRating <= 2299 && userRating >= 2200) { usercolor = "#FF8C00"; userdesc.innerHTML = `Master`}
    else if (userRating <= 2399 && userRating >= 2300) { usercolor = "#FF8C00"; userdesc.innerHTML = `International Master`}
    else if (userRating <= 2599 && userRating >= 2400) { usercolor = "#FF0000"; userdesc.innerHTML = `Grandmaster`}
    else if (userRating <= 2899 && userRating >= 2600) { usercolor = "#FF0000"; userdesc.innerHTML = `International Grandmaster`}
    else if (userRating >= 2900) { usercolor = "#FF0000"; userdesc.innerHTML = 'Legendary Grandmaster'}
    ele.style.color = usercolor;
    return usercolor;
}

function normalTime(val){
    let unix_timestamp = val
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Will display time in 10Hr 30Min format
    var formattedTime = hours + 'Hr ' + minutes.substr(-2) + 'Min ';
    return formattedTime;
}

function renderImage(path, ele) {
    var img = new Image();
    img.src = path;
    ele.appendChild(img);
}

   function strrating(rating){
    localStorage.setItem("rat",rating);
   }
