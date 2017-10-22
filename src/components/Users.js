import React, {Component} from 'react';
import {users} from './../backend/data.js';
import Radium, {StyleRoot} from 'radium';
import {bounceInUp, fadeIn} from 'react-animations';
import './css/Users.css';
import _ from 'lodash';

let styles = {
  bounceInUp: {
    animation: 'x 2s',
    animationName: Radium.keyframes(bounceInUp, 'bounceInUp')
  }
}

let modalStyle = {
	fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
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

	changeUserData(id, name, position, login, pass, email) {
		let userList = _.map(this.state.users, (user)=>{
			if(user.id === id) {
				user.name = name;
				user.position = position;
				user.login = login;
				user.password = pass;
				user.email = email;
			}
			return user;
		});

		this.setState({users: userList});
	}

	render() {
		return (
			<StyleRoot id="user-wrap">
				<div style={styles.bounceInUp}>
					{this.state.users.map((user, index)=>{
						return <UserContent key={user.id} user={user} deleteUser={this.deleteUser.bind(this, user)} changeUserData={this.changeUserData.bind(this)}/>
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

	saveChange(id, name, position, login, pass, email) {
		this.setState({modalUser: false});
		this.props.changeUserData(id, name, position, login, pass, email);
	}

	render() {
		let modal = (
			<StyleRoot>
				<div className='modal' style={modalStyle.fadeIn}>
					<span className='close-modal' onClick={this.closeModal.bind(this)}>X</span>
					<Modal modalUser={this.state.modalUser} saveChange={this.saveChange.bind(this)} user={this.props.user}/>
				</div>
			</StyleRoot>
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
		this.state = {
			isModal: this.props.modalUser, 
			name: this.props.user.name,
			position: this.props.user.position,
			login: this.props.user.login,
			pass: this.props.user.password,
			email: this.props.user.email
		}
	}

	/*close() {
		this.setState({isModal: !this.state.isModal});
	}*/

	changeName(ev) {
		this.setState({name: ev.target.value});
	}
	changePosition(ev) {
		this.setState({position: ev.target.value});
	}
	changeLogin(ev) {
		this.setState({login: ev.target.value});
	}
	changePass(ev) {
		this.setState({pass: ev.target.value});
	}
	changeEmail(ev) {
		this.setState({email: ev.target.value});
	}

	save() {
		this.setState({isModal: !this.state.isModal});
		this.props.saveChange(this.props.user.id, this.state.name, this.state.position, this.state.login, this.state.pass, this.state.email);
	}

	render() {
		let modalCont;
		if(!this.state.isModal) modalCont = null;
		else modalCont = (
			<form onSubmit={this.save.bind(this)}>
				<p>
					<span>Имя:</span><br/>
					<input type="text" value={this.state.name} onChange={this.changeName.bind(this)} required/>
				</p>
				<p>
					<span>Должность:</span><br/>
					<input type="text" value={this.state.position} onChange={this.changePosition.bind(this)} required/>
				</p>
				<p>
					<span>Логин:</span><br/>
					<input type="text" value={this.state.login} onChange={this.changeLogin.bind(this)} required/>
				</p>
				<p>
					<span>Пароль:</span><br/>
					<input type="password" value={this.state.pass} onChange={this.changePass.bind(this)} required/>
				</p>
				<p>
					<span>E-mail:</span><br/>
					<input type="email" value={this.state.email} onChange={this.changeEmail.bind(this)} required/>
				</p>
				<input type="submit" value="Сохранить"/>
			</form>
		);

		return <div>{modalCont}</div>
	}
}