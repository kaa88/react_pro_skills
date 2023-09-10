import { useState } from "react"

const ERROR_REQUIRED = 'required'
const ERROR_INCORRECT = 'incorrect'

interface FormParams {
	action?: Function
	customValidation?: Function
	fields?: FieldParamsWithName[]
}
interface FieldParams {
	type?: string
	defaultValue?: string
	required?: boolean
	validate?: boolean
}
interface FieldParamsWithName extends FieldParams {
	name: string
}
interface InitialFields {
	[index: string]: FormField
}

export function useForm(params: FormParams) {
	const handleAction = params.action || function(){}
	const validateFormCustom = params.customValidation || function(){return {ok: true}}

	let initialFields: InitialFields = {}
	if (params.fields) params.fields.forEach((field) => {
		let {name, ...props} = field
		if (name) initialFields[name] = new FormField(props, (value: string) => setFields({...fields, [name]: value} as InitialFields))
		else console.error('Form field must have a "name" prop')
	})

	let [fields, setFields] = useState(initialFields)
	let [isPending, setIsPending] = useState(false)
	let [isError, setIsError] = useState(false)
	let [message, setMessage] = useState('')

	return {
		fields,
		isPending,
		isError,
		message,
		async submit(e: Event) {
			e.preventDefault()
			let {ok: customValidationIsOK, message: customValidationMessage} = validateFormCustom()
			if (!customValidationIsOK) {
				setIsError(true)
				return setMessage(customValidationMessage)
			}
			let {ok: validationIsOK, message: validationMessage} = validateForm(fields)
			if (!validationIsOK) {
				setIsError(true)
				return setMessage(validationMessage)
			}
			try {
				setIsPending(true)
				let message = await handleAction()
				setIsError(false)
				setMessage(message || '')
			}
			catch(err: any) {
				setIsError(true)
				setMessage(err.message)
				console.error(err);
			}
			finally {
				setIsPending(false)
			}
		},
		setError(message: string) {
			setIsError(true)
			if (message) setMessage(message)
		},
		removeError(message = '') {
			setIsError(false)
			setMessage(message)
		},
		clear() {
			Object.values(fields).forEach(field => field.clear())
			setIsError(false)
			setMessage('')
		},
	}
}

function validateForm(fields: InitialFields) {
	let errors: string[] = []
	let message = ''

	Object.values(fields).forEach(field => {
		let errorType = field.validate()
		if (errorType) errors.push(errorType)
	})

	if (errors.length === 1) {
		if (errors[0] === ERROR_INCORRECT) message = 'Please enter correct values'
		else message = 'Please fill in required fields'
	}
	if (errors.length > 1) {
		let requiredCount = 0, incorrectCount = 0
		errors.forEach(err => {
			if (err === ERROR_INCORRECT) incorrectCount++
			else requiredCount++
		})
		if (incorrectCount && !requiredCount) message = 'Please fill in the fields with correct values'
		else message = 'Please fill in required fields'
	}

	return {
		ok: errors.length ? false : true,
		message
	}
}




// FIELD
const fieldMessages: {[index: string]: {[index: string]: string}} = {
	email: {
		required: 'Email is required',
		incorrect: 'Incorrect email'
	},
	password: {
		required: 'Password is required',
		incorrect: 'Incorrect password'
	},
	phone: {
		required: 'Please fill in your phone number',
		incorrect: 'Incorrect phone number'
	},
	rating: {
		required: '!',
		incorrect: '!'
	},
}

const validations: {[index: string]: (value: string) => any} = {
	email(value: string) {
		return /^\S+@\S+\.\S+$/.test(value)
	},
	password(value: string) {
		if (value.length >= 4) return true
	},
	phone(value: string) {
		if (!value.match(/_/)) return true
	},
}

class FormField {
	type!: string
	isRequired!: boolean
	isValidating!: boolean
	defaultValue!: string
	value!: string
	defaultErrorType!: string
	errorType!: string
	_updateField!: Function

	constructor(params: FieldParams, setField: Function) {
		this.type = params.type || 'text'
		this.isRequired = params.required || false
		this.isValidating = params.validate === false ? false : true
		this.defaultValue = params.defaultValue || ''
		this.value = this.defaultValue
		this.defaultErrorType = this.isRequired ? ERROR_REQUIRED : ''
		this.errorType = this.defaultErrorType
		this._updateField = function() {setField(this)}
	}
	
	isValid = true
	message = ''

	change(e: Event, value: string) {
		if (e?.target) {
			let target = e.target as HTMLInputElement
			value = target.value || ''
		}
		this.value = value
		this.isValid = true
		this._updateField()
	}

	validate() {
		let isValid = false
		let errorType = ''
		if (this.value) {
			if (!this.isValidating || !validations[this.type]) isValid = true
			else if (validations[this.type](this.value)) isValid = true
			else errorType = ERROR_INCORRECT
		}
		else {
			if (this.isRequired) errorType = ERROR_REQUIRED
			else isValid = true
		}
		this.isValid = isValid
		this.errorType = isValid ? '' : errorType
		this.message = (errorType && fieldMessages[this.type]) ? fieldMessages[this.type][errorType] : ''
		let isError = !isValid
		this._updateField()
		return isError ? errorType : null
	}

	clear() {
		this.value = this.defaultValue
		this.isValid = true
		this.errorType = this.defaultErrorType
		this.message = ''
		this._updateField()
	}

	setError(message: string) {
		this.isValid = false
		if (message) this.message = message
		this._updateField()
	}
}
