const fetchCall = (url, requestMethod, jwt, requestBody, normalResponseJson) => {
    const fetchData = {
            headers: {
                "Content-Type": "application/json"
            },
            method: requestMethod
    }

    if(jwt){
        fetchData.headers.Authorization = `Bearer ${jwt}`
    }

    if(requestBody){
        fetchData.body = JSON.stringify(requestBody)
    }

    if(normalResponseJson === 'return-response-json')
        return fetch(url, fetchData).then((response)=>{
            if(response.status === 200)
                return response.json()
        })

    return fetch(url, fetchData)
}
 
export default fetchCall;