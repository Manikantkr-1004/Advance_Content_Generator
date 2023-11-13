import React, { useState } from 'react'
import {Box, Button, Flex, Input,  useToast} from "@chakra-ui/react";
import MarkdownPreview  from '@uiw/react-markdown-preview';
import axios from "axios"

export function Generator() {

    const [content,setContent] = useState("");
    const [result,setResult] = useState("### Here you will get Result😃😃.");
    const toast = useToast();

    const handleGenerate = ()=>{

        if(content===""){
            toast({
                status:"warning",
                title:"Please Write Topic Name to Generate...",
                isClosable:true,
                duration:2000,
                position:"top"
            })
            return;
        }

        setResult("### Please Wait....");

        axios.post("https://generator-fb3g.onrender.com/generate",{input: `Generate content on ${content} topic in 200 or 300 words.\n Don't give me any another things in response only give me content related to ${content} topic in 200-300 words`})
        .then((res)=>{
            setResult(res.data);
        }).catch((err)=>{
            setResult("### Something went wrong, Please refresh or try again!!")
        })
    }

    const handleSummarize = ()=>{
        if(content===""){
            toast({
                status:"warning",
                title:"Plese write or paste your content to summarize...",
                isClosable:true,
                duration:3000,
                position:"top"
            })
            return;
        }

        setResult("### Please Wait....");

        axios.post("https://generator-fb3g.onrender.com/generate",{input: `Summarize this given content in short as much as possible.\n Here is content.\n ${content}`})
        .then((res)=>{
            setResult(res.data);
        }).catch((err)=>{
            setResult("### Something went wrong, Please refresh or try again!!")
        })
    }
    
    const handleEmotion = ()=>{
        if(content===''){
            toast({
                status:"warning",
                title:"Please write any Text or Conversation or Content to Analyse.",
                isClosable:true,
                duration:3000,
                position:"top"
            })
            return;
        }

        setResult("### Please Wait....");

        axios.post("https://generator-fb3g.onrender.com/generate",{input: `Act as a Sentiment Analysis and Emotion Recognition and based on given Content, Give me response in only one word in one of these like Angry, Happy, Romantic, Sad, Neutral.\n Here is the content\n ${content}`})
        .then((res)=>{
            if(res.data==="Angry"){
                setResult("<img src='https://cliply.co/wp-content/uploads/2021/03/392103110_ANGRY_EMOJI_400px.gif' alt='Angry' />");
            }else if(res.data==="Happy"){
                setResult("<img src='https://i.pinimg.com/originals/73/d5/b2/73d5b2ba93aefa252798e122a9f6097a.gif' alt='Happy' />");
            }else if(res.data==="Sad"){
                setResult("<img src='https://media3.giphy.com/media/ykaNntbZ3hfsWotKmA/giphy.gif?cid=6c09b952wjlrxeu0k8ernglimbqhdr7vvnzgu3x4xfcfx2rw&ep=v1_gifs_search&rid=giphy.gif&ct=g' alt='Sad' />");
            }else if(res.data==="Romantic"){
                setResult("<img src='https://i.pinimg.com/originals/4c/b7/73/4cb7738d6ba7be10c5fa40317191bf99.gif' alt='Romantic' />");
            }else{
                setResult("<img src='https://images.emojiterra.com/google/noto-emoji/unicode-15/animated/1f62c.gif' alt='Neutral' />");
            }
        }).catch((err)=>{
            setResult("### Something went wrong, Please refresh or try again!!")
        })
    }

    return (
        <Box h="100vh" w="100%">
            <Flex w="100%" bg="#e2e2e2" justifyContent="space-evenly" gap="10px" alignItems="center" h="15%">
                <Button isDisabled={result==="### Please Wait...."} _hover={{bg:"black"}} onClick={handleGenerate} _focus={{border:"3px solid #747474"}} variant="unstyled" bg="black" color="white" w="21%">GENERATE</Button>
                <Button isDisabled={result==="### Please Wait...."} _hover={{bg:"black"}} onClick={handleSummarize} _focus={{border:"3px solid #747474"}} variant="unstyled" bg="black" color="white" w="21%">SUMMARIZE</Button>
                <Button isDisabled={result==="### Please Wait...."} _hover={{bg:"black"}} onClick={handleEmotion} _focus={{border:"3px solid #747474"}} variant="unstyled" bg="black" color="white" w="21%">ANALYSE EMOTION</Button>
            </Flex>

            <Input value={content} onChange={(e)=> setContent(e.target.value)} w="100%" h="10%" border="2px solid black" bg="#fffebf" borderRadius="0px" type="text" placeholder="Enter Content to Analyse / Topic Name to Generate / Content to Summarize..." />
            
            <Box w="100%" h="75%" p="10px" color="black" overflow="auto"
            fontSize="20px" fontWeight="semibold" borderLeft="2px solid black">
                <MarkdownPreview border="none" source={result} />
            </Box>

        </Box>
    )
}
