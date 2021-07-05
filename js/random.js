// profile elements
const apiURL = 'https://codeforces.com/api/';

window.addEventListener('load', () => {
    fetch(`${apiURL}problemset.problems`)
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
    const CFHandleVal = localStorage.getItem('cfval');
    return fetch(`${apiURL}user.status?handle=${CFHandleVal}`)
    .then(resp => {
        if(resp.ok){
            console.log("SUCCESS1");
            return resp.json();
        }
        else{
            console.log("UNSUCCESSFULL1");
        }
    })
    .then((dataa) =>{
        const done = dataa.result;
        // console.log(data.result);
        const allprbs = data.result;
        problem(allprbs,done);
    })
    .catch(() =>{
        console.log('ERROR1');
    });
    })
    .catch(() =>{
        console.log('ERROR');
    });
});

// For Debugging
// const prb1 = document.getElementById("prb1");
// const prb2 = document.getElementById("prb2");
// const prb3 = document.getElementById("prb3");


// For suggested problems
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

function problem(prbs,done){
    var r=800;
    const rat=localStorage.getItem('rat');

    if(rat!=undefined){
        if(100*Math.ceil(rat/100)-rat>rat-100*Math.floor(rat/100)){
            r=100*Math.floor(rat/100);
        }else{
            r=100*Math.ceil(rat/100);
        }
        
    }
    var f=0;
    const map1=new Map();
    for(let i=0;i<done.length;i++){
        if(done[i].verdict=="OK"){
            map1.set(done[i].problem.name,1);
        }
    }
    
    // console.log(prbs.problems);

    for(let i=0;i<prbs.problems.length;i++){
        if(prbs.problems[i].rating>=r-200 && prbs.problems[i].rating<=r+200){
            if(map1.get(prbs.problems[i].name)!=1){
                printcardun(prbs.problems[i], f);
                f++;
                if(f==5){
                    break;
                }
            }

            // For Debugging
            // if(f==3){
            //     if(map1.get(prbs.problems[i].name)!=1){
            //         f--;
            //         var div = document.createElement('a');
            //         div.innerHTML=`${prbs.problems[i].name}`;
            //         div.setAttribute('href',`https://codeforces.com/contest/${prbs.problems[i].contestId}/problem/${prbs.problems[i].index}`);
            //         prb1.appendChild(div);
            //     }
            // }else if(f==2){
            //     if(map1.get(prbs.problems[i].name)!=1){
            //         f--;
            //         var div = document.createElement('a');
            //         div.innerHTML=`${prbs.problems[i].name}`;
            //         div.setAttribute('href',`https://codeforces.com/contest/${prbs.problems[i].contestId}/problem/${prbs.problems[i].index}`);
            //         prb2.appendChild(div);    
            //     }       
            // }else if(f==1){
            //     if(map1.get(prbs.problems[i].name)!=1){
            //         f--;
            //         var div = document.createElement('a');
            //         div.innerHTML=`${prbs.problems[i].name}`;
            //         div.setAttribute('href',`https://codeforces.com/contest/${prbs.problems[i].contestId}/problem/${prbs.problems[i].index}`);
            //         prb3.appendChild(div);
            //     }
            // }else break;  
        }
    }
}

function printcardun(problem, counter) {
    switch (counter) {
        case 0:
            card_1un.style.display = "flex";
            title_1un.innerHTML = `${problem.rating}`;
            inside_1un.innerHTML = `${problem.name}`;
            redirect_1un.href = `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`;
            break;
        case 1:
            card_2un.style.display = "flex";
            title_2un.innerHTML = `${problem.rating}`;
            inside_2un.innerHTML = `${problem.name}`;
            redirect_2un.href = `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`;
            break;
        case 2:
            card_3un.style.display = "flex";
            title_3un.innerHTML = `${problem.rating}`;
            inside_3un.innerHTML = `${problem.name}`;
            redirect_3un.href = `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`;
            break;
        case 3:
            card_4un.style.display = "flex";
            title_4un.innerHTML = `${problem.rating}`;
            inside_4un.innerHTML = `${problem.name}`;
            redirect_4un.href = `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`;
            break;
        case 4:
            card_5un.style.display = "flex";
            title_5un.innerHTML = `${problem.rating}`;
            inside_5un.innerHTML = `${problem.name}`;
            redirect_5un.href = `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`;
            break;
    }
}