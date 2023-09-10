import api from "../api/api"
import { handleError } from "../services/ErrorService"
// import { changeCurrency } from "../store/slices/currencySlice"
// import { changeLanguage } from "../store/slices/languageSlice"
// import { changeUserData } from "../store/slices/userSlice"
import { _wait_ } from "../utilities/utilities"


const UserService = {
	dispatch: null as null | Function,
	getUserDataOnInit: init,

	async updateUserData() {
		return api.get('/user')
			.then(response => updateStorage(response.data))
			.catch(error => handleError(error))
	},

	async login(username: string, password: string) {
		return api.post('/user/login', {email: username, password})
			.then(response => {
				updateStorage(response.data)
				return {ok: true}
			})
			.catch(error => handleError(error))
	},

	async logout() {
		return api.post('/user/logout')
			.then(response => {
				clearStorage()
				return {ok: true}
			})
			.catch(error => handleError(error))
	},

	async register(username: string, password: string, currency = null, language = null, cookieAccepted = false) {
		return api.post('/user/add', {email: username, password, currency, language, cookieAccepted})
			.then(response => {
				updateStorage(response.data)
				return {ok: true}
			})
			.catch(error => handleError(error))
	},

	async registerGuest(username: string, password: string, currency = null, language = null, cookieAccepted = false, name: string) {
		return api.post('/user/addguest', {email: username, password, currency, language, cookieAccepted, name})
			.then(response => {
				updateStorage(response.data)
				return {ok: true}
			})
			.catch(error => handleError(error))
	},

	async edit(key: string, value: string) {
		return api.put('/user/edit', { [key]: value })
			.then(response => {
				return {ok: true}
			})
			.catch(error => handleError(error))
	},

	async changePassword(currentPassword: string, newPassword: string) {
		return api.put('/user/changepassword', {
				currentPassword,
				newPassword
			})
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},

	async restorePassword(email: string) {
		return api.post('/user/restorepassword', {email})
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},

	async changeImage(file: string) {
		let connection = await api.get('/connect') // I use test connection to avoid image double uploading if token has expired
		if (connection.data?.ok) {
			let formData = new FormData()
			formData.append('file', file)
			return api.post('/user/uploadimage', formData, {
				headers: { "Content-Type": "multipart/form-data" }
			})
				.then(response => ({ok: true}))
				.catch(error => handleError(error))
		}
	},

	async sendFeedback(username: string, rating: number, message: string) {
		// Later...
		console.log('Feedback content:')
		console.log('username:', username)
		console.log('rating:', rating)
		console.log('message:', message)
		return await _wait_(1)
	},
	
}
export default UserService


const TOKEN = 'token'

async function init() {
	const token = localStorage.getItem(TOKEN)
	if (token) {
		let userData = await UserService.updateUserData()
		return userData
	}
	else return null
}

function updateStorage(data: any) {
	let token = data.accessToken
	if (token) localStorage.setItem(TOKEN, token)

	let {currency, language, ...userData} = data.userData || {}

	const dispatch = UserService.dispatch
	if (dispatch) {
		// dispatch(changeUserData(userData))
		// dispatch(changeLanguage(language))
		// dispatch(changeCurrency(currency))
	}
	else {
		let intervalId = setInterval(() => {
			if (UserService.dispatch) {
				clearInterval(intervalId)
				updateStorage(data)
			}
		}, 300)
		setTimeout(() => clearInterval(intervalId), 10000)
	}
	return userData
}
function clearStorage() {
	localStorage.removeItem(TOKEN)
	const dispatch = UserService.dispatch
	// if (dispatch) dispatch(changeUserData(null))
}
