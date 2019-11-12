function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}
export default async function request(url, options) {
	try{
		let response = await fetch(url, options);
		checkStatus(response);
		return await response.json();
	}catch(e){
		//alert(e);
		return [];
	}
}
