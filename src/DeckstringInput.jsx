import React, { Component } from 'react';
import { decode } from 'deckstrings';
import './App.css';

class DeckstringInput extends Component {
	ref = null;

	render() {
		return (
			<div>
				<label>
					Input
					<textarea ref={ref => this.ref = ref} />
				</label>
				<button onClick={this.import}>Import</button>
			</div>
		);
	}

	import = () => {
		const value = this.ref.value;
		if (
			this.importDeckstring(value) ||
			this.importTSV(value) ||
			this.importCSV(value) ||
			this.importJSON(value)
		) {
			return;
		}
		alert("Invalid input");
	};

	importDeckstring(input) {
		const lines = input.split("\n");
		for (let line of lines) {
			line = line.trim();
			if (!line || line.startsWith("#")) {
				continue;
			}
			try {
				const deck = decode(line);
				this.props.reset();
				this.props.setHeroes(deck.heroes);
				this.props.setCards(deck.cards);
				this.props.setFormat(deck.format);
				return true;
			}
			catch(e) {
				continue;
			}
		}
		return false;
	}

	importTSV(input) {
		return this.importSV(input, "\t");
	}

	importCSV(input) {
		return this.importSV(input, ",");
	}

	importJSON(input) {
		try {
			const parsed = JSON.parse(input);
			if (!Array.isArray(parsed)) {
				return false;
			}
			const cards = parsed.map(elem => {
				if (Array.isArray(elem) && elem.length === 2) {
					return elem;
				}
				if (!isNaN(+elem)) {
					return +elem;
				}
				return -1;
			});
			this.props.reset();
			this.props.setCards(cards);
			return true;
		}
		catch(e) {
			return false;
		}
	}

	importSV(input, separator) {
		const lines = input.split("\n");
		const cards = [];
		for (let line of lines) {
			line = line.trim();
			const parts = line.split(separator).map(line => Number(line.trim()));
			if (parts.length !== 2) {
				continue;
			}
			cards.push([...parts]);
		}
		if (cards.length > 0) {
			this.props.reset();
			this.props.setCards(cards);
			return true;
		}
		return false;
	}
}

export default DeckstringInput;
