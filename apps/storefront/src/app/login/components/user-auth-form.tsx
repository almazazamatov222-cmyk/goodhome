'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn, isVariableValid } from '@/lib/utils'
import { isEmailValid } from '@persepolis/regex'
import { Loader, MailIcon, SmartphoneIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

// Simple regex for +7 phone numbers
const isPhoneValid = (phone: string) => {
   if (!phone) return false
   const cleanPhone = phone.replace(/\D/g, '')
   return cleanPhone.length === 11 && (cleanPhone.startsWith('7') || cleanPhone.startsWith('8'))
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
   const [isLoading, setIsLoading] = React.useState<boolean>(false)
   const [fetchedOTP, setFetchedOTP] = React.useState<boolean>(false)

   return (
      <div className={cn('grid gap-6', className)} {...props}>
         {fetchedOTP ? (
            <VerifyComponents
               isLoading={isLoading}
               setIsLoading={setIsLoading}
            />
         ) : (
            <TryComponents
               isLoading={isLoading}
               setIsLoading={setIsLoading}
               setFetchedOTP={setFetchedOTP}
            />
         )}
      </div>
   )
}

function TryComponents({ isLoading, setIsLoading, setFetchedOTP }) {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()
   
   // Default to phone if no method specified
   const method = searchParams.get('method') || 'phone'
   const email = searchParams.get('email')
   const phone = searchParams.get('phone') || '+7'

   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set('email', event.target.value)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
   }

   const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set('phone', event.target.value)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
   }

   const changeMethod = (newMethod: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set('method', newMethod)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
   }

   async function onSubmitEmail() {
      try {
         setIsLoading(true)
         const response = await fetch('/api/auth/otp/email/try', {
            method: 'POST',
            body: JSON.stringify({ email }),
            cache: 'no-store',
         })
         if (response.ok) setFetchedOTP(true)
         setIsLoading(false)
      } catch (error) {
         console.error({ error })
         setIsLoading(false)
      }
   }

   async function onSubmitPhone() {
      try {
         setIsLoading(true)
         const response = await fetch('/api/auth/otp/phone/try', {
            method: 'POST',
            body: JSON.stringify({ phone }),
            cache: 'no-store',
         })
         if (response.ok) setFetchedOTP(true)
         setIsLoading(false)
      } catch (error) {
         console.error({ error })
         setIsLoading(false)
      }
   }

   if (method === 'phone')
      return (
         <>
            <div className="grid gap-2">
               <Label className="text-sm font-medium text-neutral-700" htmlFor="phone">
                  Номер телефона
               </Label>
               <Input
                  id="phone"
                  placeholder="+7 (777) 000-00-00"
                  type="tel"
                  className="h-12 text-lg rounded-xl border-neutral-200 focus:border-orange-500"
                  value={phone}
                  disabled={isLoading}
                  onChange={handlePhoneChange}
                  required
               />
               {isVariableValid(phone) && phone.length > 2 && !isPhoneValid(phone) && (
                  <p className="text-xs text-red-500">
                     Введите корректный номер телефона (11 цифр)
                  </p>
               )}
            </div>
            <Button
               className="bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-xl text-lg font-bold"
               onClick={onSubmitPhone}
               disabled={isLoading || !isPhoneValid(phone)}
            >
               {isLoading && <Loader className="mr-2 h-4 animate-spin" />}
               Получить SMS-код
            </Button>
            <button 
               type="button"
               onClick={() => changeMethod('email')}
               className="text-sm text-neutral-500 hover:text-orange-500 transition"
            >
               Войти по Email
            </button>
         </>
      )

   return (
      <>
         <div className="grid gap-2">
            <Label className="text-sm font-medium text-neutral-700" htmlFor="email">
               Email
            </Label>
            <Input
               id="email"
               placeholder="name@example.com"
               type="email"
               className="h-12 rounded-xl border-neutral-200 focus:border-orange-500"
               disabled={isLoading}
               onChange={handleEmailChange}
               required
            />
         </div>
         <Button
            className="bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-xl text-lg font-bold"
            onClick={onSubmitEmail}
            disabled={isLoading || !isEmailValid(email)}
         >
            {isLoading && <Loader className="mr-2 h-4 animate-spin" />}
            Продолжить
         </Button>
         <button 
            type="button"
            onClick={() => changeMethod('phone')}
            className="text-sm text-neutral-500 hover:text-orange-500 transition"
         >
            Войти по номеру телефона
         </button>
      </>
   )
}

function VerifyComponents({ isLoading, setIsLoading }) {
   const router = useRouter()
   const searchParams = useSearchParams()
   const method = searchParams.get('method') || 'phone'
   const email = searchParams.get('email')
   const phone = searchParams.get('phone')
   const [otp, setOtp] = React.useState('')

   async function onVerifyOTP() {
      try {
         setIsLoading(true)
         const response = await fetch(
            method === 'phone'
               ? '/api/auth/otp/phone/verify'
               : '/api/auth/otp/email/verify',
            {
               method: 'POST',
               body: JSON.stringify({ email, phone, OTP: otp }),
               cache: 'no-store',
            }
         )
         if (response.ok) {
            window.location.assign(`/`)
         }
         setIsLoading(false)
      } catch (error) {
         console.error({ error })
         setIsLoading(false)
      }
   }

   return (
      <>
         <div className="grid gap-2">
            <Label className="text-sm font-medium text-neutral-700" htmlFor="otp">
               Код из SMS
            </Label>
            <Input
               id="otp"
               placeholder="0000"
               className="h-12 text-center text-2xl tracking-[1em] rounded-xl border-neutral-200 focus:border-orange-500"
               maxLength={4}
               disabled={isLoading}
               onChange={(e) => setOtp(e.target.value)}
               required
            />
         </div>
         <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-xl text-lg font-bold"
            onClick={onVerifyOTP} 
            disabled={isLoading || otp.length < 4}
         >
            {isLoading && <Loader className="mr-2 h-4 animate-spin" />}
            Подтвердить
         </Button>
      </>
   )
}

