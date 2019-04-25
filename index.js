"use strict";
( function() {
    window.onload = handler;
    setInterval(getPosts, 3000);

    function handler() {
        getPosts();
        let press = document.getElementById("click");
        press.onclick = function() {
        let postText = document.getElementById("box").value;
        post(postText);
        };
    }

    function getPosts() {
        let url = "http://localhost:3014";
        fetch(url)
            .then(checkStatus)
            .then(function(responseText) {
                let postBox = document.getElementById('posts');
                postBox.innerHTML = '';
                let newPosts = JSON.parse(responseText);
                let x = null;
                for (x in newPosts) {
                    let newPost = document.createElement('div');
                    let newPostText = document.createTextNode(newPosts[x]);
                    newPost.appendChild(newPostText);
                    postBox.appendChild(newPost);
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    function post(postText) {
        let url = "http://localhost:3014";
        const message = {sup : postText};
        message['user'] = document.getElementById('user').value;
        message['pass'] = document.getElementById('pass').value;
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        };
        fetch(url, fetchOptions)
            .then(checkStatus)
            .then(function(responseText) {
                console.log(responseText);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
        
    

    function checkStatus(response) {  
        if (response.status >= 200 && response.status < 300) {  
            return response.text();
        } else if (response.status == 404) {
            return Promise.reject(new Error("Page does not exist")); 
        } else {  
            return Promise.reject(new Error(response.status+": "+response.statusText)); 
        } 
    }
})();