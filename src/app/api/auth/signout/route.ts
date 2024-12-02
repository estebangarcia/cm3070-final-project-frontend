import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server';

const clearCookieOptions = `Max-Age=-1; Path=/; Secure; HttpOnly;`

export async function GET(req: NextRequest, res: Response) {
  try {
    const url = process.env.AUTH_COGNITO_LOGOUT_URL + "?client_id=" + process.env.AUTH_COGNITO_ID + "&logout_uri=" + encodeURIComponent(req.nextUrl.origin+"/");

    // Clear all cookies
    let setCookies = ''
    let cks = await cookies();
    cks.getAll()
      .forEach((cookie) => {
        setCookies += `${cookie.name}=; ${clearCookieOptions}`
        cks.set(cookie.name, '', {
          maxAge: -1,
          path: '/',
          secure: true,
        })
        cks.delete(cookie.name)
      })

    return new Response('', {
      status: 302,
      headers: {
        Location: url.toString(),
        'Set-Cookie': setCookies,
      },
    })
  } catch (error) {
    console.error(error)
    redirect('/')
  }
}