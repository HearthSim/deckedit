import React, { Component } from 'react';
import CardField from "./CardField";

class EditableCardList extends Component {
	render() {
		return (
			<table>
				<thead>
				<tr><th>dbfId</th><th>count</th></tr>
				</thead>
				<tbody>
				{this.props.cards.map(([dbfId, count], i) =>
					<tr key={i}>
						<td>
							<CardField
								dbfId={dbfId}
								setDbfId={this.changeDbfId(i)}
							/>
						</td>
						<td>
							<input
								type="number"
								value={count}
								onChange={this.changeCount(i)}
							/>
						</td>
						<td>
							<button onClick={this.delete} data-index={i}>&times;</button>
						</td>
					</tr>
				)}
				<tr>
					<td colSpan={3}>
						<button onClick={this.addCard}>+</button>
					</td>
				</tr>
				</tbody>
			</table>
		);
	}

	changeDbfId = (index) => (dbfId) => {
		const cards = this.props.cards.slice();
		cards[index][0] = dbfId;
		this.props.setCards(cards);
	};

	changeCount = (index) => (e) => {
		const count = +e.target.value;
		const cards = this.props.cards.slice();
		cards[index][1] = count;
		this.props.setCards(cards);
	};

	addCard = () => {
		const cards = this.props.cards.slice();
		cards.push([0, 0]);
		this.props.setCards(cards);
	};

	delete = (e) => {
		const index = e.target.getAttribute("data-index");
		const cards = this.props.cards.slice();
		cards.splice(index, 1);
		this.props.setCards(cards);
	};
}

export default EditableCardList;
