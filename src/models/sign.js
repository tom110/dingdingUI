import * as signService from '../service/sign';

export default{
	namespace: 'sign',

	state: {checked: false},
	effects:{
		*signCome({_},{call,put}){
			const rsp= yield call(signService.signCome);
			console.log(rsp.info);
			alert(rsp.info);
		},
		*camera({_},{call,put}){
			const rsp=yield call(signService.camera);
			console.log(rsp.info);
			alert(rsp.info);
		},
		*signGo({_},{call,put}){
			yield call(signService.signGo);
		},
		*signCome1({_},{call,put}){
			yield call(signService.signCome1);
		},
		*signAutoCheck({_},{call,put}){
			const rsp = yield call(signService.signAutoCheck);
			//alert(rsp.toString());
			if(rsp.info === "0"){
				yield put({type: 'setAutoState',payload:{checked: false}});
			}else{
				yield put({type: 'setAutoState',payload:{checked: true}});
			}
		},
		*openAuto({_},{call,put}){
			const rsp = yield call(signService.openAuto);
			if(rsp.info ==="1"){
				yield put({type: 'setAutoState',payload:{checked: true}});
			}
		},
		*closeAuto({_},{call,put}){
			const rsp = yield call(signService.closeAuto);
			if(rsp.info ==="1"){
				yield put({type: 'setAutoState',payload:{checked: false}});
			}
		},
	},

	reducers: {
		notify(state,{payload:{notifyInfo}}){
			return{
				...state,
				notifyInfo,
			}
		},
		setAutoState(state,{payload:data}){
			//alert(data.checked);
			return {
				checked: data.checked,
			};
		},
	}

}
