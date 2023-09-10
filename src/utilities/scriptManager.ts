interface Params {
	testMode?: boolean
}
interface Callbacks {
	[key: string]: Function
}

export const scriptManager = {
	selfName: 'scriptManager',
	initiated: false,
	params: {} as Params,
	components: {} as {[key: string]: any},

	init(params: Params) {
		this.params = params || {}
		this.components = {}
		this.initiated = true
	},

	registerFunctions(componentName: string, callbacks: Callbacks) {
		if (typeof componentName !== 'string' || typeof callbacks !== 'object' || Array.isArray(callbacks))
			return console.error(`${this.selfName} could not register a new function because of missing or wrong arguments`)

		if (!this.components[componentName]) this.components[componentName] = {}
		Object.assign(this.components[componentName], callbacks)

		if (this.params?.testMode) {
			console.log(`[${this.selfName}] Registered new function for "${componentName}". Total:`)
			console.log(this.components)
		}
	}
}