import React, {Component} from 'react';
import Radium, {StyleRoot} from 'radium';
import {bounceInUp, bounceInRight} from 'react-animations';
import './css/Orders.css';
import _ from 'lodash';
import ReactDOM from 'react-dom';

import {orders} from './../backend/data.js';

let styles = {
  bounceInUp: {
    animation: 'x 2s',
    animationName: Radium.keyframes(bounceInUp, 'bounceInUp')
  }
}

let anim = {
  bounceInRight: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounceInRight, 'bounceInRight')
  }
}

export default class Orders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: orders,
			changeOrder: false,
			titleOrder: "",
			dateOrder: "",
			descOrder: "",
			idOrder: "",
			active: ""
		}
	}

	changeOrder(order, index, ev) {
		this.setState({
			changeOrder: true,
			titleOrder: order.title,
			dateOrder: order.date,
			descOrder: order.description,
			idOrder: order.id
		});

		let arrOrder = ReactDOM.findDOMNode(this).getElementsByClassName("order");;	
		for(let val of arrOrder) {
			val.style.background = "none";
		}
		arrOrder[index].style.background = "whitesmoke";
	}

	deleteOrder(order) {
		let orderArr = _.without(this.state.orders, order);
		this.setState({orders: orderArr, changeOrder: false});

		let arrOrder = ReactDOM.findDOMNode(this).getElementsByClassName("order");
		for(let val of arrOrder) {
			val.style.background = "none";
		}
	}

	close() {
		this.setState({changeOrder: false});

		let arrOrder = ReactDOM.findDOMNode(this).getElementsByClassName("order");
		for(let val of arrOrder) {
			val.style.background = "none";
		}
	}

	changeTitle(ev) {
		this.setState({titleOrder: ev.target.value});
	}
	changeDate(ev) {
		this.setState({dateOrder: ev.target.value});
	}
	changeDesc(ev) {
		this.setState({descOrder: ev.target.value});
	}

	saveChange(ev) {
		ev.preventDefault();
		let arrOrders = _.map(this.state.orders, (order)=>{
			if(order.id === this.state.idOrder) {
				order.title = this.state.titleOrder;
				order.date = this.state.dateOrder;
				order.description = this.state.descOrder;
			}
			return order;
		});

		this.setState({orders: arrOrders, changeOrder: false});

		let arrOrder = ReactDOM.findDOMNode(this).getElementsByClassName("order");
		for(let val of arrOrder) {
			val.style.background = "none";
		}
	}

  render() {
		let form = (
			<StyleRoot>
				<div className='change-form' style={anim.bounceInRight}>
					<span className='close-but' onClick={this.close.bind(this)}>X</span>
					<form onSubmit={this.saveChange.bind(this)}>
						<span style={{display: "none"}}>{this.state.idOrder}</span>
						<p>
							<span>Название:</span><br/>
							<input type="text" value={this.state.titleOrder} onChange={this.changeTitle.bind(this)} required/>
						</p>
						<p>
							<span>Дата:</span><br/>
							<input type="text" value={this.state.dateOrder} onChange={this.changeDate.bind(this)} required/>
						</p>
						<p>
							<span>Описание:</span><br/>
							<input type="text" value={this.state.descOrder} onChange={this.changeDesc.bind(this)} required/>
						</p>
						<input type="submit" value="Сохранить"/>
					</form>
				</div>
			</StyleRoot>
		);

		let changeForm;
		if(this.state.changeOrder) changeForm = form;
		else changeForm = null;

    return (
			<StyleRoot clas='order-wrap'>
				<div style={styles.bounceInUp}>
					<h3 className='orders-count'>Приходы / {this.state.orders.length}</h3>
					{_.map(this.state.orders, (order, index)=>{
						return <p className='order' key={order.id}><span>Название:<br/>{order.title}</span> <span>Дата:<br/>{order.date}</span> <span>Описание:<br/>{order.description}</span> <span className='editing'><img src={require("./../img/edit.png")} alt="rbin" title="редактировать" onClick={this.changeOrder.bind(this, order, index)}/></span> <span className='recicle'><img src={require("./../img/rbin.png")} alt="rbin" title="удалить" onClick={this.deleteOrder.bind(this, order)}/></span></p>
					})}
					{changeForm}
				</div>
			</StyleRoot>
    );
  }
}