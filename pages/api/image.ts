import cloudinary from "@/lib/cloudinary";
import formidable from "formidable";
import { NextApiHandler } from "next";

export const config = {
    api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'POST': return uploadNewImage(req, res);
        case 'GET': return readAllImages(req, res);
        default: return res.status(404).send(`Not Found!`);
    }
};

const uploadNewImage: NextApiHandler = (req, res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: err.message });
   
      const imageFile = files.image as formidable.File[];
      const { secure_url } = await cloudinary.uploader.upload(
        imageFile[0].filepath,
        {
          folder: "dev-blogs",
        }
      );
      res.json({ src: secure_url });
    });
  };

const readAllImages: NextApiHandler = async (req, res) => {
    try {
    const {resources} = await cloudinary.api.resources({
        resource_type: 'image',
        type: 'upload',
        prefix: 'nextjs-image-gallery',
    });

    const images = resources.map(({secure_url}: any) => ({src: secure_url }));
    res.json({images});
    } catch (error: any) {
        return res.status(500).json({error: error.message});
    }

}

export default handler;
