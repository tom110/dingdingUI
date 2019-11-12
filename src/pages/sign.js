import React,{Component} from 'react';
import {Button,WhiteSpace,WingBlank,Card,Progress,Modal,Switch,List} from 'antd-mobile';
import {connect} from 'dva';
import socketIOClient from "socket.io-client";

const namespace="sign";

const mapStateToProps=(state)=>{
	const checked =  state[namespace].checked;
	return{
		notifyInfo: state.sign.notifyInfo,
		checked: checked, 
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDidMount: () => {
			dispatch({
			type: `${namespace}/signAutoCheck`,
			});
		},
		signCome: ()=>{
			dispatch({
			type: `${namespace}/signCome`,
			});
			},
			signGo:(compont,e)=>{
			compont.showModal('modal1')(e);
			dispatch({
				type: `${namespace}/signGo`,
			});
		},
		signCome1:(compont,e)=>{
			compont.showModal('modal1')(e);
			compont.setState({notify:""});
			dispatch({
				type: `${namespace}/signCome1`,
			});
		},
		openAuto: ()=>{
			dispatch({type: `${namespace}/openAuto`});
		},
		closeAuto: ()=>{
			dispatch({type: `${namespace}/closeAuto`});
		},
	};
};

function closest(el, selector) {
	const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
	while (el) {
		if (matchesSelector.call(el, selector)) {
			return el;
		};
		el = el.parentElement;
	}
	return null;
}

class Sign extends Component{
	constructor(){
		super();
		this.state={
			endpoint:"http://127.0.0.1:3001",
			response:0,
			modal1: false,
			notify:"打卡开始",
		}
	}

	showModal = key => (e) => {
		e.preventDefault(); // 修复 Android 上点击穿透
		this.setState({
			[key]: true,
		});
	}
	onClose = key => () => {
		this.setState({
			[key]: false,
		});
	}

	onWrapTouchStart = (e) => {
		// fix touch to scroll background page on iOS
		if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
			return;
		}
		const pNode = closest(e.target, '.am-modal-content');
		if (!pNode) {
			e.preventDefault();
		}
	}

	componentDidMount(){
		const {endpoint} = this.state;
		this.props.onDidMount();
		//this.props.dispatch({
			//type: `${namespace}/signAutoCheck`,
		//});
		const socket = socketIOClient(endpoint);
		socket.on("outgoing data",data=>this.setState({response:data.num}));
		socket.on("go-outging data",data=>{
			this.setState({notify: data.num});
		});
	}


	render(){
		const {checked} = this.props
		const {response,notify}=this.state;
		return (
			<div>
				<Card>
					<Card.Header title="电量"></Card.Header>
					<Card.Body>
						<div className="progress-container">
							<Progress percent={response} position="fix"></Progress>
						</div>
					</Card.Body>
				</Card>
				<WhiteSpace size='lg' />
				<WingBlank size='lg'><Button onClick={()=>{this.props.signCome();}}>无提示签到</Button></WingBlank>
				<WhiteSpace size='lg' />
				<WingBlank size='lg'><Button onClick={(e)=>{this.props.signCome1(this,e);}}>签到</Button></WingBlank>
				<WhiteSpace size='lg' />
				<WingBlank size='lg'><Button onClick={(e)=>{this.props.signGo(this,e)}}>签退</Button></WingBlank>
				<List renderHeader={() =>'自动打卡'}>
					<List.Item
						extra={<Switch
						checked={checked}
						onChange={() => {
							if(checked){
								this.props.closeAuto();
							}else{
								this.props.openAuto();
							}
						}
						}
					/>}
				>自动打卡状态
				</List.Item>
			</List>
			<Modal
				visible={this.state.modal1}
				transparent
				maskClosable={false}
				onClose={this.onClose('modal1')}
				title="过程信息"
				footer={[{ text: 'Ok', onPress: () => { this.onClose('modal1')(); } }]}
				wrapProps={{ onTouchStart: this.onWrapTouchStart }}
				afterClose={() => { }}
			>
				<div style={{ height: 100, overflow: 'scroll' }}>
					{notify}<br/>
				</div>
			</Modal>
		</div>
		);
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Sign);
