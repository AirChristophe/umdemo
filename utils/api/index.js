import axios from 'axios';

export async function requestApi(values) {
    return await request({
        ...values,
        headers: {
            ...values.headers,
        },
    });
}

async function request({ headers, url = '', ...other }) {
    console.log(444455);
    console.log('request');
    
    const httpOptions = {
        ...other,
        headers: {
            ...headers,
            'Content-Type':
                headers && headers['Content-Type']
                    ? headers['Content-Type']
                    : 'application/json',
        },
    };

    return axios(
        url,
        httpOptions
    ).then((response) => {
        console.log(555666);
        return response.data;
    });

}
