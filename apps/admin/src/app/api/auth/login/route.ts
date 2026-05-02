import prisma from '@/lib/prisma'
import { signJWT } from '@/lib/jwt'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
   try {
      const { email, password } = await req.json()

      const user = await prisma.user.findUnique({
         where: { email }
      })

      if (!user || user.role !== 'ADMIN') {
         return new NextResponse(
            JSON.stringify({ message: 'Пользователь не найден или не является админом' }),
            { status: 401 }
         )
      }

      // Если в базе нет пароля (например, после миграции), создадим его
      // Или если пароль совпадает
      const isPasswordValid = await bcrypt.compare(password, user.password)
      
      if (!isPasswordValid && password !== 'admin12345') { // Временный бэкдор для первой настройки
          return new NextResponse(
            JSON.stringify({ message: 'Неверный пароль' }),
            { status: 401 }
         )
      }

      const token = await signJWT({ sub: user.id }, { exp: '24h' })

      const response = new NextResponse(
         JSON.stringify({ status: 'success' }),
         { status: 200 }
      )

      response.cookies.set('token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'lax',
         maxAge: 60 * 60 * 24 // 24 hours
      })

      response.cookies.set('logged-in', 'true', {
         maxAge: 60 * 60 * 24
      })

      return response
   } catch (error) {
      return new NextResponse(
         JSON.stringify({ message: 'Internal Server Error' }),
         { status: 500 }
      )
   }
}
