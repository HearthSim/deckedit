import React, { Component } from 'react';
import './CardField.css';

class CardField extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			value: null,
		}
	}

	render() {
		const classNames = ["card-field"];
		if (this.state.value !== null) {
			classNames.push("card-field-changed");
		}
		const readOnly = typeof this.props.setDbfId !== "function";
		return (
			<input
				type="text"
				pattern="[0-9]*"
				inputMode="numeric"
				value={this.state.value !== null ? this.state.value : this.props.dbfId}
				onChange={this.onChange}
				className={classNames.join(" ")}
				readOnly={readOnly}
				onBlur={this.commit}
			/>
		);
	}

	onChange = (e) => {
		const value = e.target.value;
		this.setState({value});
	};

	commit = () => {
		if (typeof this.props.setDbfId !== "function") {
			return;
		}
		const value = +this.state.value;
		this.props.setDbfId(value);
		this.setState({value: null});
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.dbfId !== this.props.dbfId) {
			this.setState({value: null});
		}
	}
}

export default CardField;
