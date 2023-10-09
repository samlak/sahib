import connectMongo from '../../../../database/conn';
import StudyGuide from '../../../../model/StudyGuide'
import Users from "../../../../model/Users";

const getContent = async (req, res) => {
  try {
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}));
    const { email } = req.body;

    Users.findOne({ email }, function(error, data){
      if(error) return res.status(400).json({ status : false, error });

      StudyGuide.find({ user: data._id })
      .select("-__v -createdAt -updatedAt")
      .exec(function(error, data){
        if(error) return res.status(400).json({ status : false, error });
        res
          .status(201)
          .json({
            status: true,
            data: data,
          });
      });
    });

  } catch (error) {
    res
      .status(500)
      .json({ status: false, error: "Error occurred! Please try again." });
  }
};

export default getContent;
