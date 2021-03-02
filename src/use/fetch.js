export default function useFetch() {

    function load(uri, resolve) {
        fetch(uri, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => {
                response.json()
                    .then((res) => {
                        resolve(res)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
    return {load}
}
