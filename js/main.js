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
		  <div class="user-item user-email"><span>Email: </span>${element.email}</div>
		  <div class="user-item user-phone"><span>Phone: </span>${element.phone}</div>
		  <div class="user-item user-website"><span>Website: </span>${element.website}</div>
		  <div class="user-item user-city"><span>City: </span>${element.address.city}</div>
		  <div class="user-item user-city"><span>Company: </span>${element.company.name}</div>
		  <div class="user-item user-city"><span>Catch Phrase: </span>${element.company.catchPhrase}</div>
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
	const todos = document.querySelector('#users-albums')
	const todosCounter = document.querySelector('.albums-count')
	todosCounter.innerHTML = albums.length
	todos.innerHTML = ''
	albums.forEach(album => {
		document
			.querySelector('#users-albums')
			.innerHTML +=
			`
			<div class="albums-item">
			${album.title}
			</div>
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
		document
			.querySelector('#users-posts')
			.innerHTML += `
			<article class="user-post">
				<div class="user-post__icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
				</div>
				<div class="user-post__title">${post.title}</div>
				<div class="user-post__body">${post.body}</div>
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



getUsers()
