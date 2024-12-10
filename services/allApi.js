import { commonApi } from "./commonApi"
import { serverURL } from "./serverURL"

export const addApi = async (reqBody, cat) => {
    return await commonApi('POST', `${serverURL}/${cat}`, reqBody)
}

export const getTodoApi = async () => {
    return await commonApi('GET', `${serverURL}/todo`, '')

}

export const getInprogressApi = async () => {
    return await commonApi('GET', `${serverURL}/inprogress`, '')

}

export const getcompletedApi = async () => {
    return await commonApi('GET', `${serverURL}/completed`, '')

}

export const deleteTodoApi = async (id) => {
    return await commonApi('DELETE', `${serverURL}/todo/${id}`, {})
}

export const deleteInprogressApi = async (id) => {
    return await commonApi('DELETE', `${serverURL}/inprogress/${id}`, {})
}

export const deleteCompletedApi = async (id) => {
    return await commonApi('DELETE', `${serverURL}/completed/${id}`, {})
}

export const updateTodo = async (reqBody, id) => {
    return await commonApi('PUT', `${serverURL}/todo/${id}`, reqBody)
}
export const updateinprogress = async (reqBody, id) => {
    return await commonApi('PUT', `${serverURL}/todo/${id}`, reqBody)
}
export const updatecompleted = async (reqBody, id) => {
    return await commonApi('PUT', `${serverURL}/todo/${id}`, reqBody)
}