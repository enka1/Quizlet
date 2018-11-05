import { config } from 'dotenv'

const getEnvironmentParameter = () => {
    config()
}

export { getEnvironmentParameter }