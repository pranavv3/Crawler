// index.html elements
const handle = document.querySelector('.cfHandle');
const loginBtn = document.querySelector('.cfHandle-btn');
const empty = document.querySelector('.emptyError');
const apiURL = 'https://codeforces.com/api/';

// if enter pressed
handle.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        loginBtn.click();
    }
});

// if login clicked
loginBtn.addEventListener('click' , () =>{
    if(handle.value === ''){
        // css
        empty.classList.add('emptyError');
        // html
        empty.innerHTML ='Please enter some handle';
        setTimeout(()=> empty.innerHTML = '', 3000);
        handle.addEventListener('click', () =>{
            empty.innerHTML = '';
        });
    }
    else{
        localStorage.setItem("cfval", handle.value);
        fetch(`${apiURL}user.info?handles=${handle.value}`)
        .then(res => {
                if (res.ok) {
                    console.log("SUCCESS");
                    handle.value = '';
                    window.open('html/profile.html', '_top');
                }
                else {
                    empty.classList.add('empty');
                    empty.innerHTML = 'Server-end Error or handle maybe invalid';
                    setTimeout(() => empty.innerHTML = '', 3000);
                    console.log("UNSUCCESSFULL");
                }
            })
            .then((data) => {
                console.log(data.result[0]);
                const allDetails = data.result[0];
                showDetails(allDetails);
            })
            .catch(() => {
                console.log('ERROR');
            });
    }
});
