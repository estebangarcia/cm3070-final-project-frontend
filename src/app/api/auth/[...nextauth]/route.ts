import { type NextRequest } from 'next/server'
import { signIn, handlers } from "@/auth"
 
export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");
    if(code != null && code != "") {
        return handlers.GET(request)
    }

    await signIn("cognito");
}