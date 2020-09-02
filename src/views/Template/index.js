import React from 'react';
import { Table, Button, Form, Select, Badge, message, Modal } from 'antd';
import { BankOutlined, FormOutlined, FolderOpenOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './index.less'

class Index extends React.Component {
	formRef = React.createRef();
	state = {
		
	};
	async componentWillMount() {

	}

	componentWillUnmount() {

	}

	toEdit(type, row) {
		this.props.history.push({ pathname: `/visualization` })
	}

	render() {

		return (
			<div className="shadow-radius">
				<div className="template-page">
					<div>
						<ul>
							<li className="template-item">
								<div className="template-item-title">
									<div>PC端官网模板</div>
									<div className="template-item-icon">
										<BankOutlined />
									</div>
									<div className="template-item-btns">
										<div>
											<Link to="/visualization" target="_blank">
												<span>
													<FormOutlined />
												</span>
											</Link>
										</div>
										<div>
											<span>
											<FolderOpenOutlined />
											</span>
										</div>
										<div>
											<span>
											<EllipsisOutlined />
											</span>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					
				</div>
			</div>
		)
	}
}

export default Index