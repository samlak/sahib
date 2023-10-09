import connectMongo from '../../../database/conn';
import StudyGuide from '../../../model/StudyGuide';

const saveStudyGuide = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { guide, id } = req.body;

    StudyGuide.findByIdAndUpdate( 
      id,
      { $set: { guide } }, 
      { new: true, useFindAndModify: false }, 
      function(error, data) {
        if(error) return res.status(400).json({ status : false, error });
        res
          .status(201)
          .json({
            status: true,
            data: data._id,
          });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ status: false, error: "Error occurred! Please try again." });
  }
};

export default saveStudyGuide;