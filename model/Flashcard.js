import { Schema, model, models } from 'mongoose';

const flashcardSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	studyGuide: {
		type: Schema.Types.ObjectId,
		ref: 'studyGuide',
	},
	card: {
		type: [Object],
		blackbox: true,
	}
}, {
	timestamps: true
});

const Flashcards = models.flashcard || model('flashcard', flashcardSchema);

export default Flashcards;