const baseApi = process.env.REACT_APP_FNTECH_BASE_API;
const endpoint = "/api/public/v1/summits/1/tax-types/"

export const getData = async ({pageNum, perPage}) => {
    try {
        const response = await fetch(`${baseApi}${endpoint}?page=${pageNum}&per_page=${perPage}`);
        const data = response.json();
        return data;
    } catch(e) {
        console.log(e);
        return null;
    }
};

export const addTaxType = async (taxTypeItem) => {
    try {
        const response = await fetch(`${baseApi}${endpoint}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(taxTypeItem)
        });
        const data = response.json();
        return data;
    } catch(e) {
        console.log(e);
        return null;
    }
}

export const deleteTaxType = async (taxItemId) => {
    try {
        const response = await fetch(`${baseApi}${endpoint}${taxItemId}`, {
            method: 'DELETE'
        });
        // since there is no returned values after a successful delete, we return nothing
        return '';
    } catch(e) {
        console.log(e);
        return null;
    }
}

export const sortTaxType = async (field, order, pageNum, perPage) => {
    try {
        const response = await fetch(`${baseApi}${endpoint}?page=${pageNum}&per_page=${perPage}&order=${order}${field.toLowerCase()}`);
        const data = response.json();
        return data;
    } catch(e) {
        console.log(e);
        return null;
    }
}

const utils = {
    getData,
    addTaxType,
    deleteTaxType,
    sortTaxType
}
export default utils;