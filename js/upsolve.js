const apiURL = 'https://codeforces.com/api/';
// Reference 
// Submitted Problems : https://codeforces.com/api/user.status?handle=Fefer_Ivan&from=1&count=10
// Constest List : https://codeforces.com/api/contest.list?gym=false
// https://codeforces.com/api/contest.status?contestId=1538&from=1&count=10&handle=....

let arrayOfSolvedProb = null;
let contestsList = null;
const CFHandleVal = localStorage.getItem('cfval');
window.addEventListener('load', () => {
    //Unsolved
    fetch(`${apiURL}user.status?handle=${CFHandleVal}`)
    .then(res => {
        if(res.ok){
            // console.log("SUCCESS for Unsolved Fetch");
            return res.json();
        }
        else{
            console.log("UNSUCCESSFULL for Unsolved Fetch");
        }
    })
    .then((data) =>{
        // console.log(data.result);
        arrayOfProb=data.result;
        showUnsolvedProblems(arrayOfProb);
    })
    .catch(() =>{
        console.log("ERROR for Unsolved Fetch");
    });

    // Upsolve
    fetch(`${apiURL}contest.list?gym=false`)
    .then(res => {
        if(res.ok){
            // console.log("SUCCESS for Upsolve Fetch-1");
            return res.json();
        }
        else{
            console.log("UNSUCCESSFULL for Upsolve Fetch-1");
        }
    })
    .then((data) =>{
        // console.log(data.result);
        contestsList=data.result;
        showUpsolveProblems(contestsList);
    })
    .catch(() =>{
        console.log("ERROR for Upsolve Fetch-1");
    });
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function showUpsolveProblems(conLis){
    for(var i=0;i<Math.min(conLis.length, 20);i++){
        var obj = conLis[i];
        if(obj.phase==="BEFORE")continue;
        let done = [];
        await delay(1000);
        fetch(`${apiURL}contest.status?contestId=${obj.id}&from=1&count=1000&handle=${CFHandleVal}`)
        .then((res) => {
            if (res.ok) {
                console.log("SUCCESS for Upsolve Fetch-2");
                return res.json();
            } else {
                console.log("UNSUCCESSFULL for Upsolve Fetch-2");
            }
        })
        .then((data) => {
            // console.log(data.result[0]);
            for(var j=0;j<data.result.length;j++){
                if(done.includes(data.result[j].problem.index))continue;
                done[done.length] = data.result[j].problem.index;
            }
        })
        .catch(() => {
            console.log("ERROR for Upsolve Fetch-2");
        });

        // Contest not attempted can be used for virtual contests

        /////////////////////////////////////////////////////////
        const bugaboo = [];
        const   wholeObject = [];
        await delay(1000);
        fetch(`${apiURL}contest.standings?contestId=${obj.id}&from=1&count=2&showUnofficial=true`)
        .then((res) => {
            if (res.ok) {
                console.log("SUCCESS for Upsolve Fetch-3");
                return res.json();
            } else {
                console.log("UNSUCCESSFULL for Upsolve Fetch-3");
            }
        })
        .then((data) => {
            // console.log(data.result.problems);
            for (var j = 0; j < data.result.problems.length; j++) {
                bugaboo.push(data.result.problems[j].index);
                let temp = "";
                if (data.result.problems[j].rating === undefined) {
                    temp = "";
                }else{
                    temp = data.result.problems[j].rating;
                }
                wholeObject[wholeObject.length] = [
                    temp,
                    data.result.problems[j].name,
                    data.result.problems[j].index,
                    data.result.problems[j].contestId
                ];
            }
            var bugabooSize = bugaboo.length;
            for(var j=0;j<done.length;j++){
                const index = bugaboo.indexOf(done[j]);
                if(index>=0){
                    bugaboo.splice(index, 1);
                    wholeObject.splice(index, 1);
                }
            }
            // console.log(done);
            // console.log(bugaboo);
            // console.log(wholeObject);
            if(bugabooSize!=bugaboo.length && wholeObject.length>=1){
                printcardup(wholeObject[0], howManyTillNow());
            }
        })
        .catch(() => {
            console.log("ERROR for Upsolve Fetch-3");
        });
        // console.log(howManyTillNow())
        if(howManyTillNow() === 5){
            break;
        }
    }
}

// For upsolve
const card_1up = document.querySelector('.card-1up');
const card_2up = document.querySelector('.card-2up');
const card_3up = document.querySelector('.card-3up');
const card_4up = document.querySelector('.card-4up');
const card_5up = document.querySelector('.card-5up');
const title_1up = document.querySelector('.title-1up');
const title_2up = document.querySelector('.title-2up');
const title_3up = document.querySelector('.title-3up');
const title_4up = document.querySelector('.title-4up');
const title_5up = document.querySelector('.title-5up');
const inside_1up = document.querySelector('.inside-1up');
const inside_2up = document.querySelector('.inside-2up');
const inside_3up = document.querySelector('.inside-3up');
const inside_4up = document.querySelector('.inside-4up');
const inside_5up = document.querySelector('.inside-5up');
const redirect_1up = document.querySelector('.redirect-1up');
const redirect_2up = document.querySelector('.redirect-2up');
const redirect_3up = document.querySelector('.redirect-3up');
const redirect_4up = document.querySelector('.redirect-4up');
const redirect_5up = document.querySelector('.redirect-5up');


function howManyTillNow(){
    var cnt=0;
    if(card_1up.style.display === "flex"){cnt++;}
    if(card_2up.style.display === "flex"){cnt++;}
    if(card_3up.style.display === "flex"){cnt++;}
    if(card_4up.style.display === "flex"){cnt++;}
    if(card_5up.style.display === "flex"){cnt++;}
    return cnt;
}

function printcardup(problem, counter) {
    switch (counter) {
        case 0:
            card_1up.style.display = "flex";
            title_1up.innerHTML = `${problem[0]}`;
            inside_1up.innerHTML = `${problem[1]}`;
            redirect_1up.href = `https://codeforces.com/contest/${problem[3]}/problem/${problem[2]}`;
            break;
        case 1:
            card_2up.style.display = "flex";
            title_2up.innerHTML = `${problem[0]}`;
            inside_2up.innerHTML = `${problem[1]}`;
            redirect_2up.href = `https://codeforces.com/contest/${problem[3]}/problem/${problem[2]}`;
            break;
        case 2:
            card_3up.style.display = "flex";
            title_3up.innerHTML = `${problem[0]}`;
            inside_3up.innerHTML = `${problem[1]}`;
            redirect_3up.href = `https://codeforces.com/contest/${problem[3]}/problem/${problem[2]}`;
            break;
        case 3:
            card_4up.style.display = "flex";
            title_4up.innerHTML = `${problem[0]}`;
            inside_4up.innerHTML = `${problem[1]}`;
            redirect_4up.href = `https://codeforces.com/contest/${problem[3]}/problem/${problem[2]}`;
            break;
        case 4:
            card_5up.style.display = "flex";
            title_5up.innerHTML = `${problem[0]}`;
            inside_5up.innerHTML = `${problem[1]}`;
            redirect_5up.href = `https://codeforces.com/contest/${problem[3]}/problem/${problem[2]}`;
            break;
    }
}













// For unsolved
const card_1un = document.querySelector('.card-1un');
const card_2un = document.querySelector('.card-2un');
const card_3un = document.querySelector('.card-3un');
const card_4un = document.querySelector('.card-4un');
const card_5un = document.querySelector('.card-5un');
const title_1un = document.querySelector('.title-1un');
const title_2un = document.querySelector('.title-2un');
const title_3un = document.querySelector('.title-3un');
const title_4un = document.querySelector('.title-4un');
const title_5un = document.querySelector('.title-5un');
const inside_1un = document.querySelector('.inside-1un');
const inside_2un = document.querySelector('.inside-2un');
const inside_3un = document.querySelector('.inside-3un');
const inside_4un = document.querySelector('.inside-4un');
const inside_5un = document.querySelector('.inside-5un');
const redirect_1un = document.querySelector('.redirect-1un');
const redirect_2un = document.querySelector('.redirect-2un');
const redirect_3un = document.querySelector('.redirect-3un');
const redirect_4un = document.querySelector('.redirect-4un');
const redirect_5un = document.querySelector('.redirect-5un');

function showUnsolvedProblems(probArray){
    var counter=0;
    const temp = [];
    for(var i = 0; i < probArray.length; i++) {
        var obj = probArray[i];
        if(obj.verdict!="OK"){
            var possible = true;
            for(var j = 0; j<i; j++){
                var objInner = probArray[j];
                if(obj.problem.name===objInner.problem.name && objInner.verdict=="OK"){
                    possible = false;
                    break;
                }
            }
            if(possible===true){
                // console.log(obj.problem);
                var track=0;
                if(temp.length>0){
                    for(var k=0;k<temp.length;k++){
                        if(temp[k]===obj.problem.name){
                            track=1;
                            break;
                        }
                    }
                }
                if(track===1)continue;
                printcardun(obj.problem, counter);
                temp[counter]=`${obj.problem.name}`
                counter++;
                if(counter===5){
                    break;
                }
            }
        }
    }
}


function printcardun(problem, counter){
    if(problem.rating === undefined){
        problem.rating = '';
    }
    switch(counter) {
    case 0:
        card_1un.style.display = "flex";
        title_1un.innerHTML = `${problem.rating}`;
        inside_1un.innerHTML = `${problem.name}`;
        redirect_1un.href = `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`
        break;
    case 1:
        card_2un.style.display = "flex";
        title_2un.innerHTML = `${problem.rating}`;
        inside_2un.innerHTML = `${problem.name}`;
        redirect_2un.href = `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`
        break;
    case 2:
        card_3un.style.display = "flex";
        title_3un.innerHTML = `${problem.rating}`;
        inside_3un.innerHTML = `${problem.name}`;
        redirect_3un.href = `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`
        break;
    case 3:
        card_4un.style.display = "flex";
        title_4un.innerHTML = `${problem.rating}`;
        inside_4un.innerHTML = `${problem.name}`;
        redirect_4un.href = `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`
        break;
    case 4:
        card_5un.style.display = "flex";
        title_5un.innerHTML = `${problem.rating}`;
        inside_5un.innerHTML = `${problem.name}`;
        redirect_5un.href = `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`
        break;
    }
}