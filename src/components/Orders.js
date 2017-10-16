import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Radium, {StyleRoot} from 'radium';
import {bounceInUp} from 'react-animations';
import './css/Orders.css';
import recicle from './../img/rbin.png';
//import axios from 'axios';
//import check from './../backend/check.php';
import _ from 'lodash';

import {orders, products} from './../backend/data.js'

let styles = {
  bounceInUp: {
    animation: 'x 2s',
    animationName: Radium.keyframes(bounceInUp, 'bounceInUp')
  }
}

export default class Orders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: "",
			display: "none",
			orders: orders
		}

		this.getSums = this.getSums.bind(this);
		this.closeOrder = this.closeOrder.bind(this);
	}

	getSums(itemOrder) {
		let uahSum = 0;
		let usdSum = 0;
		itemOrder.getProducts().forEach((item)=>{
			item.price.forEach((item)=>{
				if(item.symbol === 'USD') usdSum += item.value;
				if(item.symbol === 'UAH') uahSum += item.value;
			});
		});
		return {
			usdSum: usdSum,
			uahSum: uahSum
		}
	}

	showOrderDesc(item, index, ev) {
		let arrOrder = ReactDOM.findDOMNode(this).getElementsByClassName("order");

		if(ev.target.nodeName === "IMG") {
			for(let val of arrOrder) {
			val.style.background = "none";
			}
			return false;
		}
		
		for(let val of arrOrder) {
			val.style.background = "none";
		}
		arrOrder[index].style.background = "whitesmoke";
		
		this.setState({
			item: item,
			display: "inline-block"
		});
	}

	closeOrder() {
		this.setState({display: "none"});

		let arrOrder = ReactDOM.findDOMNode(this).getElementsByClassName("order");
		for(let val of arrOrder) {
			val.style.background = "none";
		}
	}

	productsInOrders(item) {
		let arrProds = [];
		for(let i = 0; i < products.length; i++) {
			if(products[i].order !== item.id) continue;
			else arrProds.push(products[i]);
		}

		return (
			<div>
				{arrProds.map((item)=>{
					return (
						<div key={item.id} style={{margin: "5px 0 20px 0"}}>
							<img style={{float: "right", width: "25%"}} src={require('./../img/'+item.photo)} alt="rbin"/>
							<p>Title: {item.title}</p>
							<p>Serial number: {item.serialNumber}</p>
							<p>Type: {item.type}</p>
							<p>Specification: {item.specification}</p>
							<p>Date: {item.date}</p>
							<p>Guarantee(start): {item.guarantee.start}</p>
							<p>Guarantee(end): {item.guarantee.end}</p>
							<p>Price (USD): {item.price[0].value}</p>
							<p>Price (UAH): {item.price[1].value}</p>
						</div>
					)	
				})}
			</div>
		);
	}

	deleteOrder(item) {
		let arr = _.without(this.state.orders, item);
		this.setState({
			orders: arr,
			display: "none"
		});
  }
  
  /*componentDidMount() {
    axios({
      method: "get",
      url: check,
      headers: {'Content-Type': 'multipart/form-data'},
      data: "hello php!"
    }).then((resp)=>{
      console.log(resp);
    }).catch((err)=>{
      console.log(err);
    })
  }*/

  render() {
  	let orderDesc = (
  		<div className='order-descript' style={{display: this.state.display}}>
		  	<span className='close-but' onClick={this.closeOrder}>X</span>
		  	<div className='cont'><p>{this.state.item.title}</p>
		  		<p>{this.state.item.date}</p>
		  		<p>{this.state.item.description}</p>
		  		<hr style={{margin: '10px 0'}}/>
		  		<h4>Products:</h4>
		  		{this.productsInOrders(this.state.item)}
		  	</div>
	  	</div>
		);

    return (
    	<StyleRoot id="order-wrap">
	      <div style={styles.bounceInUp}>
	      	<h3 className='orders-count'>Приходы / {this.state.orders.length}</h3>
	      	{this.state.orders.map((item, index)=>{
	      		return <p className='order'key={item.id} onClick={this.showOrderDesc.bind(this, item, index)}><span className='order-title'>{item.title}</span> <span className='count-produts'>{item.getProducts().length}<br/>Продукта</span> <span className='date'>{item.date}</span> <span className='sum-order'>{this.getSums(item).usdSum} (USD)<br/>{this.getSums(item).uahSum} (UAH)</span> <span className='recicle'><img src={recicle} alt="rbin" onClick={this.deleteOrder.bind(this, item)}/></span></p>
	      	})}
	      	{orderDesc}
	      </div>
      </StyleRoot>
    );
  }
}