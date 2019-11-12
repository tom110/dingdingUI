import request from '../util/request';



export function signCome(){
	return request('http://127.0.0.1:3001/',{
		headers:{'content-type':'text/plain'},
		method: 'GET'
	});
};


export function signGo(){
	return request('http://127.0.0.1:3001/go',{
		headers:{'content-type':'text/plain'},
		method: 'GET'
	});
};
export function signCome1(){
	return request('http://127.0.0.1:3001/come',{
		headers:{'content-type':'text/plain'},
		method: 'GET'
	});
};

export function signAutoCheck(){
	return request('http://127.0.0.1:3001/autoCheck',{
		headers:{'content-type':'text/plain'},
		method: 'GET',
	});
};

export function openAuto(){
	return request('http://127.0.0.1:3001/openAuto',{
		headers:{'content-type':'text/plain'},
		method: 'GET',
	});
};

export function closeAuto(){
	return request('http://127.0.0.1:3001/closeAuto',{
		headers:{'content-type':'text/plain'},
		method: 'GET',
	});
};
