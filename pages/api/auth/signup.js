import connectMongo from '../../../database/conn';
import Users from '../../../model/Users'
import { hash } from 'bcryptjs';

export default async function handler(req, res){
    await connectMongo().catch(error => res.json({ status : false, error: "Database connection failed."}))

    // only post method is accepted
    if(req.method === 'POST'){

        if(!req.body) return res.status(404).json({ status : false, error: "Empty data provided."});
        const { firstName, lastName, email, password } = req.body;
        const name = `${firstName} ${lastName}`;

        // check duplicate users
        const checkexisting = await Users.findOne({ email });
        if(checkexisting && checkexisting.password) return res.status(422).json({ status : false, error: "User already exists. Login to continue."});

        // hash password
        if(checkexisting && !checkexisting.password){
            Users.findByIdAndUpdate(checkexisting._id, { name, firstName, lastName, email, password : await hash(password, 12)}, function(error, data){
                if(error) return res.status(404).json({ status : false, error });
                res.status(201).json({ status : true, user: data})
            })
        } else {
            Users.create({ name, firstName, lastName, email, password : await hash(password, 12)}, async function(error, data){
                if(error) return res.status(404).json({ status : false, error });
                res.status(201).json({ status : true, user: data})
            })
        }

    } else{
        res.status(500).json({ message: "HTTP method not valid only POST Accepted"})
    }

}