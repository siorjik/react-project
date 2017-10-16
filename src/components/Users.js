import React, {Component} from 'react';
import {users} from './../backend/data.js';
import Radium, {StyleRoot} from 'radium';
import {bounceInUp} from 'react-animations';
import './css/Users.css';
import _ from 'lodash';

let styles = {
  bounceInUp: {
    animation: 'x 2s',
    animationName: Radium.keyframes(bounceInUp, 'bounceInUp')
  }
}

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {users: users}
	}

	deleteUser(user) {
		let arr = _.without(this.state.users, user);
		this.setState({users: arr});
	}

	render() {
		return (
			<StyleRoot id="user-wrap">
				<div style={styles.bounceInUp}>
					{this.state.users.map((user, index)=>{
						return <UserContent key={user.id} user={user} deleteUser={this.deleteUser.bind(this, user)}/>
					})}
				</div>
			</StyleRoot>
		);
	}
}

class UserContent extends Component {
	constructor(props) {
		super(props);
		this.state = {modalUser: false}
	}

	editUser() {
		this.setState({modalUser: true});
	}

	closeModal() {
		this.setState({modalUser: false});
	}

	saveChange(index) {
		console.log(index);
		this.setState({modalUser: false});
	}

	render() {
		let modal = (
			<div className='modal'>
				<span className='close-modal' onClick={this.closeModal.bind(this)}>X</span>
				<Modal modalUser={this.state.modalUser} saveChange={this.saveChange.bind(this)}/>
			</div>
		);
		let modUser;
		if(this.state.modalUser) modUser = modal;
		else modUser = null;

		return (
			<div>
				<p className='user-cont'><span>Имя:<br/>{this.props.user.name}</span> <span>Логин:<br/>{this.props.user.login}</span> <span>Должность:<br/>{this.props.user.position}</span> <span>E-mail:<br/>{this.props.user.email}</span> <span className='editing'><img src={require("./../img/edit.png")} alt="rbin" title="редактировать"  onClick={this.editUser.bind(this)}/></span> <span className='recicle'><img src={require("./../img/rbin.png")} alt="rbin" title="удалить" onClick={this.props.deleteUser}/></span></p>
				{modUser}
			</div>
		)
	}
}

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {isModal: this.props.modalUser}
	}

	/*close() {
		this.setState({isModal: !this.state.isModal});
	}*/

	save() {
		this.setState({isModal: !this.state.isModal});
		this.props.saveChange("big ess!");
	}

	render() {
		let modalCont;
		if(!this.state.isModal) modalCont = null;
		else modalCont = (
			<form>
				<p>
					<span>Имя:</span><br/>
					<input type="text"/>
				</p>
				<p>
					<span>Должность:</span><br/>
					<input type="text"/>
				</p>
				<p>
					<span>Логин:</span><br/>
					<input type="text"/>
				</p>
				<p>
					<span>Пароль:</span><br/>
					<input type="password"/>
				</p>
				<p>
					<span>E-mail:</span><br/>
					<input type="email"/>
				</p>
				<input type="button" value="Сохранить" onClick={this.save.bind(this)}/>
			</form>
		);

		return <div>{modalCont}</div>
	}
}