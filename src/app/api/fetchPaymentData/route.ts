import { NextApiRequest, NextApiResponse } from "next";

export const handleRedirectData = async (req: NextApiRequest, res: NextApiResponse) => {
    // Handle the data received from the redirection
    const data = await req.body; // Assuming the data is sent in the request body
    console.log(data)
    // Process the data and perform any necessary actions

    res.status(200).json({ message: 'Data received successfully' });
};