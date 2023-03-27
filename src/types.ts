export type Url = string

export type HTML = string
export type PlainText = string
export type CSSClasses = string

export type FieldName = 'education' | 'music' | 'development' | 'all the things'

export interface Field {
	name: FieldName
	blurb?: string
}

export interface Project {
	name: string
	title: string
	fields: Field[]
	link?: Url
	video?: Url
	image?: Url
	published?: boolean
	page?: { [key: string]: unknown }
}

export interface Db {
	fields: Field[]
	projects: Project[]
}

export interface Track {
	name: string
	Latest: string
	'Waveform Data': string
}

export interface Sort {
	property: string
	direction: 'ascending' | 'descending'
}

export interface Filter {
	property: string
	checkbox: { equals: boolean }
}

export interface Query {
	database_id?: string
	sorts?: Sort[]
	filter?: Filter
}
