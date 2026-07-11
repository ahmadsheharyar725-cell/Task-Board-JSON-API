    const express=require("express");
    const  cors=require("cors");
    const fs=require("fs");

    const app=express();
    const PORT=5000;
    app.use(cors());
    app.use(express.json());
    app.get("/",(req,res)=>{
        try{
            const teamdata=fs.readFileSync("../db/team.json","utf8");
            const tasksdata=fs.readFileSync("../db/tasks.json","utf8");
            const team=JSON.parse(teamdata);
            const tasks=JSON.parse(tasksdata);
            res.json({
                team,
                tasks
            });
            
        }catch(err){
            console.error("Error  fetching data !",err);
            res.status(500).json({err:"Failed to fetch data!"});
        }
    });
    app.post("/tasks",(req,res)=>{
        try{
            const taskdata=fs.readFileSync("../db/tasks.json","utf8");
            const tasks=JSON.parse(taskdata);
            const newTask=req.body;
            tasks.push(newTask);
            fs.writeFileSync("../db/tasks.json",JSON.stringify(tasks,null,4));
            res.status(201).json(newTask);

        }catch(err){
            console.error("Error saving task :",err);
            res.status(500).json({err:"Failed to save task!"});

        }
    });
    app.delete("/tasks/:id",(req,res)=>{
        try{
            const taskdata=fs.readFileSync("../db/tasks.json","utf8");
            const tasks=JSON.parse(taskdata);
            const taskId=parseInt(req.params.id);

            const updatedTask=tasks.filter((task)=>task.id!==taskId);
            fs.writeFileSync("../db/tasks.json",JSON.stringify(updatedTask,null,4));
            res.status(200).json({message:"Task deleted successfully!"});

        }catch(err){
            console.error("Error deleting task :",err);
            res.status(500).json({error:"Failed to delete task!"});
        }
    });
    app.patch("/tasks/:id",(req,res)=>{
        try{
            const taskdata=fs.readFileSync("../db/tasks.json","utf8");
            const tasks=JSON.parse(taskdata);
            const taskId=parseInt(req.params.id);
            const updates=req.body;
            const updatedTask=tasks.map((task)=>
            task.id===taskId?{...task,...updates}:task);
            fs.writeFileSync("../db/tasks.json",JSON.stringify(updatedTask,null,4));
            res.status(200).json({message:"Task updated successfully!"});

        }catch(err){
            console.error("Error updating task : ",err);
            res.status(500).json({error:"Failed to update task!"});
        }
    })

    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
    });
