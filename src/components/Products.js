import React, {Component} from 'react';
import {products} from "./Orders";
import Radium, {StyleRoot} from 'radium';
import {bounceInUp} from 'react-animations';
import './css/Products.css';

let styles = {
  bounceInUp: {
    animation: 'x 2s',
    animationName: Radium.keyframes(bounceInUp, 'bounceInUp')
  }
}

export default class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: products,
			typeVal: "all"
		}
	}

	getType() {
		let arrTypes = new Set();
		let resArrTypes = [], ind = 0;
		products.forEach((item) => {
		  arrTypes.add(item.type);
		});

		arrTypes.forEach((val) => {
			resArrTypes[ind] = val;
			ind++;
		});

		return resArrTypes;
	}

	changeType(ev) {
		this.setState({typeVal: ev.target.value});

		let result = products.filter((item, index)=>{
			return item.type.toLowerCase().indexOf(ev.target.value) !== -1;
		});

		if(ev.target.value === "all") this.setState({products: products});
		else this.setState({products: result});
	}

	render() {
		let types = this.getType();
		return (
			<StyleRoot id="prod-wrap">
	      <div style={styles.bounceInUp}>
		      <select value={this.state.typeVal} onChange={this.changeType.bind(this)}>
		    		<option value="all">All types</option>
		    		{types.map((item, index) => {
		    			return <option key={index} value={item.toLowerCase()}>{item}</option>
		    		})}
			    </select>
	      	{this.state.products.map((item, index)=>{
	        	return <p key={item.id} className='products-cont'><span>Название:<br/>{item.title}</span> <span>Тип:<br/>{item.type}</span> <span>Гарантия:<br/>от {item.guarantee.start}<br/>до {item.guarantee.end}</span> <span>Цена(USD): {item.price[0].value}<br/>Цена(UAH): {item.price[1].value}</span> <span>Приход:<br/>{item.order}</span></p>
	        })}
	      </div>
      </StyleRoot>
		);
	}
}