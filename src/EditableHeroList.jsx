import React, { Component } from 'react';
import CardField from "./CardField";

class EditableHeroList extends Component {
	render() {
		return (
			<ul>
				{this.props.heroes.map((dbfId, i) =>
					<li key={i}>
						<CardField
							dbfId={dbfId}
							setDbfId={(newDbfId) => {
								const heroes = this.props.heroes.slice();
								heroes[i] = newDbfId;
								this.props.setHeroes(heroes);
							}}
						/>
						<button onClick={this.delete} data-index={i}>&times;</button>
					</li>
				)}
				<li>
					<button onClick={this.addHero}>+</button>
				</li>
			</ul>
		);
	}

	delete = (e) => {
		const index = e.target.getAttribute("data-index");
		const heroes = this.props.heroes.slice();
		heroes.splice(index, 1);
		this.props.setHeroes(heroes);
	};

	addHero = () => {
		const heroes = this.props.heroes.slice();
		heroes.push(0);
		this.props.setHeroes(heroes);
	}
}

export default EditableHeroList;
