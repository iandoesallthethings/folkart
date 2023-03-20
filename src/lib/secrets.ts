import dotenv from 'dotenv'

dotenv.config()

export const notionApiKey = process.env.NOTION_API_KEY
export const notionRecordingsDb = process.env.NOTION_RECORDINGS_DB
