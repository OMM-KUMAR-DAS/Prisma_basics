const {PrismaClient}= require('@prisma/client')

const prisma= new PrismaClient()

//adding event


const adding_event= async(req,res)=>{

    try{

        const{event_name,gen}=req.body

        const ans= await prisma.event.create({
            data:{

                name:event_name,
                gender:gen,

            },

            
        })

        console.log(ans)

        return res.status(201).json({
            message:ans,
        })

    }catch(err)
    {
       
        return res.status(500).json({
            message:err
        })
    }finally{
        await prisma.$disconnect()
    }
}






module.exports={

    adding_event,
   
}