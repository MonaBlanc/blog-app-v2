import dbConnect from "@/lib/dbConnect";
import Joi from "joi";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":{
        await dbConnect();
        res.json({ success: true })
    }
    case "POST": return createNewPost(req, res);
  }
};

const createNewPost: NextApiHandler = async (req, res) => {
    const { body } = req;

    const schema = Joi.object().keys({
        title: Joi.string().required()
    })

    const {error} = schema.validate(body)
    console.log(error)

    res.json({success: true})

}

export default handler;
