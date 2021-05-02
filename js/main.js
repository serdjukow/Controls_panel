const body = document.querySelector('body')
const photosGallery = document.querySelector('#photos-gallery')
const albumsRow = document.querySelector('#users-albums')

const currentDate = document.querySelector('.currentDate-count')
let Data = new Date();
let Year = Data.getFullYear();
let Month = Data.getMonth();
let Day = Data.getDate();
currentDate.innerHTML =
	`
${Day} / ${Month + 1} / ${Year}
`

const usersBD = 'https://jsonplaceholder.typicode.com'
const getUsers = async () => {
	const response = await fetch(`${usersBD}/users`)
	const users = await response.json()
	countUsers(users)
	renderUsers(users)
	userListener()
}

/* 
* sefsfsefs
! sefse  
? sefse 
todo adwaw
*/

const usersBlock = document.querySelector('#users')
const renderUsers = (users) => {
	users.forEach(user => {
		usersBlock.innerHTML += `
			<div id="user_${user.id}" class="app__user user">
				<span class="user__icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-user report-box__icon text-theme-9">
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
						<circle cx="12" cy="7" r="4"></circle>
					</svg>
				</span>
				<span>${user.name}</span>
			</div>
		`
	})
	const userActive = document.querySelector('#user_1')
	userActive.classList.add('active')
}

const addActive = (el) => {
	if (!el.classList.contains('active')) {
		el.classList.add('active')
		if (el.classList.contains('app__user')) {
			let currentUserId = `${el.id}`
			localStorage.setItem("UserKey", JSON.stringify(currentUserId))
		}
	}
}

const removeActive = () => {
	const usersList = document.querySelectorAll('.user')
	for (let item of usersList) {
		item.classList.remove('active')
	}
}

const countUsers = (users) => {
	const $countUsers = document.querySelector('.countUsers-count')
	$countUsers.innerHTML =
		`
	<div class="users-count-info">Active Users</div>
	<div class="current-users">${users.length}</div>
	`
}

const userListener = () => {
	let currentUserId = JSON.parse(localStorage.getItem('UserKey'))
	const usersList = document.querySelectorAll('.user')
	for (let item of usersList) {
		item.addEventListener('click', (event) => {
			event.preventDefault()
			const [, id] = event.currentTarget.id.split("_")
			let elem = event.currentTarget
			removeActive()
			addActive(elem)
			getUsersInfo(id)
			getTodos(id)
			getAlbums(id)
			getPosts(id)
		})
	}
	if (currentUserId) {
		removeActive()
		const usersListawd = document.querySelectorAll('.app__user')
		for (let user of usersListawd) {
			const [, userId] = user.id.split("_")
			if (user.id == currentUserId) {
				user.classList.add('active')
				getUsersInfo(userId)
				getTodos(userId)
				getAlbums(userId)
				getPosts(userId)
			}
		}
	}
}

const getUsersInfo = async (userId) => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/users?id=${userId}`
	)
	const data = await response.json()
	renderUsersInfo(data)
}
getUsersInfo(1)
const renderUsersInfo = (comments) => {
	const usersInfo = document.querySelector("#userFullInfo")
	comments.forEach((element) => {
		usersInfo.innerHTML =
			`
		<h4 class="user-full__title">${element.name}</h4>
		<div class="user-full__info">
		  <div class="user-item"><span>Email: </span><a href="mailto:${element.email}">${element.email}</a></div>
		  <div class="user-item"><span>Phone: </span><a href="tel:${element.phone}">${element.phone}</a></div>
		  <div class="user-item"><span>Website: </span><a href="${element.website}" target="_blanck">${element.website}</a></div>
		  <div class="user-item"><span>City: </span>${element.address.city}</div>
		  <div class="user-item"><span>Company: </span>${element.company.name}</div>
		  <div class="user-item"><span>Catch Phrase: </span>${element.company.catchPhrase}</div>
		</div>
		`
	})
}

const getTodos = async (id) => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/todos?userId=${id}`
	)
	const data = await response.json()
	renderToDoList(data)
}
getTodos(1)
const renderToDoList = (todoList) => {
	const todos = document.querySelector('#users-todos')
	const todosCounter = document.querySelector('.todos-count')
	todosCounter.innerHTML = todoList.length
	todos.innerHTML = ''
	todoList.forEach(todo => {
		const todoRow = document.querySelector('#users-todos')
		if (todo.completed) {
			todoRow.innerHTML +=
				`
			<div class="user-todo completed">${todo.title}</div>
			`
		}
		else {
			todoRow.innerHTML +=
				`
			<div class="user-todo">${todo.title}</div>
			`
		}
	})
}

