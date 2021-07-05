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
        console.log(data.result);
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

const prb1 = document.getElementById("prb1");
const prb2 = document.getElementById("prb2");
const prb3 = document.getElementById("prb3");

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
    var f=3;
    const map1=new Map();
    for(let i=0;i<done.length;i++){
        if(done[i].verdict=="OK"){
            map1.set(done[i].problem.name,1);
        }
    }
    

    for(let i=0;i<prbs.problems.length;i++){
        if(prbs.problems[i].rating==r){
            if(f==3){
            if(map1.get(prbs.problems[i].name)!=1){
            f--;
            var div = document.createElement('a');
            div.innerHTML=`${prbs.problems[i].name}`;
          div.setAttribute('href',`https://codeforces.com/contest/${prbs.problems[i].contestId}/problem/${prbs.problems[i].index}`);
          prb1.appendChild(div);

            // console.log(map1.get(prbs.problems[i]));
            }
          }else if(f==2){
            if(map1.get(prbs.problems[i].name)!=1){
            f--;
            var div = document.createElement('a');
            div.innerHTML=`${prbs.problems[i].name}`;
          div.setAttribute('href',`https://codeforces.com/contest/${prbs.problems[i].contestId}/problem/${prbs.problems[i].index}`);
          prb2.appendChild(div);    
          }       
          }else if(f==1){
            if(map1.get(prbs.problems[i].name)!=1){
            f--;
            var div = document.createElement('a');
            div.innerHTML=`${prbs.problems[i].name}`;
          div.setAttribute('href',`https://codeforces.com/contest/${prbs.problems[i].contestId}/problem/${prbs.problems[i].index}`);
          prb3.appendChild(div);
            }
          }else break;  
        }
    }

}
