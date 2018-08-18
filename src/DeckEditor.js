import React, { Component } from 'react';
import DeckstringInput from "./DeckstringInput";
import EditableCardList from "./EditableCardList";
import { encode } from "deckstrings";
import FormatSelector from "./FormatSelector";
import EditableHeroList from "./EditableHeroList";

class DeckEditor extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			cards: [],
			heroes: [],
			format: null,
		};
	}

	render() {
		return (
			<div>
				<DeckstringInput
					setCards={this.setCards}
					setHeroes={this.setHeroes}
					setFormat={this.setFormat}
					reset={this.reset}
				/>
				<h2>Heroes</h2>
				<EditableHeroList
					heroes={this.state.heroes}
					setHeroes={this.setHeroes}
				/>
				<h2>Cards</h2>
				<EditableCardList
					cards={this.state.cards}
					setCards={this.setCards}
				/>
				<h2>Format</h2>
				<FormatSelector format={this.state.format} setFormat={this.setFormat} />
				<h2>Export</h2>
				<input type="text" value={this.getDeckstring()} readOnly />
			</div>
		);
	}

	setCards = (cards) => {
		this.setState({cards});
	};

	setHeroes = (heroes) => {
		this.setState({heroes});
	};

	setFormat = (format) => {
		this.setState({format});
	};

	reset = () => {
		this.setState({
			cards: [],
			heroes: [],
			format: 1,
		})
	}

	getDeckstring = () => {
		try {
			return encode({
				cards: this.state.cards,
				heroes: this.state.heroes,
				format: this.state.format,
			});
		}
		catch(e) {
			return "";
		}
	}
}

export default DeckEditor;
