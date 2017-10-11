let query = 'cats';
getReq('https://www.reddit.com/r/php/search.json?q=' + query + '&limit=5', processAjax);


let newPosts = [];
function getReq(url, callback){
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function(){
        if(req.readyState === 4 && req.status === 200){
            callback(JSON.parse(req.responseText));
        }
        else{
            console.log('error', req.statusText);
        }
    }
    req.send(null);
}

function processAjax(object){
	const postList = getPostInfo(object);
	loadData();
}

function getPostInfo(postObject) {
	// We will explain the 'postData => {' syntax on Tuesday
	postObject.data.children.forEach(postData => {
		const post = { title: '', url: '' };

		postData = postData.data;
		post.title = postData.title;
		post.url = postData.url;
		newPosts.push(post);
	});

	return newPosts;
}

function loadData() {
	newPosts.forEach(post => {
		// Manipulate the data here!
    let animalPost = document.getElementById('posts');
    let link = document.querySelector('.link');
    let item = document.querySelector('.item');
    link.textContent = post.title;
    link.setAttribute('href', post.url)
    item.appendChild(link);
    animalPost.appendChild(item);
	})
}

var button = document.querySelector('.submit');
var input = document.querySelector('.input-box');
button.addEventListener('click', function(e) {
  e.preventDefault();
    newPosts = [];
    query = input.value;
    getReq('https://www.reddit.com/r/php/search.json?q=' + query + '&limit=5', processAjax);
    input.value = '';
});
