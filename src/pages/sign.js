import React, { Component } from 'react';
import { Button, WhiteSpace, WingBlank, Card, Progress, Modal, Switch, List, Badge } from 'antd-mobile';
import { connect } from 'dva';
import socketIOClient from "socket.io-client";

const namespace = "sign";

const mapStateToProps = (state) => {
	const checked = state[namespace].checked;
	return {
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
		signCome: () => {
			dispatch({
				type: `${namespace}/signCome`,
			});
		},
		camera: () => {
			dispatch({
				type: `${namespace}/camera`,
			});
		},
		signGo: (compont, e) => {
			compont.showModal('modal1')(e);
			dispatch({
				type: `${namespace}/signGo`,
			});
		},
		signCome1: (compont, e) => {
			compont.showModal('modal1')(e);
			compont.setState({ notify: "" });
			dispatch({
				type: `${namespace}/signCome1`,
			});
		},
		openAuto: () => {
			dispatch({ type: `${namespace}/openAuto` });
		},
		closeAuto: () => {
			dispatch({ type: `${namespace}/closeAuto` });
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

class Sign extends Component {
	constructor() {
		super();
		this.state = {
			endpoint: "http://www.giseden.xyz:3000",
			response: 0,
			temperature: 0.0,
			modal1: false,
			notify: "打卡开始",
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

	componentDidMount() {
		const { endpoint } = this.state;
		this.props.onDidMount();
		//this.props.dispatch({
		//type: `${namespace}/signAutoCheck`,
		//});
		const socket = socketIOClient(endpoint);
		socket.on("outgoing data", data => this.setState({ response: data.num }));
		socket.on("outgoing data-temperature", data => this.setState({ temperature: data.num }));

		socket.on("go-outging data", data => {
			this.setState({ notify: data.num });
		});
	}


	render() {
		const { checked } = this.props
		const { response, notify ,temperature} = this.state;
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
				<List.Item
					thumb="data:image/jpeg;base64,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"
					extra={<Badge text={77} overflowCount={temperature} />}
					arrow="horizontal"
				>
					温度(摄氏度)
    			</List.Item>
				<WhiteSpace size='lg' />
				<WingBlank size='lg'><Button onClick={() => { this.props.signCome(); }}>无提示签到</Button></WingBlank>
				<WhiteSpace size='lg' />
				<WingBlank size='lg'><Button onClick={(e) => { this.props.signCome1(this, e); }}>签到</Button></WingBlank>
				<WhiteSpace size='lg' />
				<WingBlank size='lg'><Button onClick={(e) => { this.props.signGo(this, e) }}>签退</Button></WingBlank>
				<WhiteSpace size='lg' />
				<WingBlank size='lg'><Button onClick={(e) => { this.props.camera(this, e);window.open('http://www.giseden.xyz:2212') }}>拍照</Button></WingBlank>
				<List renderHeader={() => '自动打卡'}>
					<List.Item
						extra={<Switch
							checked={checked}
							onChange={() => {
								if (checked) {
									this.props.closeAuto();
								} else {
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
					footer={[{ text: 'Ok', onPress: () => { this.onClose('modal1')(); window.open('http://www.giseden.xyz:2212/screen.png','_blank')} }]}
					wrapProps={{ onTouchStart: this.onWrapTouchStart }}
					afterClose={() => { }}
				>
					<div style={{ height: 100, overflow: 'scroll' }}>
						{notify}<br />
					</div>
				</Modal>
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Sign);
