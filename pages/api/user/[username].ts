import { NextApiRequest, NextApiResponse } from "next";


const hello = async (req: NextApiRequest, res: NextApiResponse) => {
  
    try {
      const result = {
        name: req.query.username,
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
  export default  hello