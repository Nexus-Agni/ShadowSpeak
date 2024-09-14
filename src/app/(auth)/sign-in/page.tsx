import { useToast } from '@/hooks/use-toast';
import { SignInSchema } from '@/schema/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function SignIn() {
    const router = useRouter();

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver : zodResolver(SignInSchema),
        defaultValues : {
            identifier : '',
            password : ''
        }
    })

    const {toast} = useToast();

    // OnSubmit function
    const onSubmit = async (data:z.infer<typeof SignInSchema>) => {
        
    }
  return (
    <div>

    </div>
  )
}
