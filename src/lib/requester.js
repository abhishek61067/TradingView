import Cookies from 'js-cookie'

const requester = function (url, options = {}) {

  let apiUrl = `${process.env.VUE_APP_API_BASEPATH}${url}`

  if (options.isFullURL){
    apiUrl = url
  }

  if (options.query) {
    apiUrl += '?'
    apiUrl += new URLSearchParams(options.query)
  }

  let update = {
    ...options,
    credentials: 'include'
  }
  update.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken'),
    // 'CF_Authorization': Cookies.get('CF_Authorization'),
    // 'CF-Access-Client-Id': '594d23a657d9f6542d2b7d4cab1a72ff.access',
    // 'CF-Access-Client-Secret': '71b21ea34698aab38464f0cbfed3b57ed203a5ef40b2a106bc3cd8f78dc38d28'
  }
  // update.credentials = 'include'
  // if (process.env.NODE_ENV === "production"){
  // } else {
  //   update.headers['Authorization'] = `Bearer ${process.env.VUE_APP_API_TOKEN}`
  // }

  console.log(`Calling API ${update.method || "GET"}: ${apiUrl}`)
  return fetch(apiUrl, update).then(async response => {
    // console.log(response)
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // check for error response
    if (!response.ok) {
      // get error message from body or default to response status
      if (response.status === 401) { // handle unauthorized error
        return window.location.href = '/login/?next=' + process.env.BASE_URL
      }
      const error = data ? data : response.status;
      return Promise.reject(error);
    }
    return data
  })
}

export default requester