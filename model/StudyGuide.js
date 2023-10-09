import { Schema, model, models } from 'mongoose';

const studyGuideSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
  topic: {
		type: String,
	},
  documentName : {
		type: String,
	},
  pineconeId : {
		type: String,
	},
  guide : {
		type: String,
	},
}, {
	timestamps: true
});

const StudyGuides = models.studyGuide || model('studyGuide', studyGuideSchema);

export default StudyGuides;