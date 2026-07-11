            import React, { createContext,  useEffect, useReducer, useState } from 'react'
    import { intialTaskState, taskReducer } from './TaskReducer';
import API_URL from '../config';
            export const TeamContext=createContext();

            export const TeamProvider=({children})=>{
                const [team,setTeam]=useState([]);
                const[loading,setLoading]=useState(false);

                const [tasks,dispatch]=useReducer(taskReducer,intialTaskState);
                useEffect(()=>{
                    const fetchData=async()=>{
                        setLoading(true);
                        try{
                            const res=await fetch(`${API_URL}/`);
                            const data=await res.json();
                            setTeam(data.team||[]);
                        if(data.tasks){
                            dispatch({type:"SET_TASK",payload:data.tasks});
                        }
                        }catch(err){
                            console.error("Error fetching data!: ",err);

                        }finally{
                            setLoading(false);
                        }
                    }
                    fetchData();
                },[]);
                return(<>
                
                <TeamContext.Provider value={{team,loading,tasks,dispatch}}>
                    {children}
                </TeamContext.Provider>
                </>)
            }