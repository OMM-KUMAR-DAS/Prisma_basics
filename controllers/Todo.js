const {PrismaClient}=require('@prisma/client')

const prisma= new PrismaClient()

//creating todo of each student


const creatingtodo= async(req,res)=>{
   
    try{

        

        const{titl,des,userid}=req.body

        const newTodo= await prisma.todo.create({

            data:{
                title:titl,
                description:des,
                user_id:userid,
            },
        })

        console.log(newTodo)

        return res.status(201).json({
            message:newTodo,
        })


    }catch(err)
    {
        //P2003 ERROR CODE-->FOREIGN KEY VIOLATION
        return res.status(500).json({
            message:err
        })

    }finally{
        await prisma.$disconnect()
    }

}

//getting todos of each student

const gettingtodos= async(req,res)=>{
    try{

        const{userid}= req.query

        const result= await prisma.todo.findMany({
            where:{
                user_id:parseInt(userid),
            },
            
            select:
            
            {

                // student:true,
                title:true,
                description:true,
            }

        })

        console.log(result)

        return res.status(200).json({
            message:result,
        })

    }catch(err)
    {

        //P2003 ERROR CODE-->FOREIGN KEY VIOLATION
        return res.status(500).json({
            message:err
        })

    }finally{
        await prisma.$disconnect()
    }
}


//applying pagination for limiting the data fetching

const pagination= async(req,res)=>{

    try{
        

        const {page,student_id}= (req.query);
        
       
        // console.log(page)
        const sk=(page-1)
        // console.log(sk+sk)
        const result= await prisma.todo.findMany({

            skip:sk+sk,
            take:2,

            where:{
                user_id:parseInt(student_id),
            },

            select:{
                id:true,
                title:true,
                description:true,
            }
        })

        console.log(result)

        return res.status(200).json({
            message:result
        })

    }catch(err)
    {

        return res.status(501).json({
            message:err
        })

    }finally{

        await prisma.$disconnect()
    }
}

// deleting a particular todo of an user

const deleteparticular_todo= async(req,res)=>{

    try{

        const{todo_id}= req.query

        const ans= await prisma.todo.delete({
            where:{
                id:parseInt(todo_id),
            },
        })

        console.log(ans)
        return res.status(204).json({
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
    creatingtodo,
    gettingtodos,
    pagination,
    deleteparticular_todo
}