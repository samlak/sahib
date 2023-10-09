import connectMongo from '../../../database/conn';
import StudyGuide from '../../../model/StudyGuide';
import Users from '../../../model/Users';

const createContent = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const {  
      topic,     
      email 
    } = req.body;

    Users.findOne({ email }, function(error, data){
      if(error) return res.status(400).json({ status : false, error });

      StudyGuide.create({ 
        user: data._id,
        topic,
        documentName: null,
        pineconeId: null,
        guide: null
      }, function(error, data){
        if(error) return res.status(400).json({ status : false, error });
        res
          .status(201)
          .json({
            status: true,
            data: data._id,
          });
      });
    });


  } catch (error) {
    res
      .status(500)
      .json({ status: false, error: "Error occurred! Please try again." });
  }
};

export default createContent;
