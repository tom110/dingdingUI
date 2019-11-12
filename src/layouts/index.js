import {Component} from 'react';
import {Layout} from 'antd';
import Sign from '@/pages/sign';

const {Header,Footer,Content} = Layout;

export default class BasicLayout extends Component{
	render(){

		return (
			<Layout style={{ height: '100%'}}>
				<Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>签到系统</Header>
				<Content style={{ margin: '24px 16px 0'}}>
					<Sign />
				</Content>
				<Footer style={{ textAlign: 'center' }}>Ant Design ©2019 Created by Tom</Footer>
			</Layout>
		);

	}

}
