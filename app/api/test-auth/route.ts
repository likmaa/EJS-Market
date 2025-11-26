import { auth } from '@/lib/auth-config';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    
    return NextResponse.json({ 
      success: true, 
      authenticated: !!session,
      session: session ? {
        user: session.user ? {
          email: session.user.email,
          role: session.user.role,
        } : null
      } : null,
      nextAuthUrl: process.env.NEXTAUTH_URL || 'not set',
      nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'set' : 'not set'
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

