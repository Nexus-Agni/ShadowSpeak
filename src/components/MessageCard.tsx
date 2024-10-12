'use client'
import { useToast } from '@/hooks/use-toast';
import { Message } from '@/model/user.model'
import { ApiResponse } from '@/types/apiResponse';
import axios, { AxiosError } from 'axios';
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from './ui/button';
import { X } from 'lucide-react';
  

type MessageCardProps = {
    message : Message;
    onMessageDelete : (messageId : string)=>void;
};

function MessageCard({message, onMessageDelete} : MessageCardProps) {
    const {toast} = useToast();
    const handleDeleteConfirm = async ()=> {
        try {
            const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);
            toast({
                title : response.data.message,
                variant : 'destructive'
            });
            onMessageDelete(message._id as string);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title : 'Error',
                description : axiosError.response?.data.message,
                variant : 'destructive'
            });
        }
    } 
  return (
    <Card className="card-bordered">
    <CardHeader>
        <div className="flex justify-between items-center">
        <CardTitle>{message.content}</CardTitle>
        <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button variant='destructive'>
                <X className="w-5 h-5" />
            </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                this message.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                Continue
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </div>
        <div className="text-sm">
        {/* {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')} */}
        </div>
    </CardHeader>
    <CardContent></CardContent>
    </Card>
  )
}

export default MessageCard