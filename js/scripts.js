getReq('https://www.reddit.com/r/php/search.json?q=cats&limit=5', processAjax);
getReq('https://www.reddit.com/r/php/search.json?q=dogs&limit=5', processAjax);

const newPosts = [];
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
    let link = document.createElement('a');
    let item = document.createElement('li');
    link.textContent = post.title;
    link.setAttribute('href', post.url)
    item.appendChild(link);
    animalPost.appendChild(item);
    console.log(post.url);
	})
  let button = document.querySelector('.submit');
  button.addEventListener('click', function(e) {
    e.preventDefault();
    if(button.value){
    //if submit button is clicked
    //grab reddit dog posts
    //run through loadData function so it will post to html
  }
});
}
