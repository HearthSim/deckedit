import React, { Component } from 'react';

class FormatSelector extends Component {
	render() {
		return (
			<div>
				<label>
					<input type="radio" value="format" checked={this.props.format === 2} data-format="2" onChange={this.onChange} />
					Wild
				</label>
				<label>
					<input type="radio" value="format" checked={this.props.format === 1} data-format="1" onChange={this.onChange} />
					Standard
				</label>
			</div>
		);
	}

	onChange = (e) => {
		this.props.setFormat(+e.target.getAttribute("data-format"))
	}
}

export default FormatSelector;
