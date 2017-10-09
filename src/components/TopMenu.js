import React, {Component} from 'react';
import './css/TopMenu.css';

let month = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
let day = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

export default class TopMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {	
			time: "",
			day: ""
		}

		this.clock();
	}

	clock() {
		let plusZero = (data)=>{
			if(data < 10) data = "0"+data;
			return data;
		}
		setInterval(()=>{
			this.setState({
				time: `${plusZero(new Date().getDate())} ${month[new Date().getMonth()]}, ${new Date().getFullYear()} (${plusZero(new Date().getHours())}:${plusZero(new Date().getMinutes())}:${plusZero(new Date().getSeconds())})`,
				day: day[new Date().getDay()]
			});
		}, 1000);
	}

  render() {
    return (
      <div className='wrap-top-menu'>
	      <div className='clock'>
	      <p>{this.state.day}</p>
	      	<p>{this.state.time}</p>
	      </div>
      </div>
    );
  }
}