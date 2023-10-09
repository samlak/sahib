import connectMongo from '../../../database/conn';
import Flashcard from '../../../model/Flashcard';
import Users from '../../../model/Users';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const generateFlashcard = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { topic, guide, guideId, email  } = req.body;

    const prompt = `This is a study guide ${guide}
      Use the information on study guide above to help me generate 10 flashcard that is tailored to this topic: ${topic}
      You answer should be in JSON format like this :
      [
        {
          question: "",
          answer: "",
          showQuestion: true
        },
      ]
    `;

    const messages = [
      { role: "user", content: prompt },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      messages
    })
    
    const rawCard = response.choices[0].message.content;
    const card = JSON.parse(rawCard);

    Users.findOne({ email }, function(error, data){
      if(error) return res.status(400).json({ status : false, error });

      Flashcard.create({
        user: data._id,
        studyGuide: guideId,
        card
      }, function(error, flashData){
        if(error) {
          return res.status(400).json({ status : false, error: "Error occurred! Please try again." });
        }
        res
          .status(201)
          .json({
            status: true,
            data: flashData._id,
          });
      })

    });

  } catch (error) {
    res
      .status(500)
      .json({ status: false, error: "Error occurred! Please try again." });
  }
};

export default generateFlashcard;