const getAlbums = async (id) => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/albums?userId=${id}`
	)
	const albums = await response.json()
	renderAlbums(albums)
}
getAlbums(1)
const renderAlbums = (albums) => {
	const albumsRow = document.querySelector('#users-albums')
	const albumsCounter = document.querySelector('.albums-count')
	albumsCounter.innerHTML = albums.length
	albumsRow.innerHTML = ''
	albums.forEach(album => {
		albumsRow.innerHTML +=
			`
			<div id="album_${album.id}" class="albums-item">
				${album.title}
			</div>
			`
	})
}

const getСomments = async (postId) => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/comments?postId=${postId}`
	)
	const comments = await response.json()
	//renderComments(comments)
}

const renderComments = (comments) => {
	const usersComments = document.querySelector('#users-comments')
	usersComments.innerHTML = ""
	comments.forEach(comment => {
		usersComments.innerHTML += `
			<div>${comment.name}</div>
		`
	})
}

const getPosts = async (id) => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts?userId=${id}`
	)
	const posts = await response.json()
	renderPosts(posts)
}
getPosts(1)
const renderPosts = (posts) => {
	const todos = document.querySelector('#users-posts')
	const todosCounter = document.querySelector('.posts-count')
	todosCounter.innerHTML = posts.length
	todos.innerHTML = ''
	posts.forEach(post => {
		getСomments(post.id)
		document
			.querySelector('#users-posts')
			.innerHTML += `
			<article class="user-post">
				<div class="user-post__icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
				</div>
				<div class="user-post__title">${post.title}</div>
				<div class="user-post__body">${post.body}</div>
				<div class="user-post__comment"></div>				
			</article>
			`
	})
}

const resourcesPanel = document.querySelector('.resources__panel')
resourcesPanel.addEventListener('click', (event) => {
	if (event.target.matches('.resources__panel-button') && !event.target.matches('.active')) {
		removeActivePanel()
		addActive(event.target)
		toShow(event.target)
	}
})

const removeActivePanel = () => {
	const resourcesPanelButton = document.querySelectorAll('.resources__panel-button')
	for (let item of resourcesPanelButton) {
		item.classList.remove('active')
	}
}

const toShow = (el) => {
	const usersResourcesItems = document.querySelectorAll('.users-resources__item')
	for (let item of usersResourcesItems) {
		if (item.classList.contains('toShow')) {
			item.classList.remove('toShow')
		}
		else if (el.dataset.atribute == item.id) {
			item.classList.add('toShow')
		}
	}
}


body.addEventListener('click', (event) => {
	const [, albumId] = event.target.id.split("_")
	const [, photoId] = event.target.parentNode.id.split("_")
	if (event.target.matches('.albums-item')) {
		getPhotos(albumId)
		photosGallery.style.display = 'flex'
	}
	else if (event.target.matches('.resources__panel-button')) {
		photosGallery.style.display = 'none'
	}
	else if (event.target.parentNode.matches('.app__user')) {
		photosGallery.style.display = 'none'
	}
	else if (event.target.parentNode.matches('.user-photo')) {
		console.log(photoId)
	}
})

const getPhotos = async (almumId) => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/photos?albumId=${almumId}`
	)
	const photos = await response.json()
	renderPhotos(photos)
}

const renderPhotos = (photos) => {
	photosGallery.innerHTML = ''
	photos.forEach(photo => {
		photosGallery.innerHTML += `
			<div id="photo_${photo.id}" class="user-photo">
				<div class="user-photo__img">
					<img src="${photo.thumbnailUrl}">
				</div>
				<div class="user-photo__title">${photo.title}</div>
			</div>
		`
	})
	const usersResourcesBody = document.querySelector('.users-resources__body')
	let minHeight = usersResourcesBody.scrollHeight
	usersResourcesBody.style.minHeight = minHeight + 'px'
}

getUsers()