/* 
	Module checks window resizing and runs funcs on crossing the breakpoint.
	Breakpoint executes its funcs when 'width' crosses the line from both sides. Example: both resize from 800 to 700 and from 700 to 800 will execute '768' breakpoint.
	If 'width' crosses several breakpoints, all of them will be executed sequentially.

	Useful output:
	- jsMediaQueries.state
	Note: there is 1 more index than number of breakpoints (from 0px to 1st breakpoint).
	
	Init params {obj}:
	- breakpoints {obj}
	- testMode - set to 'true' to console.log the breakpoint state when it executes (default = false)
*/

interface Params {
	testMode?: boolean
}
type Key = number

export const jsMediaQueries = {
	selfName: 'jsMediaQueries',
	breakpoints: {0: []} as {[key: number]: Function[]},
	initiated: false,
	params: {} as Params,
	keys: [] as Key[],
	keysReversed: [] as Key[],
	state: 0 as Key,
	prev_state: 0 as Key,

	init(params: Params) {
		this.params = params || {}
		this.keys = this.keysReversed = []
		this.check(null, true)
		window.addEventListener('resize', this.check.bind(this))
		this.initiated = true
	},

	generateKeys() {
		let keys = Object.keys(this.breakpoints).map((key: Key | string) => {
			key = Number(key)
			if (isNaN(key)) key = 0
			return key
		})
		let [...keysReversed] = keys
		keys.sort((a, b) => {return a - b})
		keysReversed.sort((a, b) => {return b - a})
		this.keys = keys
		this.keysReversed = keysReversed
	},

	registerActions(breakpoint: number, callbacks: Function[]) {
		if (!breakpoint || !Array.isArray(callbacks))
			return console.error(`${this.selfName} could not register a new actions because of missing or wrong arguments`)
	
		if (!this.breakpoints[breakpoint]) this.breakpoints[breakpoint] = []
		this.breakpoints[breakpoint] = this.breakpoints[breakpoint].concat(callbacks)

		this.log('register', breakpoint)
		this.generateKeys()
	},

	deleteActions(breakpoint: number, callbacks: Function[]) {
		if (!breakpoint || !Array.isArray(callbacks))
			return console.error(`${this.selfName} could not delete actions because of missing arguments`)

		let callbackNames = callbacks.map(cb => cb.name)
		this.breakpoints[breakpoint] = this.breakpoints[breakpoint].filter(item => !callbackNames.includes(item.name))

		this.log('delete', breakpoint)
		this.generateKeys()
	},

	check(e: Event | null, init = false) {
		for (let i = 0; i < this.keys.length; i++) {
			if (window.innerWidth > this.keys[i]) this.state = this.keys[i]
			else break
		}
		if (init) this.prev_state = this.state
		else {
			if (this.state > this.prev_state) {
				this.keys.forEach((key) => {
					if (key > this.prev_state && key <= this.state) run(key, this)
				})
			}
			if (this.state < this.prev_state) {
				this.keysReversed.forEach((key) => {
					if (key <= this.prev_state && key > this.state) run(key, this)
				})
			}
			this.prev_state = this.state
		}
		function run(key: Key, that: any) {
			that.breakpoints[key].forEach((item: Function) => {
				try { item() } catch(err: any) { console.log(err.message) }
			})
			if (that.params.testMode) console.log(`[${that.selfName}] Executed breakpoint: ${key}`)
		}
	},
	log(type: string, breakpoint: Key) {
		if (this.params.testMode) {
			let msgParts: {[key: string]: string} = {
				register: 'Registered new actions',
				delete: 'Deleted actions'
			}
			let message = `[${this.selfName}] ${msgParts[type]} at breakpoint "${breakpoint}". Total:`
			console.log(message)
			console.log(this.breakpoints)
		}
	}
}
