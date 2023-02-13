export default async function handler(req,res){
    switch(req.method){
        case "GET":
			await handleGetRequest(req, res);
			break;
		default:
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
    }
}

const handleGetRequest = async (req, res) => {
    res.status(200).json({
       courses: "Java",
       categories : 3
    })
}