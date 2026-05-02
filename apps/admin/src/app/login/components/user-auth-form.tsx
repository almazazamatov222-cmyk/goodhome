'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'react-hot-toast'

export function UserAuthForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
   const [isLoading, setIsLoading] = React.useState<boolean>(false)
   const [email, setEmail] = React.useState('')
   const [password, setPassword] = React.useState('')
   const router = useRouter()

   async function onSubmit(event: React.SyntheticEvent) {
      event.preventDefault()
      setIsLoading(true)

      try {
         const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
         })

         if (response.ok) {
            toast.success('Успешный вход!')
            window.location.assign('/')
         } else {
            const data = await response.json()
            toast.error(data.message || 'Ошибка входа')
         }
      } catch (error) {
         toast.error('Что-то пошло не так')
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <div className={cn('grid gap-6', className)} {...props}>
         <form onSubmit={onSubmit}>
            <div className="grid gap-4">
               <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                     id="email"
                     placeholder="admin@goodhome.kz"
                     type="email"
                     autoCapitalize="none"
                     autoComplete="email"
                     autoCorrect="off"
                     disabled={isLoading}
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </div>
               <div className="grid gap-1">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                     id="password"
                     placeholder="••••••••"
                     type="password"
                     autoCapitalize="none"
                     autoComplete="current-password"
                     disabled={isLoading}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
               </div>
               <Button disabled={isLoading} className="bg-orange-500 hover:bg-orange-600 h-12 text-white font-bold rounded-xl">
                  {isLoading && <Loader className="mr-2 h-4 animate-spin" />}
                  Войти в панель
               </Button>
            </div>
         </form>
      </div>
   )
}

